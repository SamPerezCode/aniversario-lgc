import { createContext, useContext, useState, useEffect } from 'react';
import { listarInscripciones } from '../api/administrador/listarInscripciones';
import { anularInscripcion } from '../api/administrador/anularInscripcion';
import { aprobarInscripcion } from '../api/administrador/aprobarInscripcion';
import subirComprobantePago from '../api/subirComprobantePago';
import { useAuth } from '../context/AuthContext';
import realizarInscripcion from '../api/realizarInscripcion';

const InscripcionesContext = createContext();

export const InscripcionesProvider = ({ children }) => {
    const [inscripciones, setInscripciones] = useState([]);
    const [inscripcionesPendientes, setInscripcionesPendientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [participanteEnEdicion, setParticipanteEnEdicion] = useState(null);
    const { user, token } = useAuth();

    // Ahora es un objeto que contiene los participantes y campos adicionales
    const [inscripcionTemporal, setInscripcionTemporal] = useState({
        participantes: [],
        forma_pago: "",
        monto_cop: 0,
        monto_usd: 0,
        url_soporte_pago: ""
    });

    const agregarParticipanteTemporal = (participante) => {
        let dias_asistencia = '';
        if (participante.modalidad === 'presencial') {
            dias_asistencia = 'sabado';
        } else if (participante.modalidad === 'virtual') {
            dias_asistencia = 'sabado';
        } else {
            dias_asistencia = 'viernes_y_domingo';
        }

        let moneda = '';
        let valor = 0;
        if (participante.modalidad === 'presencial') {
            moneda = 'COP';
            valor = 75000;
        } else if (participante.modalidad === 'virtual') {
            moneda = 'USD';
            valor = 15;
        } else if (participante.modalidad === 'gratuito') {
            moneda = 'COP';
            valor = 0;
            participante.modalidad = "presencial";
        }


        const nuevoParticipante = {
            ...participante,
            dias_asistencia,
            moneda,
            valor
        };

        setInscripcionTemporal(prev => ({
            ...prev,
            participantes: [...prev.participantes, nuevoParticipante],
            monto_cop: moneda === 'COP' ? prev.monto_cop + valor : prev.monto_cop,
            monto_usd: moneda === 'USD' ? prev.monto_usd + valor : prev.monto_usd
        }));
    };

    const actualizarParticipanteTemporal = (index, datosActualizados) => {
        const nuevos = [...inscripcionTemporal.participantes];
        const anterior = nuevos[index];
        nuevos[index] = datosActualizados;

        // Recalcular totales
        const monto_cop = nuevos
            .filter(p => p.moneda === 'COP')
            .reduce((acc, p) => acc + p.valor, 0);
        const monto_usd = nuevos
            .filter(p => p.moneda === 'USD')
            .reduce((acc, p) => acc + p.valor, 0);

        setInscripcionTemporal(prev => ({
            ...prev,
            participantes: nuevos,
            monto_cop,
            monto_usd
        }));
    };

    const eliminarParticipanteTemporal = (index) => {
        const nuevos = inscripcionTemporal.participantes.filter((_, i) => i !== index);

        const monto_cop = nuevos
            .filter(p => p.moneda === 'COP')
            .reduce((acc, p) => acc + p.valor, 0);
        const monto_usd = nuevos
            .filter(p => p.moneda === 'USD')
            .reduce((acc, p) => acc + p.valor, 0);

        setInscripcionTemporal(prev => ({
            ...prev,
            participantes: nuevos,
            monto_cop,
            monto_usd
        }));
    };

    const actualizarInscripcionTemporal = (campos) => {
        setInscripcionTemporal(prev => ({
            ...prev,
            ...campos
        }));
    };

    const limpiarInscripcionTemporal = () => {
        setInscripcionTemporal({
            participantes: [],
            forma_pago: "",
            monto_cop: 0,
            monto_usd: 0,
            url_soporte_pago: ""
        });
    };

    const registrarInscripcionEfectivo = async (participantes = []) => {
        try {
            const participantesProcesados = participantes.map((p) => ({
                nombre: p.nombre,
                documento: p.documento,
                email: p.email,
                telefono: p.telefono,
                iglesia: p.iglesia,
                ciudad: p.ciudad || "",
                habeas_data: p.habeas_data ?? true,
                modalidad: "presencial",
                dias_asistencia: "sabado",
            }));

            const datos = {
                forma_pago: "efectivo",
                monto_cop: participantes[0]?.monto_cop || 75000,
                monto_usd: 0,
                url_soporte_pago: "",
                participantes: participantesProcesados,
            };

            const resultado = await realizarInscripcion(datos, token);
            await cargarInscripciones();
            limpiarInscripcionTemporal();
            return resultado;
        } catch (error) {
            console.error("Error al registrar inscripción en efectivo:", error);
            throw error;
        }
    };





    const cargarInscripciones = async () => {
        try {
            if (!token) return;
            const data = await listarInscripciones(token);
            setInscripciones(data.data);
        } catch (error) {
            console.error('Error al cargar inscripciones:', error);
        }
    };

    const aprobarInscripcionById = async (id) => {
        try {
            const resultado = await aprobarInscripcion(id, token);
            await cargarInscripciones();
            return resultado;
        } catch (error) {
            console.error('Error al aprobar inscripción:', error);
        }
    };

    const anularInscripcionById = async (id) => {
        try {
            const resultado = await anularInscripcion(id, token);
            await cargarInscripciones();
            return resultado;
        } catch (error) {
            console.error('Error al anular inscripción:', error);
        }
    };

    const subirYGuardarComprobantePago = async (archivo) => {

        console.log("LLamdo a la función");
        try {
            const ruta = await subirComprobantePago(archivo);
            actualizarInscripcionTemporal({ url_soporte_pago: ruta });
            console.log("Esta es la ruta: ", ruta)
            return ruta;
        } catch (error) {
            console.error('Error al subir y guardar comprobante:', error);
            throw error;
        }
    };

    return (
        <InscripcionesContext.Provider
            value={{
                inscripciones,
                inscripcionesPendientes,
                inscripcionTemporal,
                subirYGuardarComprobantePago,
                agregarParticipanteTemporal,
                actualizarParticipanteTemporal,
                eliminarParticipanteTemporal,
                actualizarInscripcionTemporal,
                limpiarInscripcionTemporal,
                registrarInscripcionEfectivo,
                participanteEnEdicion,
                setParticipanteEnEdicion,
                cargarInscripciones,
                aprobarInscripcionById,
                anularInscripcionById,
                loading
            }}
        >
            {children}
        </InscripcionesContext.Provider>
    );
};

export const useInscripciones = () => useContext(InscripcionesContext);



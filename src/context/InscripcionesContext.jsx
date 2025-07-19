import { createContext, useContext, useState, useEffect } from 'react';
import { listarInscripciones } from '../api/administrador/listarInscripciones';
import { anularInscripcion } from '../api/administrador/anularInscripcion';
import { aprobarInscripcion } from '../api/administrador/aprobarInscripcion';
import { useAuth } from '../context/AuthContext';
import { realizarInscripcionEfectivo } from '../api/realizarInscripcionEfectivo';


const InscripcionesContext = createContext();

export const InscripcionesProvider = ({ children }) => {
    const [inscripciones, setInscripciones] = useState([]);
    const [inscripcionesPendientes, setInscripcionesPendientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, token } = useAuth();

    const registrarInscripcionEfectivo = async (datos) => {
        try {
            const resultado = await realizarInscripcionEfectivo(datos, token);
            await cargarInscripciones();
            return resultado;
        } catch (error) {
            console.error('Error al registrar inscripción en efectivo:', error);
            throw error;
        }
    };


    const cargarInscripciones = async () => {
        try {
            if (!token) {
                console.warn('Token no disponible al momento de cargar inscripciones');
                return;
            }
            const data = await listarInscripciones(token);
            // console.log('Respuesta del servidor (inscripciones):', data.data);
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

    useEffect(() => {
        const fetchData = async () => {
            if (!token) return;
            setLoading(true);
            await Promise.all([
                cargarInscripciones(),
            ]);
            setLoading(false);
        };
        fetchData();
    }, [token]); // <- Dependencia correcta

    return (
        <InscripcionesContext.Provider
            value={{
                inscripciones,
                inscripcionesPendientes,
                cargarInscripciones,
                aprobarInscripcionById,
                anularInscripcionById,
                registrarInscripcionEfectivo, // <- ✅ Agregado aquí
                loading,
            }}
        >
            {children}
        </InscripcionesContext.Provider>
    );
};

export const useInscripciones = () => useContext(InscripcionesContext);

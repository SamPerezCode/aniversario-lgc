// src/pages/ResumenFinalInscripcion.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInscripciones } from '../../context/InscripcionesContext';
import { calcularMonto } from '../../utils/calcularMonto';
import './ResumenFinalInscripcion.css';
import realizarInscripcion from '../../api/realizarInscripcion';

const ResumenFinalInscripcion = () => {
    const {
        inscripcionTemporal,
        setParticipanteEnEdicion,
        actualizarInscripcionTemporal,
        eliminarParticipanteTemporal,
        limpiarInscripcionTemporal,
    } = useInscripciones();

    const [totales, setTotales] = useState({ cop: 0, usd: 0 });
    const [todosGratuitos, setTodosGratuitos] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let totalCOP = 0;
        let totalUSD = 0;

        const participantes = inscripcionTemporal.participantes || [];

        participantes.forEach((p) => {
            const { moneda, valor } = calcularMonto(p.modalidad, p.dias_asistencia);
            if (moneda === 'COP') {
                totalCOP += valor;
            } else if (moneda === 'USD') {
                totalUSD += valor;
            }
        });

        const gratuitos = participantes.length > 0 && participantes.every((p) => {
            const { valor } = calcularMonto(p.modalidad, p.dias_asistencia);
            return valor === 0;
        });

        setTotales({ cop: totalCOP, usd: totalUSD });
        setTodosGratuitos(gratuitos);

        actualizarInscripcionTemporal({
            monto_cop: totalCOP,
            monto_usd: totalUSD
        });
    }, [inscripcionTemporal.participantes]);

    const handleRegresar = () => {
        navigate('/nuevo-formulario');
    };

    const handleContinuar = () => {

        navigate('/comprobante-pago');
    };

    const handleInscripcionGratuita = async () => {
        try {
            // Clonar para no mutar el original
            const datosParaEnviar = {
                ...inscripcionTemporal,
                participantes: inscripcionTemporal.participantes.map(p => ({
                    ...p,
                    modalidad: String(p.modalidad).toLowerCase().trim(), // normaliza modalidad
                }))
            };

            console.log('🧾 Payload de inscripción gratuita:', datosParaEnviar);

            await realizarInscripcion(datosParaEnviar);
            limpiarInscripcionTemporal();
            navigate('/confirmacion');
        } catch (error) {
            console.error('❌ Error al registrar inscripción gratuita:', error);
            alert('Hubo un error al registrar la inscripción gratuita.');
        }
    };


    return (
        <div className="resumen-container">
            <h2>Resumen de Inscripción</h2>
            <table className="resumen-tabla">
                <thead>
                    <tr>
                        <th>Participante</th>
                        <th>Modalidad</th>
                        <th>Días</th>
                        <th>Valor</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {Array.isArray(inscripcionTemporal.participantes) &&
                        inscripcionTemporal.participantes.map((p, index) => {
                            const { moneda, valor } = calcularMonto(p.modalidad, p.dias_asistencia);
                            return (
                                <tr key={index}>
                                    <td>{p.nombre}</td>
                                    <td>{p.modalidad}</td>
                                    <td>{p.dias_asistencia}</td>
                                    <td>
                                        {moneda === 'COP'
                                            ? `COP $${valor.toLocaleString()}`
                                            : `USD $${valor}`}
                                    </td>
                                    <td>
                                        <button
                                            className="btn-editar"
                                            onClick={() => {
                                                setParticipanteEnEdicion(index);
                                                navigate('/nuevo-formulario');
                                            }}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn-eliminar"
                                            onClick={() => eliminarParticipanteTemporal(index)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>

            <div className="total-a-pagar">
                <p><strong>Total a pagar:</strong></p>
                <p>COP ${totales.cop.toLocaleString()}</p>
                <p>USD ${totales.usd.toLocaleString()}</p>
            </div>

            {todosGratuitos ? (
                <button className="btn-continuar" onClick={handleInscripcionGratuita}>
                    Inscribirse
                </button>
            ) : (
                <>
                    <button
                        className="btn-continuar"
                        onClick={handleContinuar}
                        disabled={inscripcionTemporal.participantes == 0}
                    >
                        Continuar
                    </button>

                    {inscripcionTemporal.participantes == 0 && (
                        <button className="btn-regresar" onClick={handleRegresar}>
                            Añadir participante
                        </button>
                    )}
                </>
            )}

        </div>
    );
};

export default ResumenFinalInscripcion;

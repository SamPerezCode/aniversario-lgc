import React, { useEffect, useState } from 'react';
import { useInscripciones } from '../../context/InscripcionesContext';
import './TablaInscritos.css';

const TablaInscripciones = () => {
    const [filtro, setFiltro] = useState("PreAprobado");

    const {
        inscripciones,
        cargarInscripciones,
        aprobarInscripcionId,
        anularInscripcionId,
    } = useInscripciones();

    useEffect(() => {
        cargarInscripciones();
    }, []);

    const handleAprobar = async (id) => {
        await aprobarInscripcionId(id);
        await cargarInscripciones();
    };

    const handleAnular = async (id) => {
        await anularInscripcionId(id);
        await cargarInscripciones();
    };

    // Filtrar inscripciones según el estado seleccionado
    const inscripcionesFiltradas = inscripciones.filter(
        (item) =>
            (filtro === "Aprobado" && item.estado === "Aprobada") ||
            (filtro === "PreAprobado" && item.estado !== "Aprobada")
    );

    return (
        <div className="tabla-wrapper">
            <div className="filtros-inscripciones">
                <button
                    className={filtro === "PreAprobado" ? "activo" : ""}
                    onClick={() => setFiltro("PreAprobado")}
                >
                    PreAprobados
                </button>
                <button
                    className={filtro === "Aprobado" ? "activo" : ""}
                    onClick={() => setFiltro("Aprobado")}
                >
                    Aprobados
                </button>
            </div>

            <table className="tabla-inscritos">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>N° Documento</th>
                        <th>Comprobante de pago</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {inscripcionesFiltradas.map((item) => (
                        <tr key={item.id}>
                            <td>{item.nombre}</td>
                            <td>{item.documento}</td>
                            <td>
                                {item.comprobante_pago ? (
                                    <a
                                        href={item.comprobante_pago}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Ver comprobante
                                    </a>
                                ) : (
                                    'No disponible'
                                )}
                            </td>
                            <td>{item.estado}</td>
                            <td>
                                {item.estado !== 'Aprobada' ? (
                                    <div className="btn-actions">
                                        <button
                                            className="btn-aprobar"
                                            onClick={() => handleAprobar(item.id)}
                                        >
                                            Aprobar
                                        </button>
                                        <button
                                            className="btn-anular"
                                            onClick={() => handleAnular(item.id)}
                                        >
                                            Anular
                                        </button>
                                    </div>
                                ) : (
                                    <span className="texto-aprobado">Ha sido aprobado</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TablaInscripciones;

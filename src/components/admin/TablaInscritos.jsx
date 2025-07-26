import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInscripciones } from '../../context/InscripcionesContext';

import './TablaInscritos.css';

const TablaInscripciones = () => {
    const [filtro, setFiltro] = useState("PreAprobado");
    const [busqueda, setBusqueda] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);
    const registrosPorPagina = 10;

    const navigate = useNavigate();

    const {
        inscripciones,
        cargarInscripciones,
        aprobarInscripcionById,
        anularInscripcionById,
    } = useInscripciones();

    useEffect(() => {
        cargarInscripciones();
    }, []);

    const handleAprobar = async (id) => {
        await aprobarInscripcionById(id);
        await cargarInscripciones();
    };

    const handleAnular = async (id) => {
        await anularInscripcionById(id);
        await cargarInscripciones();
    };

    const inscripcionesFiltradas = useMemo(() => {
        const texto = busqueda.toLowerCase();

        return inscripciones
            .filter((item) => item.estado !== "Anulada")
            .filter((item) => {
                if (filtro === "Aprobado") return item.estado === "Aprobada" && item.comprobante_pago !== "Pago en efectivo";
                if (filtro === "PreAprobado") return item.estado !== "Aprobada";
                if (filtro === "Efectivo") return item.comprobante_pago === "Pago en efectivo";
                return true;
            })
            .filter((item) =>
                item.nombre?.toLowerCase().includes(texto) ||
                item.documento?.toLowerCase().includes(texto) ||
                item.asistencia?.toLowerCase().includes(texto)
            );
    }, [inscripciones, filtro, busqueda]);

    const totalPaginas = Math.ceil(inscripcionesFiltradas.length / registrosPorPagina);

    const inscripcionesPaginadas = useMemo(() => {
        const inicio = (paginaActual - 1) * registrosPorPagina;
        return inscripcionesFiltradas.slice(inicio, inicio + registrosPorPagina);
    }, [inscripcionesFiltradas, paginaActual]);

    const cambiarPagina = (nueva) => {
        if (nueva >= 1 && nueva <= totalPaginas) {
            setPaginaActual(nueva);
        }
    };
    console.log(inscripciones)

    return (
        <div className="tabla-wrapper">

            <div className="dropdown-filtros">
                <select
                    value={filtro}
                    onChange={(e) => {
                        setFiltro(e.target.value);
                        setPaginaActual(1);
                    }}
                    className="select-filtro"
                >
                    <option value="PreAprobado">PreAprobados</option>
                    <option value="Aprobado">Aprobados</option>
                    <option value="Efectivo">Pago en efectivo</option>
                </select>

                <button
                    className="btn-inscribir-efectivo"
                    onClick={() => navigate("/inscripcion-efectivo")}
                >
                    Inscribir con pago en efectivo
                </button>
            </div>

            {/* Buscador separado de la tabla */}
            <div className="buscador-inscripciones">
                <input
                    type="text"
                    placeholder="Buscar por nombre, documento o asistencia"
                    value={busqueda}
                    onChange={(e) => {
                        setBusqueda(e.target.value);
                        setPaginaActual(1);
                    }}
                    className="input-buscador"
                />
            </div>

            {/* Tabla principal */}
            <table className="tabla-inscritos">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>N° Documento</th>
                        <th>Teléfono</th>
                        <th>Email</th>
                        <th>Asistencia</th>
                        <th>Comprobante de pago</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {inscripcionesPaginadas.length === 0 ? (
                        <tr>
                            <td colSpan="8" style={{ textAlign: 'center', padding: '1rem', fontStyle: 'italic' }}>
                                No hay inscripciones para mostrar en este filtro.
                            </td>
                        </tr>
                    ) : (
                        inscripcionesPaginadas.map((item) => (
                            <tr key={item.id}>
                                <td>{item.nombre}</td>
                                <td>{item.documento}</td>
                                <td>{item.telefono || '—'}</td>
                                <td>{item.email || '—'}</td>
                                <td>{item.asistencia || '—'}</td>
                                <td>
                                    {item.comprobante_pago && item.comprobante_pago !== "Pago en efectivo" ? (
                                        <a href={item.comprobante_pago} target="_blank" rel="noopener noreferrer">
                                            Ver comprobante
                                        </a>
                                    ) : (
                                        item.comprobante_pago || 'No disponible'
                                    )}
                                </td>
                                <td>{item.estado}</td>
                                <td>
                                    {item.estado !== 'Aprobada' ? (
                                        <div className="btn-actions">
                                            <button className="btn-aprobar" onClick={() => handleAprobar(item.id)}>
                                                Aprobar
                                            </button>
                                            <button className="btn-anular" onClick={() => handleAnular(item.id)}>
                                                Anular
                                            </button>
                                        </div>
                                    ) : (
                                        <span className="texto-aprobado">Ha sido aprobado</span>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Paginación */}
            {totalPaginas > 1 && (
                <div className="paginacion">
                    <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
                        &laquo;
                    </button>
                    {[...Array(totalPaginas)].map((_, i) => {
                        const page = i + 1;
                        const isFirst = page === 1;
                        const isLast = page === totalPaginas;
                        const isNearCurrent = Math.abs(paginaActual - page) <= 2;

                        if (isFirst || isLast || isNearCurrent) {
                            return (
                                <button
                                    key={page}
                                    onClick={() => cambiarPagina(page)}
                                    className={paginaActual === page ? 'activo' : ''}
                                >
                                    {page}
                                </button>
                            );
                        }

                        // Mostrar "..." solo si no se ha renderizado antes
                        if (
                            (page === 2 && paginaActual > 4) ||
                            (page === totalPaginas - 1 && paginaActual < totalPaginas - 3)
                        ) {
                            return <span key={page} className="puntos">...</span>;
                        }

                        return null;
                    })}

                    <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
                        &raquo;
                    </button>
                </div>
            )}
        </div>
    );
};

export default TablaInscripciones;

import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInscripciones } from '../../context/InscripcionesContext';
import './CardsInscripciones.css';

const CardsInscripciones = () => {
    const navigate = useNavigate();

    const [paginaActual, setPaginaActual] = useState(1);
    const registrosPorPagina = 10;

    const [busqueda, setBusqueda] = useState("");
    const [filtroModalidad, setFiltroModalidad] = useState("todas");
    const [filtroEstado, setFiltroEstado] = useState("todas");
    const [fechaDesde, setFechaDesde] = useState("");
    const [fechaHasta, setFechaHasta] = useState("");
    const [fechaFiltro, setFechaFiltro] = useState('');


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

    const inscripcionesFiltradas = inscripciones.filter((item) => {
        const p = item.participantes?.[0];
        const texto = busqueda.toLowerCase();

        const coincideBusqueda =
            (p?.nombre?.toLowerCase() || '').includes(texto) ||
            (p?.documento?.toString().toLowerCase() || '').includes(texto);

        const coincideModalidad =
            filtroModalidad === "todas" || p?.modalidad === filtroModalidad;

        const coincideEstado =
            filtroEstado === "todas" || item.estado === filtroEstado;

        // ✅ Normalizar fechas a zona horaria de Colombia y solo comparar fecha (no hora)
        const normalizarFechaLocal = (fechaStr) => {
            const f = new Date(fechaStr);
            // Ajustamos a horario de Colombia (UTC-5)
            f.setUTCHours(0, 0, 0, 0);
            return f.toISOString().split('T')[0]; // nos quedamos con 'YYYY-MM-DD'
        };

        const fechaItem = normalizarFechaLocal(item.fecha_creacion);
        const fechaSeleccionada = fechaFiltro ? normalizarFechaLocal(fechaFiltro) : null;

        const coincideFecha = !fechaSeleccionada || fechaItem === fechaSeleccionada;

        return coincideBusqueda && coincideModalidad && coincideEstado && coincideFecha;
    });


    const inscripcionesOrdenadas = [...inscripcionesFiltradas].sort(
        (a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion)
    );

    const totalPaginas = Math.ceil(inscripcionesOrdenadas.length / registrosPorPagina);

    const inscripcionesPaginadas = useMemo(() => {
        const inicio = (paginaActual - 1) * registrosPorPagina;
        return inscripcionesOrdenadas.slice(inicio, inicio + registrosPorPagina);
    }, [inscripcionesOrdenadas, paginaActual]);

    const cambiarPagina = (nueva) => {
        if (nueva >= 1 && nueva <= totalPaginas) {
            setPaginaActual(nueva);
        }
    };



    return (
        <div className="cards-container">
            <button
                className="btn-inscribir-efectivo"
                onClick={() => navigate("/inscripcion-efectivo")}
            >
                Inscribir con pago en efectivo
            </button>

            <div className="filtros-wrapper">
                <input
                    type="text"
                    placeholder="Buscar por nombre o documento"
                    value={busqueda}
                    onChange={(e) => {
                        setBusqueda(e.target.value);
                        setPaginaActual(1);
                    }}
                    className="input-buscador"
                />

                <select
                    value={filtroModalidad}
                    onChange={(e) => {
                        setFiltroModalidad(e.target.value);
                        setPaginaActual(1);
                    }}
                >
                    <option value="todas">Todas las modalidades</option>
                    <option value="presencial">Presencial</option>
                    <option value="virtual">Virtual</option>
                </select>

                <select
                    value={filtroEstado}
                    onChange={(e) => {
                        setFiltroEstado(e.target.value);
                        setPaginaActual(1);
                    }}
                >
                    <option value="todas">Todos los estados</option>
                    <option value="Aprobada">Aprobadas</option>
                    <option value="PreAprobada">Preaprobadas</option>
                </select>

                {/* <input
                    type="date"
                    value={fechaDesde}
                    onChange={(e) => {
                        setFechaDesde(e.target.value);
                        setPaginaActual(1);
                    }}
                />
                <input
                    type="date"
                    value={fechaHasta}
                    onChange={(e) => {
                        setFechaHasta(e.target.value);
                        setPaginaActual(1);
                    }}
                /> */}
                <div className="campo-fecha">
                    <label htmlFor="fechaFiltro">Filtrar por fecha:</label>
                    <input
                        id="fechaFiltro"
                        type="date"
                        value={fechaFiltro}
                        onChange={(e) => setFechaFiltro(e.target.value)}
                    />
                </div>


            </div>

            {inscripcionesPaginadas.map((item) => (
                <div key={item.id} className="card-inscripcion">
                    <div className="card-header">
                        <h3>Inscripción #{item.id}</h3>
                        <span className={`estado ${item.estado.toLowerCase()}`}>{item.estado}</span>
                    </div>

                    <div className="card-info">
                        <p><strong>Pago:</strong> {item.forma_pago} {item.monto_pago_cop ? `COP ${item.monto_pago_cop}` : item.monto_pago_usd ? `USD ${item.monto_pago_usd}` : ''}</p>
                        <p><strong>Fecha:</strong> {item.fecha_creacion}</p>
                    </div>

                    {item.participantes?.length > 0 && (
                        <div className="card-participantes">
                            <h4>Participantes</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Documento</th>
                                        <th>Email</th>
                                        <th>Modalidad</th>
                                        <th>Días Asistencia</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {item.participantes.map((p, i) => (
                                        <tr key={i}>
                                            <td>{p.nombre}</td>
                                            <td>{p.documento}</td>
                                            <td>{p.email}</td>
                                            <td>{p.modalidad}</td>
                                            <td>{p.dias_asistencia}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <div className="card-actions">
                        {item.estado === 'Aprobada' ? (
                            <>
                                <span className="texto-aprobado">Ya aprobada</span>
                                {item.url_soporte_pago && item.url_soporte_pago !== "Pago en efectivo" && (
                                    <a href={item.url_soporte_pago} target="_blank" rel="noopener noreferrer" className="btn-ver">
                                        Ver Soporte
                                    </a>
                                )}
                            </>
                        ) : (
                            <>
                                {item.url_soporte_pago && item.url_soporte_pago !== "Pago en efectivo" && (
                                    <a href={item.url_soporte_pago} target="_blank" rel="noopener noreferrer" className="btn-ver">
                                        Ver Soporte
                                    </a>
                                )}
                                <button className="btn-aprobar" onClick={() => handleAprobar(item.id)}>Aprobar</button>
                                <button className="btn-anular" onClick={() => handleAnular(item.id)}>Rechazar</button>
                            </>
                        )}
                    </div>
                </div>
            ))}

            {totalPaginas > 1 && (
                <div className="paginacion">
                    <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
                        &laquo;
                    </button>

                    {Array.from({ length: totalPaginas }, (_, i) => i + 1)
                        .filter((page) =>
                            page === paginaActual ||
                            page === paginaActual - 1 ||
                            page === paginaActual + 1
                        )
                        .slice(0, 3)
                        .map((page) => (
                            <button
                                key={page}
                                onClick={() => cambiarPagina(page)}
                                className={paginaActual === page ? 'activo' : ''}
                            >
                                {page}
                            </button>
                        ))}

                    <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
                        &raquo;
                    </button>
                </div>
            )}
        </div>
    );
};

export default CardsInscripciones;

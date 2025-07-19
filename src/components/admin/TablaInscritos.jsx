import React, { useState, useEffect } from "react";
import "./TablaInscritos.css"; // Asegúrate de tener los estilos CSS

const TablaInscritos = ({ inscripciones }) => {
    const [filtro, setFiltro] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);
    const itemsPorPagina = 15;

    // 🔍 Filtrar inscripciones según texto de búsqueda y excluyendo anuladas
    const datosFiltrados = inscripciones.filter((inscripcion) => {
        const texto = filtro.toLowerCase();
        return (
            inscripcion.estado.toLowerCase() !== "anulada" &&
            (
                inscripcion.nombre.toLowerCase().includes(texto) ||
                inscripcion.documento.toLowerCase().includes(texto) ||
                inscripcion.estado.toLowerCase().includes(texto)
            )
        );
    });

    const totalPaginas = Math.ceil(datosFiltrados.length / itemsPorPagina);
    const inicio = (paginaActual - 1) * itemsPorPagina;
    const inscripcionesPagina = datosFiltrados.slice(inicio, inicio + itemsPorPagina);

    const cambiarPagina = (numero) => {
        if (numero >= 1 && numero <= totalPaginas) {
            setPaginaActual(numero);
        }
    };

    return (
        <div className="tabla-inscritos-container">

            {/* 🔍 Buscador */}
            <input
                type="text"
                placeholder="Buscar por nombre, documento o estado..."
                value={filtro}
                onChange={(e) => {
                    setFiltro(e.target.value);
                    setPaginaActual(1); // Reinicia la paginación al buscar
                }}
                className="input-buscador"
            />

            {/* 📋 Tabla */}
            <table className="tabla-inscritos">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Documento</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {inscripcionesPagina.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="sin-resultados">No hay resultados</td>
                        </tr>
                    ) : (
                        inscripcionesPagina.map((inscripcion) => (
                            <tr key={inscripcion.id}>
                                <td>{inscripcion.nombre}</td>
                                <td>{inscripcion.documento}</td>
                                <td>{inscripcion.estado}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* 📄 Paginación */}
            {totalPaginas > 1 && (
                <div className="paginacion">
                    <button
                        onClick={() => cambiarPagina(paginaActual - 1)}
                        disabled={paginaActual === 1}
                        className="boton-paginacion"
                    >
                        &lt;
                    </button>

                    {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
                        <button
                            key={num}
                            onClick={() => cambiarPagina(num)}
                            className={`boton-paginacion ${paginaActual === num ? "activo" : ""}`}
                        >
                            {num}
                        </button>
                    ))}

                    <button
                        onClick={() => cambiarPagina(paginaActual + 1)}
                        disabled={paginaActual === totalPaginas}
                        className="boton-paginacion"
                    >
                        &gt;
                    </button>
                </div>
            )}
        </div>
    );
};

export default TablaInscritos;

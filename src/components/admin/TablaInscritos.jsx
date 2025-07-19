import React from 'react';
import './TablaInscritos.css';

const TablaInscritos = ({ inscritos = [], onAprobar, onAnular }) => {
    return (
        <div className="tabla-inscritos-container">
            {/* <h2>Inscritos</h2> */}
            <table className="tabla-inscritos">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Número de documento</th>
                        <th>Estado</th>
                        <th>Comprobante de pago</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {inscritos.length === 0 ? (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center' }}>No hay inscritos</td>
                        </tr>
                    ) : (
                        inscritos.map((inscrito) => (
                            <tr key={inscrito.id}>
                                <td>{inscrito.nombre}</td>
                                <td>{inscrito.documento}</td>
                                <td>{inscrito.estado}</td>
                                <td>
                                    {inscrito.comprobante ? (
                                        <a href={inscrito.comprobante} target="_blank" rel="noopener noreferrer">
                                            Ver comprobante
                                        </a>
                                    ) : 'No disponible'}
                                </td>
                                <td>
                                    <button className="btn-aprobar" onClick={() => onAprobar(inscrito.id)}>Aprobar</button>
                                    <button className="btn-anular" onClick={() => onAnular(inscrito.id)}>Anular</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TablaInscritos;

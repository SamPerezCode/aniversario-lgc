import React, { useEffect } from 'react';
import { useInscripciones } from '../../context/InscripcionesContext';
import './TablaInscritos.css';

const TablaInscripciones = () => {
    const { inscripciones, cargarInscripciones } = useInscripciones();

    useEffect(() => {
        cargarInscripciones();
    }, []);

    return (
        <div className="tabla-wrapper">
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
                    {inscripciones.map((item) => (
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
                                <div className="btn-actions">
                                    <button className="btn-aprobar">Aprobar</button>
                                    <button className="btn-anular">Anular</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>


    );
};

export default TablaInscripciones;

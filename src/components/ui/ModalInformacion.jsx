import React from 'react';
import './ModalInformacion.css';

const ModalInformacion = ({ tipo, onCerrar }) => {
    return (
        <div className="modal-confirmacion-overlay">
            <div className="modal-confirmacion-contenido modal-info-contenido">
                <button className="btn-cerrar" onClick={onCerrar}>✖</button>
                <h2>Información importante antes de diligenciar el formulario</h2>
                <div className="modal-scroll">


                    {tipo === "virtual" && (
                        <>
                            <h3>Evento Virtual</h3>
                            <p>Por favor diligencia esta inscripción <strong>SOLO cuando tengas el comprobante de pago del día sábado.</strong></p>
                            <p>
                                <strong>LINK DE PAGO PAYPAL:</strong> <a href="https://paypal.me/jonathanmurciad" target="_blank" rel="noopener noreferrer">paypal.me/jonathanmurciad</a><br />
                                <strong>Transferencia Bancaria:</strong> Ahorro Bancolombia 197 000 051 18 — Nit 900058562-2<br />
                                Especificar que tu pago es para <strong>EVENTO ANIVERSARIO</strong> y enviar soporte al WhatsApp +57 3166972613
                            </p>
                            <p>
                                <strong>Incluye:</strong><br />
                                - Ponencias sobre el Espíritu Santo.<br />
                                - Panel, sesión de preguntas y respuestas.<br />
                                - Horario: 09:00 A.M. - 06.00 P.M. HORA BOGOTÁ<br />
                                - Valor por persona: <strong>USD 15</strong>
                            </p>
                        </>
                    )}

                    {tipo === "presencial" && (
                        <>
                            <h3>Evento Presencial</h3>
                            <p>Por favor diligencia esta inscripción <strong>SOLO cuando tengas el comprobante de pago del día sábado.</strong></p>
                            <p>
                                <strong>Transferencia Bancaria:</strong> Ahorro Bancolombia 19700005118 — Nit 900058562-2<br />
                                Especificar que tu pago es para <strong>SEMINARIO</strong> y enviar soporte al WhatsApp 3166972613
                            </p>
                            <p>*Este evento aplica solo para mayores de 12 años. Cada asistente debe diligenciar este formulario y pagar su inscripción.</p>
                            <p>
                                <strong>Incluye:</strong><br />
                                - Ponencias sobre el Espíritu Santo.<br />
                                - Panel, sesión de preguntas y respuestas.<br />
                                - Merienda, lunch, obsequio especial.<br />
                                - Tiempo de oración y ministración.<br />
                                - Horario: 8:00 A.M. - 5:00 P.M.<br />
                                - Valor: <strong>$75.000 COP Preventa</strong> (hasta el 10 de agosto)<br />
                                - Valor: <strong>$90.000 COP Pleno</strong> (después del 10 de agosto)
                            </p>
                        </>
                    )}

                    <p>Si tienes alguna pregunta, escríbenos a <strong>grancomisionccieventos@gmail.com</strong> o al WhatsApp: <strong>3166972613</strong></p>


                </div>

                <div className="modal-botones">
                    <button className="btn-continuar" onClick={onCerrar}>Aceptar</button>
                </div>
            </div>
        </div>
    );
};

export default ModalInformacion;

import { useEffect, useState } from "react";
import HeaderFormulario from "./HeaderFormulario";
import NewFormulario from "./NewFormulario";
import "./FormularioInscripcion.css";
import { useModal } from "../../context/ModalContext";


const InscripcionPublica = () => {
    const [evento, setEvento] = useState("presencial"); // Por defecto
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);
    const [showModalExito, setShowModalExito] = useState(false);

    const { hideModal } = useModal();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        const timer = setTimeout(() => setFadeIn(true), 50);
        return () => clearTimeout(timer);
    }, []);

    const handleContinuar = () => {
        setMostrarFormulario(true);
    };

    const handleVolver = () => {
        setMostrarFormulario(false);
        setEvento("presencial");
    };

    const handleExito = () => {
        setShowModalExito(true);
    };

    const handleCerrarModalExito = () => {
        setShowModalExito(false);
        setMostrarFormulario(false);
        setEvento("presencial");
    };

    return (
        <div className="formulario-wrapper">
            <HeaderFormulario />

            {fadeIn && (
                <main className="form-inscripcion fade-in">
                    {!mostrarFormulario && (
                        <div className="mensaje-evento">
                            {/* <p><strong>Este evento se realizará del 22 al 24 de agosto de 2025</strong></p>

                            <div className="alerta-cierre">
                                <p>⚠️ Las inscripciones <strong>gratuitas</strong> y la <strong>presencial paga del sábado 23</strong> han sido cerradas.</p>
                                <p>✨ Actualmente <strong>solo está disponible la modalidad virtual</strong> para el sábado 23 de agosto.</p>
                            </div> */}

                            {/* <ul>
                                <li><strong>Modalidad Virtual:</strong>
                                    <ul>
                                        <li>$15 USD</li>
                                    </ul>
                                </li>

                                <li>El seminario aplica para mayores de 12 años. Cada asistente debe diligenciar este formulario y realizar su pago para completar la inscripción.</li>
                                <li>Incluye:
                                    <ul>
                                        <li>Ponencias</li>
                                        <li>Panel con sesión de preguntas y respuestas</li>

                                    </ul>
                                </li>
                                <li>
                                    <h4>Datos para pago en pesos colombianos:</h4>
                                    <ul>
                                        <li><strong>Banco:</strong> Bancolombia</li>
                                        <li><strong>Tipo cuenta:</strong> Ahorros</li>
                                        <li><strong>Número:</strong> 19700005118</li>
                                        <li><strong>NIT:</strong> 900058562-2</li>
                                    </ul>
                                    <h4 style={{ marginTop: '1.2rem' }}>Enlace para pagos internacionales:</h4>
                                    <ul>
                                        <li>
                                            <a
                                                href="https://www.paypal.com/paypalme/jonathanmurciad"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className='enlace-soporte'
                                            >
                                                https://www.paypal.com/paypalme/jonathanmurciad
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>¿Preguntas? Escríbenos a <a href="mailto:grancomisionccieventos@gmail.com">grancomisionccieventos@gmail.com</a> o al WhatsApp: <a href="https://wa.me/573166972613" target="_blank">3166972613</a></li>
                            </ul> */}

                            {/* <div className="container-btn-continuar">
                                <button className="btn-continuar" onClick={handleContinuar}>
                                    Continuar
                                </button>
                            </div> */}

                            <h4>Inscripciones cerradas</h4>
                        </div>

                    )}

                    {mostrarFormulario && (
                        <NewFormulario
                            evento={evento}
                            onSubmitSuccess={handleExito}
                            onVolver={handleVolver}
                        />
                    )}

                </main>
            )}

            {showModalExito && (
                <div className="modal-confirmacion-overlay">
                    <div className="modal-confirmacion-contenido">
                        <h2>¡Inscripción enviada correctamente!</h2>
                        <p>Revise su correo electrónico para consultar la confirmación de la inscripción.
                            Si no lo encuentra en la bandeja de entrada, verifique la carpeta de spam o correo no deseado..</p>
                        <div className="modal-botones">
                            <button className="btn-continuar" onClick={handleCerrarModalExito}>
                                Aceptar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InscripcionPublica;

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
                            <p><strong>Este evento se realizará del 22 al 24 de agosto de 2025</strong></p>
                            <ul>
                                <li>Viernes 22 y domingo 24 de agosto – la entrada es gratuita</li>
                                <li>Sábado 23 de agosto – seminario pago:
                                    <ul>
                                        <li><strong>Modalidad Presencial:</strong>
                                            <ul>
                                                {/* <li>$75.000 COP (preventa hasta el 5 de agosto)</li> */}
                                                <li>$90.000 COP </li>
                                                <li>Incluye la inscripción a los tres días</li>
                                            </ul>
                                        </li>
                                        <li><strong>Modalidad Virtual:</strong>
                                            <ul>
                                                <li>$15 USD (solo sábado)</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li>El seminario aplica para mayores de 12 años. Cada asistente debe diligenciar este formulario y realizar su pago para completar la inscripción.</li>
                                <li>Incluye:
                                    <ul>
                                        <li>Ponencias</li>
                                        <li>Panel con sesión de preguntas y respuestas</li>
                                        <li>Merienda, lunch, obsequio especial</li>
                                    </ul>
                                </li>
                                <li>¿Preguntas? Escríbenos a <a href="mailto:grancomisionccieventos@gmail.com">grancomisionccieventos@gmail.com</a> o al WhatsApp: <a href="https://wa.me/573166972613" target="_blank">3166972613</a></li>
                            </ul>

                            <div className="container-btn-continuar">
                                <button className="btn-continuar" onClick={handleContinuar}>
                                    Continuar
                                </button>
                            </div>


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
                        <p>Pronto nos contactaremos contigo.</p>
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

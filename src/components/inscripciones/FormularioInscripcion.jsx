import { useEffect, useState } from "react";
import HeaderFormulario from "./HeaderFormulario";
import FormularioEvento from "./FormularioEvento";

import "./FormularioInscripcion.css";
import { useModal } from "../../context/ModalContext";

const InscripcionPublica = () => {
    const [evento, setEvento] = useState("");
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);
    const [showModalExito, setShowModalExito] = useState(false);

    const { showModal, hideModal } = useModal();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        const timer = setTimeout(() => setFadeIn(true), 50);
        return () => clearTimeout(timer);
    }, []);

    const handleSeleccionEvento = (tipo) => {
        setEvento(tipo);

        const mensaje =
            tipo === "presencial"
                ? "Si eres de Valledupar o cualquier otra ciudad, pero deseas participar presencialmente del evento el día sábado 23 de agosto, haz clic en continuar."
                : "Si eres de otra ciudad o país y deseas participar de manera virtual el día sábado 23 de agosto, haz clic en continuar.";

        showModal({
            mensaje,
            onConfirmar: () => {
                hideModal();
                setMostrarFormulario(true);
            },
            onCancelar: () => {
                setEvento("");
                hideModal();
            },
        });
    };

    const handleVolver = () => {
        setMostrarFormulario(false);
        setEvento("");
    };

    const handleExito = () => {
        setShowModalExito(true);
    };

    const handleCerrarModalExito = () => {
        setShowModalExito(false);
        setMostrarFormulario(false);
        setEvento("");
    };

    return (
        <div className="formulario-wrapper">
            <HeaderFormulario />

            {fadeIn && (
                <main className="form-inscripcion fade-in">
                    {!mostrarFormulario && (
                        <div className="botones-evento">
                            <h3 className="seleccion-titulo">Selecciona el tipo de evento:</h3>
                            <button className="btn-evento" onClick={() => handleSeleccionEvento("presencial")}>
                                Presencial / Valledupar
                            </button>
                            <button className="btn-evento" onClick={() => handleSeleccionEvento("virtual")}>
                                Virtual
                            </button>
                        </div>
                    )}

                    {mostrarFormulario && (
                        <FormularioEvento
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

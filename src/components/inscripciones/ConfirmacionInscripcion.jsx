// src/pages/ConfirmacionInscripcion.jsx
import { useNavigate } from "react-router-dom";
import "./ConfirmacionInscripcion.css";

const ConfirmacionInscripcion = () => {
    const navigate = useNavigate();

    const handleFinalizar = () => {
        navigate("/");
    };

    return (
        <div className="confirmacion-container">
            <div className="confirmacion-card">
                <h2>¡Gracias por inscribirte!</h2>
                <p>
                    Tu inscripción al <strong>25 Aniversario</strong> ha sido recibida correctamente.
                    <br />
                    Pronto nos comunicaremos contigo.
                </p>
                <button onClick={handleFinalizar} className="btn-principal">
                    Finalizar
                </button>
            </div>
        </div>
    );
};

export default ConfirmacionInscripcion;

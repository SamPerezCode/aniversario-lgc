import "./ModalConfirmacion.css";
import { useNavigate } from "react-router-dom";

const ModalConfirmacion = ({ mensaje, onFinalizar }) => {
    const navigate = useNavigate();

    const handleFinalizar = () => {
        if (onFinalizar) {
            onFinalizar();
        } else {
            navigate("/"); // Redirección por defecto
        }
    };

    return (
        <div className="modal-confirmacion-overlay">
            <div className="modal-confirmacion-contenido">
                <p>{mensaje}</p>
                <div className="modal-botones">
                    <button onClick={handleFinalizar} className="btn-continuar">
                        Finalizar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmacion;

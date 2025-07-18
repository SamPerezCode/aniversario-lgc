
import "./ModalConfirmacion.css";

const ModalConfirmacion = ({ mensaje, onConfirmar, onCancelar }) => {
    return (
        <div className="modal-confirmacion-overlay">
            <div className="modal-confirmacion-contenido">
                <p>{mensaje}</p>
                <div className="modal-botones">
                    <button onClick={onConfirmar} className="btn-continuar">
                        Continuar
                    </button>
                    <button onClick={onCancelar} className="btn-cancelar">
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmacion;

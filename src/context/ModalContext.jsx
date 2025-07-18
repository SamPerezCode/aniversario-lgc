// src/context/ModalContext.jsx
import { createContext, useContext, useState } from "react";
import ModalConfirmacion from "../components/ui/ModalConfirmacion";
import ModalInformacion from "../components/ui/ModalInformacion"; // ✅

const ModalContext = createContext();

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal debe usarse dentro de ModalProvider");
    }
    return context;
};

export function ModalProvider({ children }) {
    const [modalData, setModalData] = useState(null);
    const [infoModal, setInfoModal] = useState(null); // ✅

    // Modal de confirmación
    const showModal = ({ mensaje, onConfirmar, onCancelar }) => {
        setModalData({ mensaje, onConfirmar, onCancelar });
    };

    const hideModal = () => setModalData(null);

    const handleConfirmar = () => {
        modalData?.onConfirmar?.();
        hideModal();
    };

    const handleCancelar = () => {
        modalData?.onCancelar?.();
        hideModal();
    };

    // Modal informativo (tipo = "presencial" o "virtual")
    const showInfoModal = (tipo) => {
        setInfoModal({ tipo });
    };

    const hideInfoModal = () => setInfoModal(null);

    return (
        <ModalContext.Provider value={{ showModal, hideModal, showInfoModal, hideInfoModal }}>
            {children}

            {/* Modal de confirmación */}
            {modalData && (
                <ModalConfirmacion
                    mensaje={modalData.mensaje}
                    onConfirmar={handleConfirmar}
                    onCancelar={handleCancelar}
                />
            )}

            {/* Modal de información */}
            {infoModal && (
                <ModalInformacion
                    tipo={infoModal.tipo}
                    onCerrar={hideInfoModal}
                />
            )}
        </ModalContext.Provider>
    );
}

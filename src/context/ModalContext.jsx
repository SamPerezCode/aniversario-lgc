// src/context/ModalContext.jsx
import { createContext, useContext, useState } from "react";
import ModalConfirmacion from "../components/ui/ModalConfirmacion";
import ModalInformacion from "../components/ui/ModalInformacion";

// Crear el contexto
const ModalContext = createContext();

// Hook personalizado
export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) throw new Error("useModal debe usarse dentro de un ModalProvider");
    return context;
};

// Proveedor de contexto
export function ModalProvider({ children }) {
    // Estado para el modal de confirmación
    const [modalConfirmacion, setModalConfirmacion] = useState(null);

    // Estado para el modal de información
    const [modalInformacion, setModalInformacion] = useState(null);

    // Mostrar modal de confirmación
    const mostrarModalConfirmacion = (mensaje) => {
        if (!mensaje) return;
        setModalConfirmacion(mensaje);
    };

    // Ocultar modal de confirmación
    const cerrarModalConfirmacion = () => setModalConfirmacion(null);

    // Mostrar modal de información (puede recibir más propiedades si se desea)
    const mostrarModalInformacion = (tipo) => {
        if (!tipo) return;
        setModalInformacion({ tipo });
    };

    // Ocultar modal de información
    const cerrarModalInformacion = () => setModalInformacion(null);

    return (
        <ModalContext.Provider
            value={{
                mostrarModalConfirmacion,
                cerrarModalConfirmacion,
                mostrarModalInformacion,
                cerrarModalInformacion,
            }}
        >
            {children}

            {/* Modal de confirmación */}
            {modalConfirmacion && (
                <ModalConfirmacion
                    mensaje={modalConfirmacion}
                    onCerrar={cerrarModalConfirmacion}
                />
            )}

            {/* Modal de información */}
            {modalInformacion && (
                <ModalInformacion
                    tipo={modalInformacion.tipo}
                    onClose={cerrarModalInformacion}
                />
            )}
        </ModalContext.Provider>
    );
}

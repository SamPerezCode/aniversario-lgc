// src/api/subirComprobantePago.js
import { API_BASE_URL } from './apiConfig';

const subirComprobantePago = async (archivo) => {
    const formData = new FormData();
    formData.append('ruta_comprobante_pago', archivo);

    try {
        const response = await fetch(`${API_BASE_URL}/cargar-soporte-pago`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Error al subir el comprobante');
        }

        const data = await response.json();
        console.log("Esta es la data: ", data)
        return data.path;
    } catch (error) {
        console.error('❌ Error en subirComprobantePago:', error.message);
        throw error;
    }
};

export default subirComprobantePago;

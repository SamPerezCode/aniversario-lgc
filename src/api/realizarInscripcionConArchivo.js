// src/data/inscripciones/realizarInscripcionConArchivo.js
import { API_BASE_TEST_URL } from '../api/apiConfig';

const realizarInscripcionConArchivo = async (formData) => {
    try {
        const response = await fetch(`${API_BASE_TEST_URL}/realizar-inscripcion`, {
            method: 'POST',
            body: formData,
        });

        const result = await response.json(); // extraemos aunque haya error

        if (!response.ok) {
            console.error("❌ Respuesta del servidor:", result); // NUEVO
            throw new Error(result?.mensaje || 'Error al realizar la inscripción con archivo');
        }

        return result;
    } catch (error) {
        console.error('❌ Error en realizarInscripcionConArchivo:', error.message);
        throw error;
    }
};


export default realizarInscripcionConArchivo;

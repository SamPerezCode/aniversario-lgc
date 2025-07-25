// src/data/inscripciones/realizarInscripcion.js

import API_BASE_URL from "./apiConfig";


const realizarInscripcion = async (data) => {
    try {



        const response = await fetch(`${API_BASE_URL}/realizar-inscripcion`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorText = await response.text(); // 💡 Esto te da más info del backend
            throw new Error(errorText || 'Error al realizar la inscripción');
        }

        return await response.json();
    } catch (error) {
        console.error('Error en realizarInscripcion:', error.message);
        throw error;
    }
};


export default realizarInscripcion;

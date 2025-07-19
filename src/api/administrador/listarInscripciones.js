// src/api/administrador/listarInscripciones.js
export const listarInscripciones = async (token) => {
    try {
        const response = await fetch('https://dockerapps.pulzo.com/lgc-aniversario/api/inscripciones', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener las inscripciones');
        }

        const data = await response.json();
        // console.log('Respuesta del servidor (inscripciones):', data);
        return data;
    } catch (error) {
        console.error('Error en listarInscripciones:', error);
        throw error;
    }
};

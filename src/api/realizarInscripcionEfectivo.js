// src/api/realizarInscripcionEfectivo.js

export const realizarInscripcionEfectivo = async (datos, token) => {
    try {
        const response = await fetch('https://dockerapps.pulzo.com/lgc-aniversario/api/inscripciones/pago-efectivo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(datos),
        });

        if (!response.ok) {
            throw new Error('Error al realizar inscripción en efectivo');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en realizarInscripcionEfectivo:', error);
        throw error;
    }
};

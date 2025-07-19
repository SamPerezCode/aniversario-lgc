const API_URL = 'https://dockerapps.pulzo.com/lgc-aniversario/api/inscripciones/pendientes';

export async function listarInscripcionesPendientesRevision() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error('Error al obtener las inscripciones pendientes');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en listarInscripcionesPendientesRevision:', error.message);
        throw error;
    }
}

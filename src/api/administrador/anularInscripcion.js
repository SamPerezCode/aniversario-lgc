export async function anularInscripcion(inscripcionId) {
    try {
        const response = await fetch(`https://dockerapps.pulzo.com/lgc-aniversario/api/inscripciones/anular/${inscripcionId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error al anular la inscripción');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en anularInscripcion:', error);
        throw error;
    }
}

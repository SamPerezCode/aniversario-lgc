export async function aprobarInscripcion(inscripcionId, token) {
    try {
        const response = await fetch(`https://dockerapps.pulzo.com/lgc-aniversario/api/inscripciones/aprobar/${inscripcionId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error al aprobar la inscripción');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en aprobarInscripcion:', error);
        throw error;
    }
}

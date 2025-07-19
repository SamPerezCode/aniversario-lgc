export async function anularInscripcion(id, token) {
    // console.log("ID que se está enviando al backend:", id);

    try {
        const response = await fetch(`https://dockerapps.pulzo.com/lgc-aniversario/api/inscripciones/anular/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // <-- FALTA ESTO
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            // console.error('Respuesta del servidor:', errorData);
            throw new Error('Error al anular la inscripción');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en anularInscripcion:', error);
        throw error;
    }
}

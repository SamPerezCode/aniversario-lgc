// src/api/realizarInscripcion.js
export async function realizarInscripcion(datos) {
    try {
        // console.log("Enviando datos:", datos); 
        const respuesta = await fetch("https://dockerapps.pulzo.com/lgc-aniversario/realizar-inscripcion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(datos)
        });

        if (!respuesta.ok) {
            const errorData = await respuesta.json();
            throw new Error(errorData?.mensaje || "Error al enviar la inscripción");
        }

        const data = await respuesta.json();
        return data;
    } catch (error) {
        console.error("Error en la inscripción:", error);
        throw error;
    }
}

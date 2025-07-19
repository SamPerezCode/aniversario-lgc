
export async function subirComprobantePago(file) {
    const formData = new FormData();
    formData.append("ruta_comprobante_pago", file);

    const respuesta = await fetch("https://dockerapps.pulzo.com/lgc-aniversario/cargar-soporte-pago", {
        method: "POST",
        body: formData,
    });

    if (!respuesta.ok) {
        const errorData = await respuesta.json();
        throw new Error(errorData?.mensaje || "Error al subir el comprobante");
    }

    const data = await respuesta.json();
    return data; // Esto debe tener una propiedad como: data.ruta o data.url
}

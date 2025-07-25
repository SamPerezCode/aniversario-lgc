// src/pages/AdjuntarSoportePago.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInscripciones } from "../../context/InscripcionesContext";
import realizarInscripcion from "../../api/realizarInscripcion";
import "./AdjuntarSoportePago.css";

const AdjuntarSoportePago = () => {
    const navigate = useNavigate();
    const {
        inscripcionTemporal,
        subirYGuardarComprobantePago,
        limpiarInscripcionTemporal
    } = useInscripciones();

    const [archivo, setArchivo] = useState(null);
    const [error, setError] = useState("");

    const handleArchivoChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type.includes("image/") || file.type === "application/pdf")) {
            setArchivo(file);
            setError("");
        } else {
            setArchivo(null);
            setError("Solo se permiten imágenes o archivos PDF.");
        }
    };

    const handleContinuar = async () => {
        if (!archivo) {
            setError("Debes adjuntar un comprobante de pago.");
            return;
        }

        try {
            const ruta = await subirYGuardarComprobantePago(archivo);

            const datosInscripcion = {
                ...inscripcionTemporal,
                url_soporte_pago: ruta
            };

            await realizarInscripcion(datosInscripcion);
            limpiarInscripcionTemporal();
            navigate("/confirmacion"); // ✅ Redirige a nueva página
        } catch (err) {
            console.error("❌ Error en inscripción:", err.message);

            let mensaje = "Ocurrió un error al registrar la inscripción.";
            try {
                const parsed = JSON.parse(err.message);
                mensaje = parsed.message || mensaje;
            } catch (e) {
                // Si no se puede parsear, deja el mensaje por defecto
            }

            alert(mensaje);
        }


    };

    const handleRegresar = () => {
        navigate("/resumen-final");
    };

    return (
        <div className="adjuntar-soporte-contenedor">
            <h2>Soporte de pago</h2>
            <p className="nota">
                Nota: si tienes más de un comprobante de pago unifícalo y súbelo a la inscripción.
            </p>

            <p className="total">
                Total a pagar: <strong>COP ${inscripcionTemporal.monto_cop.toLocaleString()}</strong>
            </p>

            <p className="total">
                Total a pagar: <strong>USD ${inscripcionTemporal.monto_usd}</strong>
            </p>

            <div className="campo-archivo">
                <label htmlFor="archivo">Adjuntar comprobante</label>
                <input
                    id="archivo"
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleArchivoChange}
                />
                {error && <p className="error">{error}</p>}
            </div>

            <div className="botones">
                <button type="button" className="btn-secundario" onClick={handleRegresar}>
                    Regresar
                </button>
                <button type="button" className="btn-principal" onClick={handleContinuar}>
                    Inscribirse
                </button>
            </div>
        </div>
    );
};

export default AdjuntarSoportePago;

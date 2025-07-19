import { useState } from "react";
import { realizarInscripcion } from "../../api/realizarInscripcion";
import { subirComprobantePago } from "../../api/ubirComprobantePago";
import ModalInformacion from "../ui/ModalInformacion";
import "./FormularioEvento.css";
import { useModal } from "../../context/ModalContext";


const FormularioEvento = ({ evento, onSubmitSuccess, onVolver }) => {
    const [formData, setFormData] = useState({
        nombre: "",
        documento: "",
        email: "",
        codigoPais: "+57",
        telefono: "",
        ciudad: "",
        iglesia: "",
        otraIglesia: "",
        comprobante_pago: null,
        habeas_data: false,
        asistencia: evento === "presencial" ? "Presencial" : "Virtual",
    });

    const [enviando, setEnviando] = useState(false);

    // ✅ Importamos todo lo que se necesita del contexto
    const { showInfoModal, hideInfoModal, infoModal } = useModal();

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === "checkbox") {
            setFormData((prev) => ({ ...prev, [name]: checked }));
        } else if (type === "file") {
            setFormData((prev) => ({ ...prev, comprobante_pago: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.habeas_data) {
            alert("Debes aceptar las políticas de tratamiento de datos.");
            return;
        }

        if (!/^[0-9]{7,}$/.test(formData.telefono)) {
            alert("El número de teléfono debe tener al menos 7 dígitos y solo contener números.");
            return;
        }

        try {
            setEnviando(true);

            let rutaComprobante = "";

            if (formData.comprobante_pago) {
                const resultado = await subirComprobantePago(formData.comprobante_pago);
                rutaComprobante = resultado?.path || "";

            }

            const telefonoCompleto = `${formData.codigoPais}${formData.telefono}`;

            const payload = {
                nombre: formData.nombre,
                documento: formData.documento,
                email: formData.email,
                telefono: telefonoCompleto,
                ciudad: evento === "virtual" ? formData.ciudad : "",
                iglesia:
                    evento === "presencial"
                        ? formData.iglesia === "otra"
                            ? formData.otraIglesia
                            : formData.iglesia
                        : "",
                asistencia: formData.asistencia,
                habeas_data: formData.habeas_data,
                comprobante_pago: rutaComprobante, // 👉 Aquí va la ruta real
            };

            const respuesta = await realizarInscripcion(payload);
            onSubmitSuccess();
        } catch (error) {
            alert("Ocurrió un error al enviar la inscripción: " + error.message);
            console.error("Error:", error);
        } finally {
            setEnviando(false);
        }
    };

    return (
        <>
            <div
                className="mensaje-informativo"
                onClick={() => showInfoModal(evento)}
            >
                <p>
                    Por favor llena el formulario después de leer esta información{' '}
                    <span className="clic-aqui">haz clic aquí</span>.
                </p>
            </div>

            {/* ✅ Renderizar modal si infoModal está definido */}
            {infoModal && (
                <ModalInformacion
                    tipo={infoModal.tipo}
                    onCerrar={hideInfoModal}
                />
            )}


            <form onSubmit={handleSubmit} className="form-evento">
                <label>
                    Nombre completo:
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Documento:
                    <input
                        type="text"
                        name="documento"
                        value={formData.documento}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Correo electrónico:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Teléfono:
                    <div className="telefono-group">
                        <select name="codigoPais" value={formData.codigoPais} onChange={handleChange}>
                            <option value="+57">🇨🇴 +57 </option>
                            <option value="+1">🇺🇸 +1 </option>
                            <option value="+52">🇲🇽 +52</option>
                            <option value="+54">🇦🇷 +54 </option>
                            <option value="+51">🇵🇪 +51 </option>
                            <option value="+56">🇨🇱 +56 </option>
                            <option value="+593">🇪🇨 +593 </option>
                            <option value="+58">🇻🇪 +58 </option>
                            <option value="+34">🇪🇸 +34 </option>
                        </select>
                        <input
                            type="tel"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </label>

                {evento === "virtual" && (
                    <label>
                        Ciudad:
                        <input
                            type="text"
                            name="ciudad"
                            value={formData.ciudad}
                            onChange={handleChange}
                            required
                        />
                    </label>
                )}

                {evento === "presencial" && (
                    <>
                        <label>
                            Iglesia:
                            <select
                                name="iglesia"
                                value={formData.iglesia}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccione una opción</option>
                                <option value="La Gran Comisión">La Gran Comisión</option>
                                <option value="No asiste a una iglesia">No asiste a una iglesia</option>
                                <option value="otra">Otra iglesia</option>
                            </select>
                        </label>

                        {formData.iglesia === "otra" && (
                            <label>
                                ¿Cuál?
                                <input
                                    type="text"
                                    name="otraIglesia"
                                    value={formData.otraIglesia}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        )}
                    </>
                )}

                <label>
                    Comprobante de pago:
                    <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        name="comprobante_pago"
                        onChange={handleChange}
                        required
                    />
                </label>

                <div className="habeas-data">
                    <div className="politicas-scroll">
                        <p>
                            <strong>Autorización de datos personales:</strong><br /><br />
                            En cumplimiento de la Ley Estatutaria 1581 de 2012, autorizo a LA GRAN COMISIÓN COMUNIDAD CRISTIANA INTEGRAL, a realizar el tratamiento de mis datos personales, actividad que incluye la recolección, almacenamiento, actualización, uso, circulación, transmisión, transferencia y supresión, para los fines contenidos en la POLÍTICAS PARA EL TRATAMIENTO DE DATOS PERSONALES de LA GRAN COMISIÓN COMUNIDAD CRISTIANA INTEGRAL. De igual forma, autorizo el uso de fotografías y videos en las cuales aparezca individualmente o en grupo, para producciones audiovisuales y sus publicaciones por parte de La Gran Comisión CCI.
                        </p>
                    </div>

                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            name="habeas_data"
                            checked={formData.habeas_data}
                            onChange={handleChange}
                            id="habeas_data"
                        />
                        <label htmlFor="habeas_data">
                            Acepto políticas de tratamiento de datos personales
                        </label>
                    </div>

                </div>


                <button type="submit" disabled={enviando}>
                    {enviando ? "Enviando..." : "Realizar inscripción"}
                </button>
                <button type="button" className="btn-volver" onClick={onVolver}>
                    Cancelar
                </button>
            </form>
        </>
    );
};

export default FormularioEvento;

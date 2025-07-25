import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInscripciones } from "../context/InscripcionesContext";
import "./FormularioInscripcionEfectivo.css";




const FormularioInscripcionEfectivo = ({ onSubmitSuccess = () => { }, onVolver = () => { } }) => {
    const { registrarInscripcionEfectivo } = useInscripciones();
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        nombre: "",
        documento: "",
        email: "",
        codigoPais: "+57",
        telefono: "",
        iglesia: "",
        habeas_data: false,
    });

    const [enviando, setEnviando] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
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

            const telefonoCompleto = `${formData.codigoPais.replace("-CA", "")}${formData.telefono}`;

            const payload = {
                nombre: formData.nombre,
                documento: formData.documento,
                email: formData.email,
                telefono: telefonoCompleto,
                iglesia: formData.iglesia,
                habeas_data: formData.habeas_data,
            };

            await registrarInscripcionEfectivo(payload);

            alert("✅ Inscripción enviada con éxito.");
            setFormData({
                nombre: "",
                documento: "",
                email: "",
                codigoPais: "+57",
                telefono: "",
                iglesia: "",
                habeas_data: false,
            });

            onSubmitSuccess();
        } catch (error) {
            alert("❌ Ocurrió un error al enviar la inscripción. Intenta nuevamente.");
        } finally {
            setEnviando(false);
        }
    };

    return (
        <>
            <div className="form-efectivo__pagina">
                <div className="form-efectivo__contenedor">
                    <h2 className="form-efectivo__titulo">Formulario para pago en efectivo</h2>

                    <form onSubmit={handleSubmit} className="form-efectivo__formulario">
                        <label>
                            Nombre completo:
                            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
                        </label>

                        <label>
                            Documento:
                            <input type="text" name="documento" value={formData.documento} onChange={handleChange} required />
                        </label>

                        <label>
                            Correo electrónico:
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                        </label>

                        <label>
                            Teléfono:
                            <div className="form-efectivo__telefono-group">
                                <select name="codigoPais" value={formData.codigoPais} onChange={handleChange}>
                                    <option value="+57">Colombia +57</option>
                                    <option value="+1">EE.UU. +1</option>
                                    <option value="+1-CA">Canadá +1</option>
                                    <option value="+52">México +52</option>
                                    <option value="+54">Argentina +54</option>
                                    <option value="+51">Perú +51</option>
                                    <option value="+56">Chile +56</option>
                                    <option value="+593">Ecuador +593</option>
                                    <option value="+58">Venezuela +58</option>
                                    <option value="+591">Bolivia +591</option>
                                    <option value="+502">Guatemala +502</option>
                                    <option value="+503">El Salvador +503</option>
                                    <option value="+504">Honduras +504</option>
                                    <option value="+505">Nicaragua +505</option>
                                    <option value="+506">Costa Rica +506</option>
                                    <option value="+507">Panamá +507</option>
                                    <option value="+598">Uruguay +598</option>
                                    <option value="+595">Paraguay +595</option>
                                    <option value="+592">Guyana +592</option>
                                    <option value="+53">Cuba +53</option>
                                    <option value="+39">Italia +39</option>
                                    <option value="+33">Francia +33</option>
                                    <option value="+49">Alemania +49</option>
                                    <option value="+34">España +34</option>
                                    <option value="+44">Reino Unido +44</option>
                                </select>

                                <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required />
                            </div>
                        </label>

                        <label>
                            Iglesia:
                            <select name="iglesia" value={formData.iglesia} onChange={handleChange} required>
                                <option value="">Seleccione una opción</option>
                                <option value="La Gran Comisión">La Gran Comisión</option>
                                <option value="No asiste a una iglesia">No asiste a una iglesia</option>
                                <option value="otra">Otra iglesia</option>
                            </select>
                        </label>

                        <div className="form-efectivo__habeas">
                            <div className="form-efectivo__politicas">
                                <p>
                                    <strong>Autorización de datos personales:</strong><br /><br />
                                    En cumplimiento de la Ley Estatutaria 1581 de 2012, autorizo a LA GRAN COMISIÓN COMUNIDAD CRISTIANA INTEGRAL, a realizar el tratamiento de mis datos personales, actividad que incluye la recolección, almacenamiento, actualización, uso, circulación, transmisión, transferencia y supresión, para los fines contenidos en la POLÍTICAS PARA EL TRATAMIENTO DE DATOS PERSONALES. De igual forma, autorizo el uso de fotografías y videos en las cuales aparezca individualmente o en grupo, para producciones audiovisuales y sus publicaciones.
                                </p>
                            </div>

                            <div className="form-efectivo__acepta">
                                <label className="checkbox-wrapper">
                                    <input
                                        type="checkbox"
                                        id="habeas_data"
                                        className="form-efectivo__checkbox"
                                    />
                                    <span className="form-efectivo__label-checkbox">
                                        Acepto políticas de tratamiento de datos personales
                                    </span>
                                </label>
                            </div>


                        </div>

                        <button className="form-efectivo__btn form-efectivo__btn--enviar"
                            type="submit" disabled={enviando}>
                            {enviando ? "Enviando..." : "Guardar inscripción"}
                        </button>

                        <button type="button" className="form-efectivo__btn form-efectivo__btn--cancelar"
                            onClick={() => navigate('/admin')}>
                            Volver
                        </button>

                    </form>
                </div>
            </div>


        </>
    );
};

export default FormularioInscripcionEfectivo;

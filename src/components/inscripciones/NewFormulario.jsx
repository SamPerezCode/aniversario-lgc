// ... imports arriba se mantienen igual
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo/lgc-solo-color.PNG";
import { useInscripciones } from '../../context/InscripcionesContext';
import './NewFormulario.css';

const crearFormularioVacio = () => ({
    modalidad: '',
    nombre: '',
    documento: '',
    email: '',
    codigoPais: '+57',
    telefono: '',
    ciudad: '',
    iglesia: '',
    otraIglesia: '',
    comprobante_pago: null,
    habeas_data: false
});

const NewFormulario = () => {
    const [formularios, setFormularios] = useState([]);
    const {
        inscripcionTemporal,
        agregarParticipanteTemporal,
        actualizarParticipanteTemporal,
        actualizarInscripcionTemporal,
        participanteEnEdicion,
        setParticipanteEnEdicion
    } = useInscripciones();
    const navigate = useNavigate();

    useEffect(() => {
        if (participanteEnEdicion !== null && inscripcionTemporal.participantes[participanteEnEdicion]) {
            setFormularios([inscripcionTemporal.participantes[participanteEnEdicion]]);
        } else if (inscripcionTemporal.participantes.length > 0) {
            setFormularios(inscripcionTemporal.participantes);
        } else {
            setFormularios([crearFormularioVacio()]);
        }
    }, [inscripcionTemporal, participanteEnEdicion]);

    const handleChange = (index, e) => {
        const { name, value, type, checked, files } = e.target;
        const updatedFormularios = [...formularios];


        if (name === "modalidad") {
            // console.log("Entre aqui")
            updatedFormularios[index][name] = value;
            if (value === "virtual") {
                updatedFormularios[index]["dias_asistencia"] = "sabado";
            } else if (value === "gratuito") {
                // console.log("Está entrando en gratuito")
                updatedFormularios[index]["dias_asistencia"] = "viernes_y_domingo";
                // console.log(updatedFormularios)
            } else {
                updatedFormularios[index]["dias_asistencia"] = "sabado";
            }
        } else {
            updatedFormularios[index][name] =
                type === "checkbox" ? checked : type === "file" ? files[0] : value;
        }

        setFormularios(updatedFormularios);
    };

    const handleAgregarParticipante = () => {
        setFormularios([...formularios, crearFormularioVacio()]);
    };

    const eliminarParticipante = (index) => {
        const nuevaLista = [...formularios];
        nuevaLista.splice(index, 1);
        setFormularios(nuevaLista);
    };

    const handleContinuar = () => {
        const hayCamposInvalidos = formularios.some((form) => {
            const {
                modalidad,
                nombre = '',
                documento = '',
                email = '',
                telefono = '',
                ciudad = '',
                iglesia = '',
                otraIglesia = '',
                habeas_data
            } = form;

            if (!modalidad || !nombre.trim() || !documento.trim() || !email.trim() || !telefono.trim()) {
                // console.log("validación 0")
                return true;
            }

            if (!habeas_data) {
                // console.log("validación habeas data")
                return true;
            }



            if ((modalidad === 'virtual') && !ciudad.trim()) {
                // console.log("validación 2 ")
                return true;
            }

            if ((modalidad === 'presencial' || modalidad === 'gratuito') && !iglesia) {
                // console.log("validación 3")
                return true;
            }

            if (iglesia === 'otra' && !otraIglesia.trim()) {
                // console.log("validación 4")
                return true;
            }

            return false;
        });


        if (hayCamposInvalidos) {
            alert("Por favor, completa todos los campos obligatorios de todos los participantes.");
            return;
        }

        // Detectar forma de pago general
        const modalidadPrimera = formularios[0].modalidad;
        const forma_pago = modalidadPrimera === "gratuito" ? "gratuito" : "transaccion";
        actualizarInscripcionTemporal({ forma_pago });

        if (participanteEnEdicion !== null) {
            const form = { ...formularios[0] };

            if (form.iglesia === 'otra' && form.otraIglesia.trim()) {
                form.iglesia = form.otraIglesia.trim();
            }

            delete form.otraIglesia;
            actualizarParticipanteTemporal(participanteEnEdicion, form);
            setParticipanteEnEdicion(null);
        } else {
            formularios.forEach((form) => {
                const formNormalizado = { ...form };

                if (form.iglesia === 'otra' && form.otraIglesia.trim()) {
                    formNormalizado.iglesia = form.otraIglesia.trim();
                }

                delete formNormalizado.otraIglesia;
                agregarParticipanteTemporal(formNormalizado);
            });
        }


        navigate("/resumen-final");
    };

    // console.log(inscripcionTemporal)

    return (
        <div className="formulario-wrapper">
            <form className="form-inscripcion fade-in" onSubmit={(e) => e.preventDefault()}>
                <img src={logo} alt="Logo" className="logo-iglesia" />
                <h2 className="titulo">Formulario de inscripción</h2>

                {formularios.map((formData, index) => (
                    <div key={index} className="formulario-participante">
                        <h3>Participante {index + 1}</h3>

                        <label>
                            Modalidad de participación:
                            <select name="modalidad" value={formData.modalidad} onChange={(e) => handleChange(index, e)} required>
                                <option value="">Seleccione una opción</option>
                                <option value="presencial">Sábado Presencial (Incluye los tres días)</option>
                                <option value="virtual">Sábado Virtual</option>
                                <option value="gratuito">Solo viernes y domingo</option>
                            </select>
                        </label>

                        <label>
                            Nombre completo:
                            <input type="text" name="nombre" value={formData.nombre} onChange={(e) => handleChange(index, e)} required />
                        </label>

                        <label>
                            Documento:
                            <input type="text" name="documento" value={formData.documento} onChange={(e) => handleChange(index, e)} required />
                        </label>

                        <label>
                            Correo electrónico:
                            <input type="email" name="email" value={formData.email} onChange={(e) => handleChange(index, e)} required />
                        </label>

                        <label>
                            Teléfono:
                            <div className="telefono-group">
                                <select name="codigoPais" value={formData.codigoPais} onChange={(e) => handleChange(index, e)} required>
                                    <option value="+54">Argentina +54</option>
                                    <option value="+591">Bolivia +591</option>
                                    <option value="+56">Chile +56</option>
                                    <option value="+57">Colombia +57</option>
                                    <option value="+506">Costa Rica +506</option>
                                    <option value="+53">Cuba +53</option>
                                    <option value="+593">Ecuador +593</option>
                                    <option value="+503">El Salvador +503</option>
                                    <option value="+502">Guatemala +502</option>
                                    <option value="+504">Honduras +504</option>
                                    <option value="+52">México +52</option>
                                    <option value="+505">Nicaragua +505</option>
                                    <option value="+507">Panamá +507</option>
                                    <option value="+595">Paraguay +595</option>
                                    <option value="+51">Perú +51</option>
                                    <option value="+1">Puerto Rico +1</option>
                                    <option value="+1">República Dominicana +1</option>
                                    <option value="+598">Uruguay +598</option>
                                    <option value="+58">Venezuela +58</option>
                                    <option value="+34">España +34</option>
                                    <option value="+1">Canadá +1</option>
                                    <option value="+1">Estados Unidos +1</option>
                                    <option value="+49">Alemania +49</option>
                                    <option value="+43">Austria +43</option>
                                    <option value="+32">Bélgica +32</option>
                                    <option value="+385">Croacia +385</option>
                                    <option value="+45">Dinamarca +45</option>
                                    <option value="+421">Eslovaquia +421</option>
                                    <option value="+386">Eslovenia +386</option>
                                    <option value="+372">Estonia +372</option>
                                    <option value="+358">Finlandia +358</option>
                                    <option value="+33">Francia +33</option>
                                    <option value="+30">Grecia +30</option>
                                    <option value="+36">Hungría +36</option>
                                    <option value="+353">Irlanda +353</option>
                                    <option value="+354">Islandia +354</option>
                                    <option value="+39">Italia +39</option>
                                    <option value="+371">Letonia +371</option>
                                    <option value="+370">Lituania +370</option>
                                    <option value="+47">Noruega +47</option>
                                    <option value="+31">Países Bajos +31</option>
                                    <option value="+48">Polonia +48</option>
                                    <option value="+351">Portugal +351</option>
                                    <option value="+44">Reino Unido +44</option>
                                    <option value="+420">República Checa +420</option>
                                    <option value="+40">Rumanía +40</option>
                                    <option value="+46">Suecia +46</option>
                                    <option value="+41">Suiza +41</option>
                                    <option value="+380">Ucrania +380</option>


                                </select>
                                <input type="tel" name="telefono" value={formData.telefono} onChange={(e) => handleChange(index, e)} required />
                            </div>
                        </label>

                        {(formData.modalidad === 'virtual') && (
                            <label>
                                Ciudad:
                                <input type="text" name="ciudad" value={formData.ciudad} onChange={(e) => handleChange(index, e)} required />
                            </label>
                        )}

                        {(formData.modalidad === 'presencial' || formData.modalidad === 'gratuito') && (
                            <>
                                <label>
                                    Iglesia:
                                    <select name="iglesia" value={formData.iglesia} onChange={(e) => handleChange(index, e)} required>
                                        <option value="">Seleccione una opción</option>
                                        <option value="La Gran Comisión">La Gran Comisión</option>
                                        <option value="No asiste a una iglesia">No asiste a una iglesia</option>
                                        <option value="otra">Otra iglesia</option>
                                    </select>
                                </label>
                                {formData.iglesia === 'otra' && (
                                    <label>
                                        ¿Cuál?
                                        <input type="text" name="otraIglesia" value={formData.otraIglesia} onChange={(e) => handleChange(index, e)} required />
                                    </label>
                                )}
                            </>
                        )}

                        <div className="habeas-data">
                            <div className="politicas-scroll">
                                <p>
                                    <strong>Autorización de datos personales:</strong><br /><br />
                                    En cumplimiento de la Ley 1581 de 2012, autorizo a LA GRAN COMISIÓN a tratar mis datos personales
                                    conforme a la política de datos. También autorizo el uso de fotos y videos donde aparezca.
                                </p>
                            </div>
                            <div className="checkbox-container">
                                <input
                                    type="checkbox"
                                    name="habeas_data"
                                    checked={formData.habeas_data}
                                    onChange={(e) => handleChange(index, e)}
                                    id={`habeas_data_${index}`}
                                    required
                                />
                                <label htmlFor={`habeas_data_${index}`}>
                                    Acepto políticas de tratamiento de datos personales
                                </label>
                            </div>
                        </div>

                        {formularios.length > 1 && (
                            <button type="button" onClick={() => eliminarParticipante(index)} className="btn-eliminar">
                                Eliminar participante
                            </button>
                        )}

                        <hr className="separador" />
                    </div>
                ))}

                <div className="acciones-formulario">
                    <button type="button" className='btn-anadir-new-form' onClick={handleAgregarParticipante}>Añadir otro participante</button>
                    <button className='btn-continuar-new-form' type="button" onClick={handleContinuar}>Continuar</button>
                </div>

                {/* <button type="button" className="btn-volver" onClick={handleCancelar}>Cancelar</button> */}
            </form>
        </div>
    );
};

export default NewFormulario;

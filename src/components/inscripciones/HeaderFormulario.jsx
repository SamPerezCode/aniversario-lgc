

import logo from '../../assets/logo/lgc-solo-color.PNG';
import './HeaderFormulario.css';

const HeaderFormulario = () => {
    return (
        <div className="header-formulario animar-entrada">
            <div className="logo-container">
                <img src={logo} alt="Logo circular" className="logo-circular" />
            </div>
            <div className="titulos-container">
                <h2 className="subtitulo-formulario">LaGranComisión</h2>
                <h1 className="titulo-formulario">

                    <span className="numero-aniversario">25</span>{" "}
                    <span className="texto-aniversario">Aniversario</span>
                </h1>
                <h2 className="subtitulo-formulario">Llenos del Espíritu Santo</h2>
                <h2 className="subtitulo-formulario">Inscripciones</h2>
            </div>
        </div>
    );
};

export default HeaderFormulario;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo/lgc-solo-color.PNG';
import './Login.css';
import { useAuth } from '../context/AuthContext'; // Usamos el contexto

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); // Usamos la función login del contexto

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await login({ username, password }); // Usamos el login del contexto
            navigate('/admin'); // Redirigimos si es exitoso
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="form-wrapper">
            <div className="login-container">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo-circular" />
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Iniciar Sesión</h2>

                    {error && <p className="error">{error}</p>}

                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            id="email"
                            type="email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button className="button-login" type="submit">Entrar</button>
                </form>
            </div>
        </div>
    );
};

export default Login;

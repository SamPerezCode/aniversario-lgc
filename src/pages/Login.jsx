import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        // Simula login (puedes guardar en localStorage o usar tu AuthContext después)
        localStorage.setItem('usuarioLogueado', 'true');
        navigate('/admin'); // Redirige al dashboard
    };

    return (
        <div className="login-page">
            <h1>Iniciar Sesión</h1>
            <button onClick={handleLogin}>Entrar al panel</button>
        </div>
    );
};

export default Login;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('usuarioLogueado');
        navigate('/login');
    };

    return (
        <div className="admin-dashboard">
            <h1>Panel de Administración</h1>
            <p>Bienvenido al panel privado.</p>
            <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
};

export default AdminDashboard;

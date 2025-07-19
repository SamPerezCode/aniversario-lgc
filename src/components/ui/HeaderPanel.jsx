import React, { useState } from 'react';
import './HeaderPanel.css';
import logo from '../../assets/logo/lgc-solo-color.PNG';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const HeaderPanel = () => {
    const { user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(prev => !prev);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Obtener iniciales
    const getInitials = (nombre) => {
        if (!nombre) return '';
        const partes = nombre.split(' ');
        return partes.map(p => p[0]).slice(0, 2).join('').toUpperCase();
    };

    return (
        <header className="header-panel">
            <div className="logo-container-dashboard">
                <img src={logo} alt="Logo Iglesia" className="logo-dashboard" />
            </div>

            <div className="usuario-container" onClick={toggleDropdown}>
                <div className="avatar-iniciales">
                    {getInitials(user?.nombre || user?.correo)}
                </div>
                {dropdownOpen && (
                    <div className="dropdown">
                        <p className="nombre-usuario">{user?.nombre || user?.correo}</p>
                        <button onClick={handleLogout}>Cerrar sesión</button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default HeaderPanel;

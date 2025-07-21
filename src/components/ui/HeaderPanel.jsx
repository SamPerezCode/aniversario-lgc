import React, { useState, useRef, useEffect } from 'react';
import './HeaderPanel.css';
import logo from '../../assets/logo/lgc-solo-color.PNG';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const HeaderPanel = () => {
    const { user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownOpen(prev => !prev);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getInitials = (nombre) => {
        if (!nombre) return '';
        const partes = nombre.trim().split(' ');
        return partes.map(p => p[0]).slice(0, 2).join('').toUpperCase();
    };

    // Cierra el dropdown al hacer clic fuera o presionar Escape
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setDropdownOpen(false);
            }
        };

        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [dropdownOpen]);

    return (
        <header className="header-panel">
            <div className="logo-container-dashboard">
                <img src={logo} alt="Logo Iglesia" className="logo-dashboard" />
            </div>

            <div className="usuario-container" onClick={toggleDropdown} ref={dropdownRef}>
                <div className="avatar-iniciales">
                    {getInitials(user?.name || user?.email || '')}
                </div>
                {dropdownOpen && (
                    <div className="dropdown">
                        <p className="nombre-usuario">{user?.name || user?.email}</p>
                        <button onClick={handleLogout}>Cerrar sesión</button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default HeaderPanel;

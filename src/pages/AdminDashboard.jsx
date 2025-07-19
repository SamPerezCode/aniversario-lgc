import React from 'react';
import HeaderPanel from '../components/ui/HeaderPanel';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <HeaderPanel />
            <div className="contenido">
                <h1>Panel de Administración</h1>
                <p>Bienvenido al panel privado.</p>
            </div>
        </div>
    );
};

export default AdminDashboard;

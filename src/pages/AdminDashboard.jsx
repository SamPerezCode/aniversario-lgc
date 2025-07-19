import React from 'react';
import HeaderPanel from '../components/ui/HeaderPanel';
import './AdminDashboard.css'
import TablaInscritos from '../components/admin/TablaInscritos';



const AdminDashboard = () => {


    return (
        <div className="admin-dashboard">
            <HeaderPanel />
            <div className="container">
                <h1>Panel de Administración</h1>
                <p>Bienvenido al panel privado.</p>
            </div>
        </div>
    );
};

export default AdminDashboard;

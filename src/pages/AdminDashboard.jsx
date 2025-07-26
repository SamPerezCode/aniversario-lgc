import React from 'react';
import HeaderPanel from '../components/ui/HeaderPanel';
import './AdminDashboard.css';
import TablaInscritos from '../components/admin/TablaInscritos';
import CardsInscripciones from '../components/admin/CardsInscripciones';


const AdminDashboard = () => {

    return (
        <div className="admin-dashboard">
            <HeaderPanel />
            <div className="container">
                {/* <h1>Panel de Admin</h1> */}

                {/* Sección de inscritos */}
                <section className="seccion-inscritos">
                    <h2>Inscritos Seminario 25 Aniversario Llenos del Espíritu Santo
                    </h2>
                    {/* <TablaInscritos /> */}
                    <CardsInscripciones />
                </section>
            </div>
        </div>
    );
};

export default AdminDashboard;

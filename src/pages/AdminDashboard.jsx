import React from 'react';
import HeaderPanel from '../components/ui/HeaderPanel';
import './AdminDashboard.css';
import TablaInscritos from '../components/admin/TablaInscritos';

const AdminDashboard = () => {
    const inscritosEjemplo = [
        {
            id: 1,
            nombre: "Carlos Gómez",
            documento: "12345678",
            estado: "Pendiente",
            comprobante: "https://ejemplo.com/comprobante1.pdf"
        },
        {
            id: 2,
            nombre: "Laura Martínez",
            documento: "87654321",
            estado: "Aprobado",
            comprobante: ""
        }
    ];

    const aprobarInscrito = (id) => {
        console.log("Aprobado:", id);
        // Aquí puedes llamar a tu API para cambiar el estado
    };

    const anularInscrito = (id) => {
        console.log("Anulado:", id);
        // Aquí puedes llamar a tu API para cambiar el estado
    };

    return (
        <div className="admin-dashboard">
            <HeaderPanel />
            <div className="container">
                {/* <h1>Panel de Admin</h1> */}

                {/* Sección de inscritos */}
                <section className="seccion-inscritos">
                    <h2>Inscritos Seminario 25 Aniversario Llenos del Espíritu Santo
                    </h2>
                    <TablaInscritos
                        inscritos={inscritosEjemplo}
                        onAprobar={aprobarInscrito}
                        onAnular={anularInscrito}
                    />
                </section>
            </div>
        </div>
    );
};

export default AdminDashboard;

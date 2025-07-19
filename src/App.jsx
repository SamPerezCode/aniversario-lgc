import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./components/ui/SplashScreen";
import FormularioInscripcion from "./components/inscripciones/FormularioInscripcion";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoute from "./components/rutas/PrivateRoute";
import FormularioInscripcionEfectivo from "./pages/FormularioInscripcionEfectivo";

import './styles/global.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormularioInscripcion />} />
        <Route path="/inscripcion-efectivo" element={<FormularioInscripcionEfectivo />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<h2>Página no encontrada</h2>} />
      </Routes>
    </Router>
  );
}

export default App;

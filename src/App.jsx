import { useState } from "react";
import InscripcionPublica from "./components/inscripciones/FormularioInscripcion";
import SplashScreen from "./components/ui/SplashScreen";
import './styles/global.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  return (
    <>
      {showSplash
        ? <SplashScreen onFinish={handleSplashFinish} />
        : <InscripcionPublica />}
    </>
  );
}

export default App;

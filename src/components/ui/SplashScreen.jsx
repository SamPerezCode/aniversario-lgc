import { useState, useEffect } from 'react';
import './SplashScreen.css';
import logo from "../../assets/logo/lgc-color.png";

export default function SplashScreen({ onFinish }) {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setFadeOut(true);
        }, 1500);

        const timer2 = setTimeout(() => {
            if (typeof onFinish === 'function') {
                onFinish(); // asegúrate de que sea una función
            }
        }, 2000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [onFinish]);

    return (
        <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
            <img src={logo} alt="Logo" className="splash-logo" />
        </div>
    );
}

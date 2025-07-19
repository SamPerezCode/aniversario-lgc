import { createContext, useContext, useState, useEffect } from 'react';
import { loginUsuario } from '../api/login/login';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Restaurar sesión al cargar la app
    useEffect(() => {
        const storedUser = localStorage.getItem('usuario');
        const storedToken = localStorage.getItem('token');
        // console.log("Restaurando sesión...", { storedUser, storedToken });

        if (storedUser && storedUser !== "undefined" && storedToken) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setToken(storedToken);
                setIsAuthenticated(true);
                console.log("Sesión restaurada:", parsedUser);
            } catch (error) {
                console.error("Error al parsear usuario del localStorage:", error);
                localStorage.removeItem('usuario');
                localStorage.removeItem('token');
            }
        }
    }, []);



    const login = async (credentials) => {
        try {
            const data = await loginUsuario(credentials);

            if (data?.user && data.user?.token) {
                const { token, ...usuario } = data.user;

                setUser(usuario);
                setToken(token);
                setIsAuthenticated(true);

                // Guardar en localStorage
                localStorage.setItem('usuario', JSON.stringify(usuario));
                localStorage.setItem('token', token);
            } else {
                // console.error("Respuesta inválida del backend:", data);
                throw new Error("No se pudo iniciar sesión correctamente.");
            }
        } catch (error) {
            console.error("Error al iniciar sesión en contexto:", error);
            throw error;
        }
    };


    const logout = () => {
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);

        // Eliminar del localStorage
        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
    };

    const value = {
        user,
        token,
        isAuthenticated,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}

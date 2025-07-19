import API_BASE_URL from "../apiConfig";



export const loginUsuario = async (credentials) => {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData?.mensaje || 'Credenciales incorrectas');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al ingresar:", error);
        throw error;
    }
};

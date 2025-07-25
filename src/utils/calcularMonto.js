export const calcularMonto = (modalidad, dias) => {
    const hoy = new Date();
    const limitePreventa = new Date("2025-08-05T23:59:59");

    if (dias === "viernes_y_domingo") {
        return { moneda: "COP", valor: 0 };
    }

    if (modalidad === "presencial") {
        const valor = hoy <= limitePreventa ? 75000 : 90000;
        return { moneda: "COP", valor };
    }

    if (modalidad === "virtual") {
        return { moneda: "USD", valor: 15 };
    }

    return { moneda: "COP", valor: 0 }; // fallback
};

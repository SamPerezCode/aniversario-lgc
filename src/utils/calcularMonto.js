const obtenerFechaBogota = () => {
    const ahora = new Date();
    const bogotaOffset = -5 * 60; //  UTC-5 Bogotá
    const localOffset = ahora.getTimezoneOffset(); // minutos
    const diferencia = (bogotaOffset - localOffset) * 60 * 1000;
    return new Date(ahora.getTime() + diferencia);
};



// export const calcularMonto = (modalidad, dias) => {
//     const hoy = obtenerFechaBogota();
//     const limitePreventa = new Date("2025-08-05T23:59:59");

//     if (dias === "viernes_y_domingo") {
//         return { moneda: "COP", valor: 0 };
//     }

//     if (modalidad === "presencial") {
//         const valor = hoy <= limitePreventa ? 75000 : 90000;
//         return { moneda: "COP", valor };
//     }

//     if (modalidad === "virtual") {
//         return { moneda: "USD", valor: 15 };
//     }

//     return { moneda: "COP", valor: 0 };
// };

export const calcularMonto = (modalidad, dias) => {
    if (dias === "viernes_y_domingo") {
        return { moneda: "COP", valor: 0 };
    }

    if (modalidad === "virtual") {
        return { moneda: "USD", valor: 15 };
    }

    return { moneda: "COP", valor: 90000 };
};

const express = require('express');
const router = express.Router();

const generarFraccionesIgualDenominador = (cantidad) => {
    const B = Math.floor(Math.random() * 9) + 2; // Denominador aleatorio entre 2 y 10
    let arrayFracciones = [];
    let numeradores = [];

    // Generar numeradores aleatorios
    for (let i = 0; i < cantidad; i++) {
        numeradores.push(Math.floor(Math.random() * 20) + 1); // Numerador aleatorio entre 1 y 20
    }

    let resultado = numeradores[0]; // Inicia con el primer numerador
    arrayFracciones.push({ numerador: resultado, denominador: B });

    for (let i = 1; i < cantidad; i++) {
        let operacion = Math.random() < 0.5 ? 'resta' : 'suma';

        if (operacion === 'resta' && resultado - numeradores[i] < 0) {
            operacion = 'suma'; // Cambiar a suma si la resta resultaría en un numerador negativo
        }

        if (operacion === 'suma') {
            resultado += numeradores[i];
            arrayFracciones.push({ operacion: 'suma', numerador: numeradores[i], denominador: B });
        } else {
            resultado -= numeradores[i];
            arrayFracciones.push({ operacion: 'resta', numerador: numeradores[i], denominador: B });
        }
    }

    // Agregar el resultado final
    arrayFracciones.push({ resultado: { numerador: resultado, denominador: B } });

    return arrayFracciones;
};

const cantidadAleatoria = () => {
    const decide = Math.floor(Math.random() * 2); // Elige entre 0 o 1.
    return decide === 1 ? 2 : 3;
}

// Función para calcular el máximo común divisor (MCD) usando el algoritmo de Euclides
const gcd = (a, b) => {
    if (!b) {
        return a;
    }
    return gcd(b, a % b);
}

// Función para calcular el mínimo común múltiplo (MCM) de dos números
const lcm = (a, b) => {
    return (a * b) / gcd(a, b);
}

// Función para calcular el MCM de tres números
const lcmThreeNumbers = (a, b, c) => {
    return lcm(lcm(a, b), c);
}

// Generar número aleatorio entre 2 y 10.
const numAleatorio = () => {
    return Math.floor(Math.random() * 9) + 2;
}

// Genera diez fracciones equivalentes
const diezEquivalentes = (fraccion) => {
    let fracciones10 = [];
    for (let i = 1; i <= 10; i++) {
        let numeradorEquivalente = fraccion.numerador * i;
        let denominadorEquivalente = fraccion.denominador * i;
        fracciones10.push({ numerador: numeradorEquivalente, denominador: denominadorEquivalente });
    }
    return fracciones10;
}

const generarFraccionesDistintoDenominador = (pedidas) => {
    let numerador1 = numAleatorio();
    let numerador2 = numAleatorio();
    let numerador3 = numAleatorio();
    let numerador_temp1;
    let numerador_temp2;
    let numerador_temp3;
    let denominadorComun;
    let F, H, J;
    let numeradoresdd = [];
    let fraccionesOriginales = [];
    let operaciones = [];
    let fraccionesEquivalentes = [];

    if (parseInt(pedidas) === 2) {
        do {
            F = numAleatorio();
            H = numAleatorio();
        } while (F === H || (lcm(F, H) / F > 10 || lcm(F, H) / H > 10));

        fraccionesOriginales.push({ numerador: numerador1, denominador: F });
        fraccionesOriginales.push({ numerador: numerador2, denominador: H });

        denominadorComun = lcm(F, H);
        numerador_temp1 = (denominadorComun / F) * numerador1;
        numerador_temp2 = (denominadorComun / H) * numerador2;
        numeradoresdd = [numerador_temp1, numerador_temp2];
    }

    if (parseInt(pedidas) === 3) {
        do {
            F = numAleatorio();
            H = numAleatorio();
            J = numAleatorio();
        } while ((lcmThreeNumbers(F, H, J) / F > 10 || lcmThreeNumbers(F, H, J) / H > 10 || lcmThreeNumbers(F, H, J) / J > 10));

        fraccionesOriginales.push({ numerador: numerador1, denominador: F });
        fraccionesOriginales.push({ numerador: numerador2, denominador: H });
        fraccionesOriginales.push({ numerador: numerador3, denominador: J });

        denominadorComun = lcmThreeNumbers(F, H, J);
        numerador_temp1 = (denominadorComun / F) * numerador1;
        numerador_temp2 = (denominadorComun / H) * numerador2;
        numerador_temp3 = (denominadorComun / J) * numerador3;
        numeradoresdd = [numerador_temp1, numerador_temp2, numerador_temp3];
    }

    let resultado = numeradoresdd[0]; // Inicia con el primer numerador

    for (let i = 1; i < numeradoresdd.length; i++) {
        let operacion = Math.random() < 0.5 ? 'resta' : 'suma';

        if (operacion === 'resta' && resultado - numeradoresdd[i] < 0) {
            operacion = 'suma'; // Cambiar a suma si la resta resultaría en un numerador negativo
        }

        operaciones.push(operacion);

        if (operacion === 'suma') {
            resultado += numeradoresdd[i];
        } else {
            resultado -= numeradoresdd[i];
        }
    }

    // Calcular el resultado decimal
    let resultadoDecimal = resultado / denominadorComun;

    // Generar las fracciones equivalentes
    fraccionesOriginales.forEach(fraccion => {
        let buscarEquivalentes = diezEquivalentes(fraccion);
        fraccionesEquivalentes.push(buscarEquivalentes);
    });

    return { fraccionesOriginales, operaciones, resultadoDecimal, fraccionesEquivalentes };
}

const generarFraccionesDD = (req, res) => {
    const cantidad = cantidadAleatoria();
    const { fraccionesOriginales, operaciones, resultadoDecimal, fraccionesEquivalentes } = generarFraccionesDistintoDenominador(cantidad);

    return res.status(200).json({
        fraccionesOriginales,
        operaciones,
        resultadoDecimal,
        fraccionesEquivalentes
    });
}

const generarFracciones = (req, res) => {
    const cantidad = Math.floor(Math.random() * (4 - 2) + 2);
    const fracciones = generarFraccionesIgualDenominador(parseInt(cantidad));
    return res.status(200).json(fracciones);
}

module.exports = { 
    generarFracciones,
    generarFraccionesDD 
};

const express = require('express');
const router = express.Router();

// Función para calcular el máximo común divisor (MCD) usando el algoritmo de Euclides
const gcd = (a, b) => {
    if (!b) {
        return a;
    }
    return gcd(b, a % b);
}

// Función para generar un número aleatorio entre un rango
const generarNumero = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para generar fracciones
const generarFracciones = (cantidad) => {
    const fracciones = [];
    for (let i = 0; i < cantidad; i++) {
        const numerador = generarNumero(1, 50);
        const denominador = generarNumero(1, 50);
        fracciones.push({ numerador, denominador });
    }
    return fracciones;
}

// Función para calcular el resultado de la multiplicación de fracciones
const calcularResultadoMultiplicacion = (fracciones) => {
    let resultadoNumerador = 1;
    let resultadoDenominador = 1;

    for (const fraccion of fracciones) {
        resultadoNumerador *= fraccion.numerador;
        resultadoDenominador *= fraccion.denominador;
    }

    // Simplificar el resultado (opcional)
    const divisorComun = gcd(resultadoNumerador, resultadoDenominador);
    resultadoNumerador /= divisorComun;
    resultadoDenominador /= divisorComun;

    return { numerador: resultadoNumerador, denominador: resultadoDenominador, decimal: resultadoNumerador / resultadoDenominador };
}

// Función para calcular el resultado de la división de fracciones
const calcularResultadoDivision = (fracciones) => {
    const [fraccion1, fraccion2] = fracciones;
    const resultadoNumerador = fraccion1.numerador * fraccion2.denominador;
    const resultadoDenominador = fraccion1.denominador * fraccion2.numerador;

    // Simplificar el resultado (opcional)
    const divisorComun = gcd(resultadoNumerador, resultadoDenominador);
    const numeradorSimplificado = resultadoNumerador / divisorComun;
    const denominadorSimplificado = resultadoDenominador / divisorComun;

    return { numerador: numeradorSimplificado, denominador: denominadorSimplificado, decimal: numeradorSimplificado / denominadorSimplificado };
}

const generarOperaciones = (req, res) => {
    const { tipo } = req.query;
    let fracciones;
    let resultado;

    if (tipo === 'multiplicacion') {
        const cantidadFracciones = generarNumero(2, 3); // Puede generar 2 o 3 fracciones
        fracciones = generarFracciones(cantidadFracciones);
        resultado = calcularResultadoMultiplicacion(fracciones);
    } else if (tipo === 'division') {
        fracciones = generarFracciones(2); // Siempre genera 2 fracciones
        resultado = calcularResultadoDivision(fracciones);
    } else {
        return res.status(400).json({ error: 'Tipo de operación no válida' });
    }

    res.status(200).json({
        fracciones,
        resultado
    });
}


module.exports = { generarOperaciones };

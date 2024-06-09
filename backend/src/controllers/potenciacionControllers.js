// Función para calcular el máximo común divisor (MCD) usando el algoritmo de Euclides
const gcd = (a, b) => {
    if (!b) {
        return a;
    }
    return gcd(b, a % b);
};

// Función para generar un número aleatorio entre un rango
const generarNumero = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Función para generar fracciones con números pequeños para potenciación
const generarFraccionPequena = () => {
    const numerador = generarNumero(1, 10);
    let denominador;
    do {
        denominador = generarNumero(2, 10);
    } while (denominador === 1);
    return { numerador, denominador };
};

// Función para verificar si un número es una potencia exacta de otro
const esPotenciaExacta = (base, exponente) => {
    const resultado = Math.pow(base, 1 / exponente);
    return resultado === Math.floor(resultado);
};

// Función para generar fracciones y exponente para potenciación
const generarPotenciacion = (req, res) => {
    const fraccion = generarFraccionPequena();
    const exponente = generarNumero(0, 5);
    const tipo = generarNumero(0, 1); // 0 para fracción entre paréntesis, 1 para exponente solo en numerador

    let resultadoNumerador, resultadoDenominador;

    if (tipo === 0) {
        // Caso con paréntesis alrededor de la fracción
        resultadoNumerador = Math.pow(fraccion.numerador, exponente);
        resultadoDenominador = Math.pow(fraccion.denominador, exponente);
    } else {
        // Caso con exponente solo en el numerador
        resultadoNumerador = Math.pow(fraccion.numerador, exponente);
        resultadoDenominador = fraccion.denominador;
    }

    const resultadoDecimal = resultadoNumerador / resultadoDenominador;

    res.status(200).json({
        fraccion,
        exponente,
        tipo,
        resultado: {
            numerador: resultadoNumerador,
            denominador: resultadoDenominador,
            decimal: resultadoDecimal
        }
    });
};

// Función para generar fracciones y índice para radicación con raíces naturales
const generarRadicacion = (req, res) => {
    let fraccion, indice, resultadoNumerador, resultadoDenominador;

    do {
        fraccion = generarFraccionPequena();
        indice = generarNumero(2, 5); // El índice de la raíz puede ser 2, 3, 4 o 5
        resultadoNumerador = Math.pow(fraccion.numerador, 1 / indice);
        resultadoDenominador = Math.pow(fraccion.denominador, 1 / indice);
    } while (!esPotenciaExacta(fraccion.numerador, indice) || !esPotenciaExacta(fraccion.denominador, indice));

    const resultadoDecimal = resultadoNumerador / resultadoDenominador;

    res.status(200).json({
        fraccion,
        indice,
        resultado: {
            numerador: resultadoNumerador,
            denominador: resultadoDenominador,
            decimal: resultadoDecimal
        }
    });
};

module.exports = { generarPotenciacion, generarRadicacion };

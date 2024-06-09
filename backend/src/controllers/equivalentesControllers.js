//generarGraficos/equivalentes
const generarEquivalentes = (req, res)  => {

    const cantidad = parseInt(req.query.cantidad, 10);

    const generarFraccionPropia = () => {
        const B = Math.floor(Math.random() * 9) + 2;
        let A = 30;
        while (A > B) { // Condiciona a que la fracción sea propia o aparente.
            A = Math.floor(Math.random() * 20) + 2;
        }
        return { numerador: A, denominador: B };
    };

    function shuffleArray(array) {
        // Copia el array para no modificar el original
        const newArray = array.slice();

        // Recorre el array de atrás hacia adelante
        for (let i = newArray.length - 1; i > 0; i--) {
            // Genera un índice aleatorio entre 0 e i
            const j = Math.floor(Math.random() * (i + 1));

            // Intercambia el elemento en la posición i con el elemento en la posición j
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }

        return newArray;
    }
    //Cuando me pide 4 en esta ruta, doy una simplificada y tres amplificadas.
    if (cantidad === 4) {
        const fraccion1 = generarFraccionPropia();

        let fraccion2 = generarFraccionPropia();
        while (fraccion2.numerador / fraccion2.denominador === fraccion1.numerador / fraccion1.denominador) {
            fraccion2 = generarFraccionPropia();
        }

        let fraccion3 = generarFraccionPropia();
        while (
            (fraccion3.numerador / fraccion3.denominador === fraccion1.numerador / fraccion1.denominador) ||
            (fraccion3.numerador / fraccion3.denominador === fraccion2.numerador / fraccion2.denominador)
        ) {
            fraccion3 = generarFraccionPropia();
        }

        let array = shuffleArray([2, 3, 4, 5, 6, 7]);
        let p = array[0];

        let fraccion4 = { numerador: fraccion1.numerador * p, denominador: fraccion1.denominador * p };
        // Amplifico las restantes por distintos números elegidos al azar.
        let array2 = shuffleArray([1, 2, 3, 4, 5, 6, 7]);
        fraccion2 = { numerador: fraccion2.numerador * array2[1], denominador: fraccion2.denominador * array2[2] }
        fraccion3 = { numerador: fraccion3.numerador * array2[3], denominador: fraccion3.denominador * array2[4] }




        fraccion1.id = 1;
        fraccion2.id = 2;
        fraccion3.id = 3;
        fraccion4.id = 4;
        let arrayShuffled = shuffleArray([fraccion1, fraccion2, fraccion3, fraccion4]);
        return res.status(200).json(arrayShuffled);
    }
    res.status(400).json({ error: "Cantidad no válida" });
}

module.exports = { generarEquivalentes };
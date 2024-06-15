export const AUMENTAR_CONTADOR = 'AUMENTAR_CONTADOR';
export const DECREMENTAR_CONTADOR = 'DECREMENTAR_CONTADOR';
export const TOGGLE_VISIBILIDAD_CONTADOR = 'TOGGLE_VISIBILIDAD_CONTADOR';

export const aumentarContador = () => ({
    type: AUMENTAR_CONTADOR
});

export const decrementarContador = () => ({
    type: DECREMENTAR_CONTADOR
});


export const toggleVisibilidadContador = () => ({
    type: TOGGLE_VISIBILIDAD_CONTADOR,
});

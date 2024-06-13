export const AUMENTAR_CONTADOR = 'AUMENTAR_CONTADOR';
export const DECREMENTAR_CONTADOR = 'DECREMENTAR_CONTADOR';

export const aumentarContador = () => ({
    type: AUMENTAR_CONTADOR
});

export const decrementarContador = () => ({
    type: DECREMENTAR_CONTADOR
});
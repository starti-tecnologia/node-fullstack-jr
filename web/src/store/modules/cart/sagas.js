import { call, put, select, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import moneyFormatter from '~/util/moneyFormatter';

import api from '~/services/api';

import { addToCartSuccess, updateAmountSuccess } from './actions';

function* addToCart({ id }) {
    const productExists = yield select(state =>
        state.cart.find(p => p.id === id)
    );

    const stock = yield call(api.get, `/produto/${id}`);

    const stockAmount = stock.data.amount;

    const currentAmount = productExists ? productExists.amount : 0;

    const amount = currentAmount + 1;

    if (amount > stockAmount) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
    }

    if (productExists) {
        const newAmount = productExists.amount + 1;

        yield put(updateAmountSuccess(id, newAmount));
        return;
    }

    const response = yield call(api.get, `/produto/${id}`);

    const data = {
        ...response.data,
        amount: 1,
        priceFormatted: moneyFormatter.format(response.data.valor),
    };

    yield put(addToCartSuccess(data));
}

function* updateAmount({ id, amount }) {
    if (amount < 0) {
        return;
    }

    const stock = yield call(api.get, `/produto/${id}`);

    const stockAmount = stock.data.amount;

    if (amount > stockAmount) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
    }

    yield put(updateAmountSuccess(id, amount));
}

export default all([
    takeLatest('@cart/ADD_REQUEST', addToCart),
    takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);

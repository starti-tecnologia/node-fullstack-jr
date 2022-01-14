import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import {
  findAllPedidoSuccess,
  getByIdPedidoSuccess,
  pedidoFailure
} from './actions';

export function* createPedido({ payload }) {
  try {
    const result = yield call(api.post, '/pedido', payload.values);

    toast.success('Pedido salvo com sucesso.');
    history.push(`/pedido/${result.data.id}`)
  } catch (err) {
    toast.error('Error salvar pedido.');
    yield put(pedidoFailure());
  }
}

export function* findAllPedido() {
  try {
    const response = yield call(api.get, '/pedido');

    yield put(findAllPedidoSuccess(response.data));
  } catch (err) {
    toast.error('Error no buscar pedidos.');
    yield put(pedidoFailure());
  }
}

export function* getByIdPedido({ payload }) {
  try {
    const response = yield call(api.get, `/pedido/${payload.data}`);

    yield put(getByIdPedidoSuccess(response.data));
  } catch (err) {
    toast.error('Error no encontra pedido.');
    yield put(pedidoFailure());
  }
}

export function* updatePedido({ payload }) {
  try {
    yield call(api.put, `/pedido/${payload.data.id}`, payload.data.values);

    const response = yield call(api.get, `/pedido`);

    yield put(findAllPedidoSuccess(response.data));
    toast.success('Editado com sucesso.');
    history.push('/registroProduto')
  } catch (err) {
    toast.error('Error no editar pedido.');
    yield put(pedidoFailure());
  }
}

export function* deletePedido({ payload }) {
  try {
    yield call(api.delete, `/pedido/${payload.data}`);

    const response = yield call(api.get, '/pedido');

    yield put(findAllPedidoSuccess(response.data));
    toast.success('Pedido deletado');
  } catch (err) {
    toast.error('Erro em excluir Pedido');
    yield put(pedidoFailure());
  }
}

export default all([
  takeLatest('@pedido/CREATE_PEDIDO_REQUEST', createPedido),
  takeLatest('@pedido/FIND_ALL_PEDIDO_REQUEST', findAllPedido),
  takeLatest('@pedido/GET_BYID_PEDIDO_REQUEST', getByIdPedido),
  takeLatest('@pedido/UPDATE_PEDIDO_REQUEST', updatePedido),
  takeLatest('@pedido/DELETE_PEDIDO_REQUEST', deletePedido),
]);

import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import {
  getByIdProdutoSuccess,
  findAllProdutoSuccess,
  updateProdutoSuccess, 
  produtoFailure
} from './actions';

import { findAllPedidoSuccess } from '../pedido/actions';

export function* createProduto({ payload }) {
  try {
    yield call(api.post, '/produto', payload.values);

    toast.success('Produto salva com sucesso.');
  } catch (err) {
    toast.error('Error salvar produto.');
    yield put(produtoFailure());
  }
}

export function* findAllProduto() {
  try {
    const response = yield call(api.get, '/produtos');

    yield put(findAllProdutoSuccess(response.data));
  } catch (err) {
    toast.error('Error no buscar produtos.');
    yield put(produtoFailure());
  }
}

export function* getByIdProduto({ payload }) {
  try {
    const response = yield call(api.get, `/produto/${payload.data}`);

    yield put(getByIdProdutoSuccess(response.data));
  } catch (err) {
    toast.error('Error no encontra produto.');
    yield put(produtoFailure());
  }
}

export function* updateProtudo({ payload }) {
  try {
    const response = yield call(api.put, `/produto/${payload.data.id}`, payload.data.values);

    yield put(updateProdutoSuccess(response.data));
    toast.success('Editado com sucesso.');
    history.push('/')
  } catch (err) {
    toast.error('Error no editar produto.');
    yield put(produtoFailure());
  }
}

export function* deleteProduto({ payload }) {
  try {
    yield call(api.delete, `/produto/${payload.data}`);

    const response = yield call(api.get, '/pedidos');

    yield put(findAllPedidoSuccess(response.data));
    toast.success('Produto deletado');
  } catch (err) {
    toast.error('Erro em excluir produto');
    yield put(produtoFailure());
  }
}

export default all([
  takeLatest('@produto/CREATE_PRODUTO_REQUEST', createProduto),
  takeLatest('@produto/GET_BYID_PRODUTO_REQUEST', getByIdProduto),
  takeLatest('@produto/FIND_ALL_PRODUTO_REQUEST', findAllProduto),
  takeLatest('@produto/UPDATE_PRODUTO_REQUEST', updateProtudo),
  takeLatest('@produto/DELETE_PRODUTO_REQUEST', deleteProduto),
]);

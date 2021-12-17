import { all } from 'redux-saga/effects';

import pedido from './pedido/sagas';
import produto from './produto/sagas';
import cart from './cart/sagas';

export default function* rootSaga() {
  return yield all([ pedido, produto, cart ]);
}

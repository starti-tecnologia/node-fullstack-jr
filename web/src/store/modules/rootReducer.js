import { combineReducers } from 'redux';

import produto from './produto/reducer';
import pedido from './pedido/reducer';
import cart from './cart/reducer';

export default combineReducers({ pedido, produto, cart });

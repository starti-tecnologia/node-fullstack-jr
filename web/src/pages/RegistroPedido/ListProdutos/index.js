import React, { memo, useState, useEffect, useCallback } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';

import { addToCartRequest } from '~/store/modules/cart/actions';

import moneyFormatter from '~/util/moneyFormatter';

import api from '~/services/api';

import { ProductList } from './styles';


const Home = () => {
    const amount = useSelector(state =>
        state.cart.reduce((amount, product) => {
            amount[product.id] = product.amount;
            return amount;
        }, {})
    );
    const dispatch = useDispatch();

    const [products, setProducts] = useState([]);

    const loadDataFromAPI = useCallback(async () => {
        const productsFromAPI = await api.get('produto');

        setProducts(productsFromAPI.data);
    }, []);

    useEffect(() => {
        loadDataFromAPI();
    }, [loadDataFromAPI]);

    const handleAddProduct = ({ id }) => dispatch(addToCartRequest(id));
    

    const renderProductItem = (product) => {
        const { id, name, valor, quantidade } = product;
        return (
            <li key={id.toString()}>
                <label htmlFor="name">Nome</label>
                <strong>{name}</strong>
                <label htmlFor="valor">Valor</label>
                <span>{moneyFormatter.format(valor)}</span>
                <label htmlFor="quantidade">Quatidade</label>
                <span>{quantidade}</span>
                <button type="submit" onClick={() => handleAddProduct(product)}>
                    <div>
                        <MdAddShoppingCart size={16} color="#fff" />{' '}
                        {amount[id] || 0}
                    </div>
                    <span>ADICIONAR</span>
                </button>
            </li>
        );
    };

    return (
        <ProductList>
            {products.map(product => renderProductItem(product))}
        </ProductList>
    );
};

export default memo(Home);

import React, { useState } from "react";
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";

const products = [
    {id: '1', title: 'Жынсы', price: 5000, description: 'Синего цвета двадцатого века'},
    {id: '2', title: 'Шерты', price: 2000, description: 'Ух сидят'},
    {id: '3', title: 'Руба', price: 7000, description: 'Ну жаних'},
    {id: '4', title: 'Маяк', price: 1000, description: 'Главное пиво не пролей'},
    {id: '5', title: 'Пинджак', price: 25000, description: 'Как на выставку'},
    {id: '6', title: 'Гады', price: 105000, description: 'Эттто ччччто за гггааадды'},
    {id: '7', title: 'Мыло', price: 500, description: 'Помойся'},
    {id: '8', title: 'Янезнаючтотутбудет', price: 5, description: 'Всечтонужно'},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg} = useTelegram();

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams( {
                text: `Приобрести за ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;
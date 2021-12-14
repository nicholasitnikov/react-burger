import React, { useEffect } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import styles from './App.module.css';
import data from '../../utils/data';
import { useState, useCallback } from 'react';

const App = () => {

  const [order, setOrder] = useState([
    {...data.filter((el) => { return el.type === 'bun'; })[0], count: 1},
    {...data.filter((el) => { return el.type === 'bun'; })[0], count: 1}
  ]);

  const ingredientClickHandler = useCallback((id) => {

    const dataItem = data.find(el => el._id === id);
    if(!dataItem) {
      return;
    }

    let prevOrder = [...order];
    let isInOrder = false;

    prevOrder = prevOrder.map(el => {
      if(dataItem.type === 'bun' && el.type === 'bun') {
        isInOrder = true;
        return dataItem;
      }
      return el;
    })

    if(!isInOrder) {
      prevOrder.pop()
      prevOrder.push(dataItem);
      prevOrder.push(prevOrder[0]);
    }

    setOrder(prevOrder)
  
  }, [order])

  const constructorRemoveClickHandler = useCallback((id) => {
    const prevOrder = [...order].filter(el => el._id !== id);
    setOrder(prevOrder)
  }, [order])

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={data} order={order} onClick={ingredientClickHandler} />
        <BurgerConstructor order={order} onRemove={constructorRemoveClickHandler} />
      </main>
    </>
  );
}

export default App;

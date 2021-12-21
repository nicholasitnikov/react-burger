import React, { useEffect, useState, useCallback } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import styles from './App.module.css';
import CONSTANTS from '../../utils/constants';

const App = () => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    fetch(`${CONSTANTS.API_URL}/ingredients`, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      } 
    })
    .then(res => { 
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
     })
    .then(res => {
      setData(res.data);
      
    }).catch(err => {
      console.log('Ошибка загрузки данных: ', err);
    }).finally(() => {
      setIsLoading(false);
    })
  }, [])

  useEffect(() => {
    setOrder([
      data.filter((el) => { return el.type === 'bun'; })[0],
      data.filter((el) => { return el.type === 'bun'; })[0]
    ])
  }, [data])

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
        { isLoading ? <p className="text text_type_main-default text_color_inactive pt-5">Загрузка данных...</p> : 
          (<>
            <BurgerIngredients data={data} order={order} onClick={ingredientClickHandler} />
            <BurgerConstructor order={order} onRemove={constructorRemoveClickHandler} />
          </>)
        }
        
      </main>
    </>
  );
}

export default App;

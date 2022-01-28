import React, { useEffect, useState, useCallback } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import styles from './App.module.css';
import CONSTANTS from '../../utils/constants';
import axios from 'axios';
import ContructorContext from '../../contexts/ContructorContext';

const App = () => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [fetchedOrder, setFetchedOrder] = useState(null);

  useEffect(() => {
    axios.get(`${CONSTANTS.API_URL}/ingredients`)
    .then(res => {
      setData(res.data.data);
      
    }).catch(err => {
      console.log('Ошибка загрузки данных: ', err);
    }).finally(() => {
      setIsLoading(false);
    })
  }, [])

  useEffect(() => {
    setOrder([
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
      prevOrder.push(dataItem);
    }
    
    setOrder(prevOrder)
  
  }, [order])

  const constructorRemoveClickHandler = useCallback((id) => {
    console.log(id)
    const prevOrder = [...order].filter(el => el._id !== id);
    setOrder(prevOrder)
  }, [order])

  const prepereOrderToSend = () => {
    return order.map(el => el._id).concat([order[0]._id]);
  }

  const sendOrder = async () => {
    const response = await axios.post('https://norma.nomoreparties.space/api/orders', {
      "ingredients": prepereOrderToSend()
    }).catch(err => console.log(err));
    
    if(response.data.success) {
      setFetchedOrder(response.data)
    }

  }

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        { isLoading ? <p className="text text_type_main-default text_color_inactive pt-5">Загрузка данных...</p> : 
          (<>
            <BurgerIngredients data={data} order={order} onClick={ingredientClickHandler} />
            <ContructorContext.Provider value={{order, constructorRemoveClickHandler, sendOrder, fetchedOrder}}>
              <BurgerConstructor />
            </ContructorContext.Provider>
          </>)
        }
        
      </main>
    </>
  );
}

export default App;

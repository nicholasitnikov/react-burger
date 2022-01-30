import { useEffect } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import styles from './App.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {

  const disaptch = useDispatch();

  const { ingredientsRequest } = useSelector(store => store.burger);

  useEffect(() => {
    disaptch(getIngredients());
  }, [])

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        { ingredientsRequest.loading ? <p className="text text_type_main-default text_color_inactive pt-5">Загрузка данных...</p> : 
          (<DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>)
        }
        
      </main>
    </>
  );
}

export default App;

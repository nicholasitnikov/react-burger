
import IngredientsTabs from '../IngredientsTabs/IngredientsTabs';
import styles from './BurgerIngredients.module.css';
import IngredientsCategory from '../IngredientsCategory/IngredientsCategory';
import PropTypes from 'prop-types';
import { useMemo, useRef, useState } from 'react';
import propTypes from '../../utils/propTypes'
import categories from '../../utils/categories';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { useSelector, useDispatch } from 'react-redux';
import { CLEAN_CURRENT_INGREDIENT } from '../../services/actions';


const BurgerIngredients = () => {

    const [currentType, setCurrentType] = useState(categories[0].slug);
    const categoriesRef = useRef({});
    const { currentIngredient } = useSelector(store => store.burger);
    const dispatch = useDispatch();

    const modalCloseHandler = () => {
        dispatch({ type: CLEAN_CURRENT_INGREDIENT })
    }

    const setCategoryRef = (slug, ref) => {
        categoriesRef.current[slug] = ref;
    }

    const tabClickHandler = (type) => {
        setCurrentType(type)
        categoriesRef.current[type].scrollIntoView({behavior: "smooth"});
    }

    const typeInViewHandler = (type) => {
        setCurrentType(type)
    }

    const renderCategories = useMemo(() => {

        return categories.map((category, index)=> {
            const ref = categoriesRef.current[category.slug];
            const element = (<IngredientsCategory
                setCategoryRef={setCategoryRef}
                key={index}
                onTypeInView={typeInViewHandler}
                heading={category.name} 
                slug={category.slug}
            />);
            return element;
        })

    }, [])

    return(
        <section className={`${styles.section} mr-10`}>
            <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
            <IngredientsTabs currentType={currentType} onClick={tabClickHandler} />
            <Modal closed={currentIngredient === null} heading='Данные о ингредиенте' onClose={modalCloseHandler}>
                <IngredientDetails />
            </Modal>
            <div className={styles.categories}>
                { renderCategories }
            </div>
        </section>
    )
}

export default BurgerIngredients;
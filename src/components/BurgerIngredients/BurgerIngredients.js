
import IngredientsTabs from '../IngredientsTabs/IngredientsTabs';
import styles from './BurgerIngredients.module.css';
import IngredientsCategory from '../IngredientsCategory/IngredientsCategory';
import PropTypes from 'prop-types';
import { useCallback, useMemo, useRef, useState } from 'react';
import propTypes from '../../utils/propTypes'
import categories from '../../utils/categories';
import Modal from '../Modal/Modal';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import IngredientDetails from '../IngredientDetails/IngredientDetails';


const BurgerIngredients = (props) => {

    const [currentType, setCurrentType] = useState(categories[0].slug);
    const categoriesRef = useRef({});
    const [selectedIngredient, setSelectedIngredient] = useState();

    const setCategoryRef = (slug, ref) => {
        categoriesRef.current[slug] = ref;
    }

    const ingredientClickHandler = useCallback((id) => {
        setSelectedIngredient(id);
        props.onClick(id);
    }, [props.onClick, selectedIngredient])

    const tabClickHandler = (type) => {
        setCurrentType(type)
        categoriesRef.current[type].scrollIntoView();
    }

    const typeInViewHandler = (type) => {
        setCurrentType(type)
    }

    const renderCategories = useMemo(() => {

        return categories.map((category, index)=> {
            const ref = categoriesRef.current[category.slug];
            const element = <IngredientsCategory
                setCategoryRef={setCategoryRef}
                order={props.order} 
                key={index}
                onClick={ingredientClickHandler} 
                onTypeInView={typeInViewHandler}
                heading={category.name} 
                slug={category.slug}
                data={props.data.filter((el) => el.type === category.slug)}
            />;
            return element;
        })

    }, [props, ingredientClickHandler, selectedIngredient])

    return(
        <section className={`${styles.section} mr-10`}>
            <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
            <IngredientsTabs currentType={currentType} onClick={tabClickHandler} />
            <ModalOverlay content={props.data.find((el) => el._id === selectedIngredient)}>
                <Modal heading='Детали ингредиента'>
                    <IngredientDetails />
                </Modal>
            </ModalOverlay>
            <div className={styles.categories}>
                { renderCategories }
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape(propTypes.ingredient)),
    order: PropTypes.arrayOf(PropTypes.shape(propTypes.ingredient)),
    categories: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired
    })),
    onClick: PropTypes.func.isRequired,
    isLoading: PropTypes.bool
}


export default BurgerIngredients;
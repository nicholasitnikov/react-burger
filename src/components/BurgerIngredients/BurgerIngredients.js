
import IngredientsTab from '../IngredientsTab/IngredientsTab';
import styles from './BurgerIngredients.module.css';
import IngredientsCategory from '../IngredientsCategory/IngredientsCategory';
import PropTypes from 'prop-types';
import { useCallback, useMemo, useRef, useState } from 'react';


const BurgerIngredients = (props) => {

    const [currentType, setCurrentType] = useState(props.categories[0].slug);
    const categoriesRef = useRef({});

    const setCategoryRef = (slug, ref) => {
        categoriesRef.current[slug] = ref;
    }

    const ingredientClickHandler = useCallback((id) => {
        props.onClick(id);
    }, [props])

    const tabClickHandler = (type) => {
        setCurrentType(type)
        categoriesRef.current[type].scrollIntoView();
    }

    const typeInViewHandler = (type) => {
        setCurrentType(type)
    }

    const renderCategories = useMemo(() => {

        return props.categories.map((category, index)=> {
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

    }, [props, ingredientClickHandler])

    return(
        <section className={`${styles.section} mr-10`}>
            <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
            <IngredientsTab currentType={currentType} onClick={tabClickHandler} />
            <div className={styles.categories}>
                { renderCategories }
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number
    })),
    categories: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        slug: PropTypes.string
    })),
    order: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number
    })),
    onClick: PropTypes.func
}


export default BurgerIngredients;
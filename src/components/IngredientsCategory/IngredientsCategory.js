import Ingredient from "../Ingredient/Ingredient";
import styles from './IngredientsCategory.module.css';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';

const IngredientsCategory = (props) => {
    
    const ingredientClickHandler = useCallback((id) => {
        props.onClick(id);
    }, [props])

    const ref = useRef();

    useEffect(() => {
        props.setCategoryRef(props.slug, ref.current);
    }, [])

    const renderIngredients = useMemo(() => {
        return props.data.map((item, index) => {
            return <Ingredient 
                onTypeInView={props.onTypeInView}
                {...item} 
                key={index} 
                onClick={ingredientClickHandler} 
                count={ props.order.filter(el => el._id === item._id).length }
            />
        })
    }, [props, ingredientClickHandler])
    
    return(
        <div ref={ref}>
            <h2 className="text text_type_main-medium pb-6 pt-10">{props.heading}</h2>
            <div className={styles.grid}>
                { renderIngredients }
            </div>
        </div>
    );
}

IngredientsCategory.propTypes = {
    heading: PropTypes.string,
    slug: PropTypes.string,
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
    onClick: PropTypes.func,
    onTypeInView: PropTypes.func,
    setCategoryRef: PropTypes.func
}


export default IngredientsCategory;


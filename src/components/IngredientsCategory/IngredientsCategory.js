import Ingredient from "../Ingredient/Ingredient";
import styles from './IngredientsCategory.module.css';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import propTypes from '../../utils/propTypes';

const IngredientsCategory = (props) => {
    
    const ingredientClickHandler = useCallback((id) => {
        props.onClick(id);
    }, [props.onClick])

    const ref = useRef();

    useEffect(() => {
        props.setCategoryRef(props.slug, ref.current);
    }, [])

    const renderIngredients = useMemo(() => {
        return props.data.map(item => {
            return (<Ingredient 
                onTypeInView={props.onTypeInView}
                {...item} 
                key={item._id} 
                onClick={ingredientClickHandler} 
                count={ props.order.filter(el => el._id === item._id).length }
            />)
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
    heading: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape(propTypes.ingredient)),
    order: PropTypes.arrayOf(PropTypes.shape(propTypes.ingredient)),
    onClick: PropTypes.func.isRequired,
    onTypeInView: PropTypes.func.isRequired,
    setCategoryRef: PropTypes.func.isRequired
}


export default IngredientsCategory;


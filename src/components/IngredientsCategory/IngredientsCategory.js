import Ingredient from "../Ingredient/Ingredient";
import styles from './IngredientsCategory.module.css';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useRef } from 'react';
import { useSelector } from "react-redux";

const IngredientsCategory = (props) => {

    const { ingredients, constructorItems } = useSelector(store => store.burger);

    const ref = useRef();

    useEffect(() => {
        props.setCategoryRef(props.slug, ref.current);
    }, [])

    const prepareData = useMemo(() => {
        return ingredients.filter(el => el.type === props.slug)
    }, [props.slug, ingredients])

    const renderIngredients = useMemo(() => {

        return prepareData.map(item => {
            return (<Ingredient 
                onTypeInView={props.onTypeInView}
                {...item} 
                key={item._id}
                count={ constructorItems.filter(el => el._id === item._id).length }
            />)
        })
    }, [props, prepareData, constructorItems])
    
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
    onTypeInView: PropTypes.func.isRequired,
    setCategoryRef: PropTypes.func.isRequired
}


export default IngredientsCategory;


import styles from './Ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import propTypes from '../../utils/propTypes';
import { useDispatch } from 'react-redux';
import { ADD_CONSTRUCTOR_ITEM } from '../../services/actions';
import { useDrag } from 'react-dnd';
import combineRefs from 'react-combine-refs';

const Ingredient = (props) => {

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: {id: props._id, type: props.type}
    });

    const dispatch = useDispatch();

    const clickHandler = () => {
        dispatch({ type: ADD_CONSTRUCTOR_ITEM, id: props._id, itemType: props.type })
    }

    const { ref, inView } = useInView({
        threshold: 1
    });

    useEffect(() => {
        if(inView) {
            props.onTypeInView(props.type);
        }
    }, [inView, props])

    return(
        <article ref={combineRefs(ref, dragRef)} className={styles.ingredient} onClick={clickHandler}>
            { props.count > 0 && <Counter count={props.count} size="default" /> }
            <img src={props.image} alt={props.name} />
            <div className={`${styles.price} pt-1 pb-1`}>
                <p className="text text_type_digits-default pr-2">{props.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <h3 className={styles.heading}>{props.name}</h3>
        </article>
    )

}

Ingredient.propTypes = propTypes.ingredient;

export default Ingredient;
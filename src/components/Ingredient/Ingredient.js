import styles from './Ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import propTypes from '../../utils/propTypes';

const Ingredient = (props) => {

    const clickHandler = () => {
        props.onClick(props._id);
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
        <article ref={ref} className={styles.ingredient} onClick={clickHandler}>
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

Ingredient.propTypes = propTypes.order;

export default Ingredient;
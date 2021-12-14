
import styles from './BurgerConstructor.module.css';
import ContructorItem from '../ContructorItem/ContructorItem';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';

import propTypes from '../../utils/propTypes.js';

const BurgerConstructor = (props) => {

    const constructorRemoveClickHandler = useCallback((id) => {
        props.onRemove(id);
    }, [props.onClick])

    const renderContructorItems = useMemo(() => {

        return props.order.filter(el => el.type !== 'bun').map((el, index) => {

            return <ContructorItem 
                id={index}
                key={index}
                lock={el.type === 'bun' && true}
                text={el.name}
                price={el.price}
                thumbnail={el.image}
                onRemove={constructorRemoveClickHandler}
            />
        
        })

    }, [props.order, constructorRemoveClickHandler])

    const renderTopBun = useMemo(() => {
        const data = props.order[0]
        return <ContructorItem 
            id={data._id}
            key={0}
            lock={true} 
            type={'top'}
            text={data.name}
            price={data.price}
            thumbnail={data.image}
            onClick={constructorRemoveClickHandler}
        />
    }, [props.order, constructorRemoveClickHandler])

    const renderBottomBun = useMemo(() => {
        const data = props.order[props.order.length - 1];
        return <ContructorItem 
            id={data._id}
            key={props.order.length - 1}
            lock={true} 
            type={'bottom'}
            text={data.name}
            price={data.price}
            thumbnail={data.image}
            onClick={constructorRemoveClickHandler}
        />
    }, [props.order, constructorRemoveClickHandler])

    return(
        <section className={`${styles.section} pt-25`}>
            <div className={styles.items}>
                { renderTopBun }
                <div className={styles.ingredients}>
                    { renderContructorItems }
                </div>
                { renderBottomBun }
            </div>
            <div className={`${styles.total} pt-10 pb-10`}>
                <div className={styles.price}>
                    <p className="text text_type_digits-medium">610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    order: PropTypes.arrayOf(PropTypes.shape(propTypes.order))
}

export default BurgerConstructor;
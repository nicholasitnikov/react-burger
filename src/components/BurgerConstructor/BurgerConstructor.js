
import styles from './BurgerConstructor.module.css';
import ContructorItem from '../ContructorItem/ContructorItem';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';

const BurgerConstructor = (props) => {

    const controctorItemClickHandler = useCallback((id) => {
        props.onClick(id);
    }, [props])

    const renderContructorItems = useMemo(() => {

        return props.order.map((el, index) => {

            const getType = () => {
                if( el.type === 'bun' && index === 0 ) { return 'top' };
                if( el.type === 'bun' && index ===props.order.length - 1 ) { return 'bottom' };
                return;
            }

            return <ContructorItem 
                id={el._id}
                key={index}
                lock={el.type === 'bun' && true} 
                type={getType()}
                text={el.name}
                price={el.price}
                thumbnail={el.image}
                onClick={controctorItemClickHandler}
            />
        
        })

    }, [props.order, controctorItemClickHandler])

    return(
        <section className={`${styles.section} pt-25`}>
            <div className={styles.items}>
                { renderContructorItems }
            </div>
            <div className={`${styles.total} pt-10 pb-10`}>
                <div className={styles.price}>
                    <p className="text text_type_digits-medium">610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large">
                        Нажми на меня
                </Button>
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
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
        __v: PropTypes.number,
        count: PropTypes.number,
        onClick: PropTypes.func
    }))
}

export default BurgerConstructor;
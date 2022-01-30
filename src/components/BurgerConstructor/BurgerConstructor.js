
import styles from './BurgerConstructor.module.css';
import ContructorItem from '../ContructorItem/ContructorItem';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { useSelector, useDispatch } from 'react-redux';
import { sendOrder } from '../../services/actions';
import { useDrop } from 'react-dnd';
import { CLEAN_ORDER, ADD_CONSTRUCTOR_ITEM } from '../../services/actions';

const BurgerConstructor = () => {

    const { constructorItems, order } = useSelector(store => store.burger);
    const dispatch = useDispatch();

    const completeOrderHandler = () => {
        dispatch(sendOrder());
    }

    const closeModalHandler = () => {
        dispatch({ type: CLEAN_ORDER })
    }

    const [{isDragOver}, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item) {
            dispatch({ type: ADD_CONSTRUCTOR_ITEM, id: item.id, itemType: item.type })
        },
        collect: monitor => ({
            isDragOver: monitor.isOver(),
        })
    });

    const calculateTotal = useMemo(() => {
        return constructorItems.reduce((res, current) => {
            return res += (current.type === 'bun' ? current.price * 2 : current.price);
        }, 0)
    }, [constructorItems]);

    const renderContructorItems = useMemo(() => {

        return constructorItems.filter(el => el.type !== 'bun').map((el, index) => {
            return (<ContructorItem 
                id={el._id}
                key={index}
                lock={el.type === 'bun' && true}
                text={el.name}
                price={el.price}
                thumbnail={el.image}
                type={el.type}
            />)
        
        })

    }, [constructorItems])

    const renderTopBun = useMemo(() => {
        const data = constructorItems[0]
        return (<ContructorItem 
            id={data._id}
            key={'top_ban'}
            lock={true} 
            position={'top'}
            text={data.name}
            price={data.price}
            thumbnail={data.image}
            type={data.type}
        />)
    }, [constructorItems])

    const renderBottomBun = useMemo(() => {
        const data = constructorItems[0];
        return (<ContructorItem 
            id={data._id}
            key={'bottom_ban'}
            lock={true} 
            position={'bottom'}
            text={data.name}
            price={data.price}
            thumbnail={data.image}
            type={data.type}
        />)
    }, [constructorItems])

    return(
        <section className={`${styles.section} pt-25 ${isDragOver && styles.sectionOnDrag}`} ref={dropTarget}>
            <div className={styles.items}>
                { constructorItems.length > 0 && renderTopBun }
                <div className={styles.ingredients}>
                    { renderContructorItems }
                </div>
                { constructorItems.length > 0 && renderBottomBun }
            </div>
            <div className={`${styles.total} pt-10 pb-10`}>
                <div className={styles.price}>
                    <p className="text text_type_digits-medium">{calculateTotal}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large" onClick={completeOrderHandler}>
                    Оформить заказ
                </Button>
            </div>
            <Modal closed={order ===  null} onClose={closeModalHandler}>
                <OrderDetails />
            </Modal>
        </section>
    )
}

export default BurgerConstructor;
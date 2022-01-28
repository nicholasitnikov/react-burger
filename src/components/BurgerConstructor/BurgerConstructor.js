
import styles from './BurgerConstructor.module.css';
import ContructorItem from '../ContructorItem/ContructorItem';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo, useState, useContext, useEffect } from 'react';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import ContructorContext from '../../contexts/ContructorContext';

const BurgerConstructor = () => {

    const [modalIsHidden, setModalIsHidden] = useState(true);

    const { order, sendOrder, fetchedOrder } = useContext(ContructorContext);

    useEffect(() => {
        if(fetchedOrder) {
            setModalIsHidden(false);
        }
    }, [fetchedOrder])

    const openModal = () => {
        setModalIsHidden(false);
    }

    const closeModal = () => {
        setModalIsHidden(true);
    }

    const calculateTotal = useMemo(() => {
        return order.reduce((res, current) => {
            return res += (current.type === 'bun' ? current.price * 2 : current.price);
        }, 0)
    }, [order]);

    const renderContructorItems = useMemo(() => {

        return order.filter(el => el.type !== 'bun').map((el, index) => {
            return (<ContructorItem 
                id={el._id}
                key={index}
                lock={el.type === 'bun' && true}
                text={el.name}
                price={el.price}
                thumbnail={el.image}
            />)
        
        })

    }, [order])

    const renderTopBun = useMemo(() => {
        const data = order[0]
        return (<ContructorItem 
            id={data._id}
            key={'top_ban'}
            lock={true} 
            type={'top'}
            text={data.name}
            price={data.price}
            thumbnail={data.image}
        />)
    }, [order])

    const renderBottomBun = useMemo(() => {
        const data = order[0];
        return (<ContructorItem 
            id={data._id}
            key={'bottom_ban'}
            lock={true} 
            type={'bottom'}
            text={data.name}
            price={data.price}
            thumbnail={data.image}
        />)
    }, [order])

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
                    <p className="text text_type_digits-medium">{calculateTotal}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large" onClick={sendOrder}>
                    Оформить заказ
                </Button>
            </div>
            <Modal onClose={closeModal} hidden={modalIsHidden}>
                <OrderDetails />
            </Modal>
        </section>
    )
}

export default BurgerConstructor;
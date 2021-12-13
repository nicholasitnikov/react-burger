import styles from './ContructorItem.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { useMemo } from 'react';

const ContructorItem = (props) => {

    const handleRemoveItem = () => {
        props.onRemove(props.id);
    }

    const getPostfix = useMemo(() => {
        if(props.type === 'top') { return '(верх)' }
        if(props.type === 'bottom') { return '(низ)' }
        return '';
    }, [props.type])

    return(
        <article className={`${styles.item} ${props.lock && styles.right}`}>
            { !props.lock && <DragIcon type="primary" /> }
            
            <ConstructorElement
                text={`${props.text}\n${getPostfix}`}
                price={props.price}
                type={props.type}
                isLocked={props.lock}
                thumbnail={props.thumbnail}
                handleClose={handleRemoveItem}
            />
        </article>
    )
}

ContructorItem.propTypes = {
    lock: PropTypes.bool.isRequired,
    type: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default ContructorItem;
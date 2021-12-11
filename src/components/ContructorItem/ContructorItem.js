import styles from './ContructorItem.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';

const ContructorItem = (props) => {

    const handleRemoveItem = () => {
        props.onClick(props.id);
    }

    return(
        <article className={`${styles.item} ${props.lock && styles.right}`}>
            { !props.lock && <DragIcon type="primary" /> }
            <ConstructorElement
                text={props.text}
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
    lock: PropTypes.bool,
    type: PropTypes.any,
    text: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    onClick: PropTypes.func
}

export default ContructorItem;
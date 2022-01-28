import styles from './ContructorItem.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { useMemo, useContext } from 'react';
import ContructorContext from '../../contexts/ContructorContext';

const ContructorItem = (props) => {

    const { constructorRemoveClickHandler } = useContext(ContructorContext);

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
                handleClose={() => constructorRemoveClickHandler(props.id)}
            />
        </article>
    )
}

ContructorItem.propTypes = {
    id: PropTypes.string,
    lock: PropTypes.bool.isRequired,
    type: PropTypes.any,
    text: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired
}

export default ContructorItem;
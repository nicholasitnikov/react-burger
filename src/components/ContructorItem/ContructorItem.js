import styles from './ContructorItem.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import combineRefs from 'react-combine-refs';
import { useDrag, useDrop } from 'react-dnd';

import { useDispatch } from 'react-redux';
import { DELETE_CONSTRUCTOR_ITEM, MOVE_CONSTRUCTOR_ITEM } from '../../services/actions';

const ContructorItem = (props) => {

    const dispatch = useDispatch();

    const handleItemRemove = () => {
        dispatch({ type: DELETE_CONSTRUCTOR_ITEM, key: props.dataKey });
    }

    const getPostfix = useMemo(() => {
        if(props.position === 'top') { return '(верх)' }
        if(props.position === 'bottom') { return '(низ)' }
        return '';
    }, [props.type])

    const [{isDragOver}, dropTarget] = useDrop({
        accept: 'contructorItem',
        drop(item) {
            if(item.type !== 'bun') {
                dispatch({ type: MOVE_CONSTRUCTOR_ITEM, id: item.id, itemType: item.type, targetId: props.id })
            }
        },
        collect: monitor => ({
            isDragOver: monitor.isOver(),
        })
    });

    const [, dragRef] = useDrag({
        type: "contructorItem",
        item: {id: props.id, type: props.type}
    });

    return(
        <article className={`${styles.item} ${props.lock && styles.right} ${isDragOver && styles.itemOnDrag}`} ref={combineRefs(dragRef, dropTarget)}>
            { !props.lock && <DragIcon type="primary" /> }
            <ConstructorElement
                text={`${props.text}\n${getPostfix}`}
                price={props.price}
                type={props.position}
                isLocked={props.lock}
                thumbnail={props.thumbnail}
                handleClose={handleItemRemove}
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
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import ModalContext from '../../utils/modalContext';

const Modal = (props) => {

    const { onModalClose } = useContext(ModalContext);

    const closeClickHandler = () => {
        onModalClose();
    }
    
    return(
        <div className={styles.modal}>
            <div className={styles.info}>
            <h2 className="text text_type_main-large">{props.heading}</h2>
                <button onClick={closeClickHandler} className={styles.closeButton} type='button'><CloseIcon type="primary" /></button>
            </div>
            { props.children }
        </div>
    )
}

Modal.propTypes = {
    onClose: PropTypes.func
}

export default Modal;
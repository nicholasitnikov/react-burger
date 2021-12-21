import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { useEffect } from 'react';

const Modal = (props) => {

    const closeClickHandler = () => {
        props.onClose();
    }

    const escKeyHandler = (e) => {
        if(e.code === 'Escape') {
            e.preventDefault();
            props.onClose();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', escKeyHandler);
        return () => {
            document.removeEventListener('keydown', escKeyHandler);
        }
    }, []);

    const modalTarget = document.querySelector('#modals');
    
    return ReactDOM.createPortal(<ModalOverlay onClose={closeClickHandler} hidden={props.hidden}>
        <div className={styles.modal}>
            <div className={styles.info}>
            <h2 className="text text_type_main-large">{props.heading}</h2>
                <button onClick={closeClickHandler} className={styles.closeButton} type='button'>
                    <CloseIcon type="primary" />
                </button>
            </div>
            { props.children }
        </div>
    </ModalOverlay>, modalTarget);
}

Modal.propTypes = {
    heading: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    hidden: PropTypes.bool.isRequired
}

export default Modal;
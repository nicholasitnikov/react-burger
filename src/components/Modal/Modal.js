import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { useEffect, useState } from 'react';

const Modal = (props) => {

    const [closed, setClosed] = useState(true);

    useEffect(() => {

        setClosed(props.closed);

    }, [props.closed]);

    const closeClickHandler = () => {
        setClosed(true);
        props.onClose();
    };

    const escKeyHandler = (e) => {
        if(e.code === 'Escape') {
            e.preventDefault();
            props.onClose();
            setClosed(true);
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', escKeyHandler);
        return () => {
            document.removeEventListener('keydown', escKeyHandler);
        }
    }, []);

    const modalTarget = document.querySelector('#modals');
    
    return closed ? null : ReactDOM.createPortal(<ModalOverlay onClose={closeClickHandler} hidden={props.hidden}>
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
    onClose: PropTypes.func,
    heading: PropTypes.string,
    closed: PropTypes.bool
}

export default Modal;
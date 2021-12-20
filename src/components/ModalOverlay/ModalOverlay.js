import ReactDOM from 'react-dom'
import styles from './ModalOverlay.module.css';
import ModalContext from '../../utils/modalContext';
import { useEffect, useState } from 'react';

const ModalOverlay = (props) => {

    useEffect(() => {
        if(props.content) {
            setHidden(false);
        }
    }, [props.content])

    useEffect(() => {
        if(props.visible !== undefined) {
            setHidden(!props.visible)
        }
    }, [props.visible])

    const [hidden, setHidden] = useState(true);

    const onModalClose = () => {
        setHidden(true);
        if(props.onClose) {
            props.onClose();
        }
    }

    const overlayClickHandler = (e) => {
        if(e.target.classList.value.indexOf('overlay') > -1) {
            setHidden(true);
            if(props.onClose) {
                props.onClose();
            }
        }
    }

    const target = document.querySelector('body');
    return ReactDOM.createPortal((
        <ModalContext.Provider value={{ onModalClose, content: props.content }}>
            <div onClick={overlayClickHandler} className={`${styles.overlay} ${hidden ? styles.hidden : ''}`}>
                { props.children }
            </div>
        </ModalContext.Provider>
    ), target);
}

export default ModalOverlay;
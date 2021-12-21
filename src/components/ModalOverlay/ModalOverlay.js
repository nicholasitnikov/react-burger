import styles from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = (props) => {

    const overlayClickHandler = (e) => {
        if(e.target === e.currentTarget) {
            props.onClose();
        }
    }
    
    return ( 
        <div onClick={overlayClickHandler} className={`${styles.overlay} ${props.hidden ? styles.hidden : ''}`}>
            { props.children }
        </div> 
    )
}

ModalOverlay.propTypes = {
    hidden: PropTypes.bool,
    onClose: PropTypes.func
}

export default ModalOverlay;
import styles from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = (props) => {
    
    return ( 
        <div onClick={props.onClose} className={`${styles.overlay} ${props.hidden ? styles.hidden : ''}`}>
            { props.children }
        </div> 
    )
}

ModalOverlay.propTypes = {
    hidden: PropTypes.bool
}

export default ModalOverlay;
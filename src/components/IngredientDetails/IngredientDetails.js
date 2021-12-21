import styles from './IngredientDetails.module.css';
import PropTypes from 'prop-types';

const IngredientDetails = (props) => {

    return(<>
        <img src={props.image_large} alt={props.name} />
        <h2 className={`text text_type_main-medium pt-4 pb-8 ${styles.name}`}>{props.name}</h2>
        <ul className={styles.propertiesList}>
            <li className={styles.propertyItem}>
                <span className="text text_type_main-default text_color_inactive pb-2">Калории,ккал</span>
                <p className="text text_type_digits-default text_color_inactive">{props.calories}</p>
            </li>
            <li className={styles.propertyItem}>
                <span className="text text_type_main-default text_color_inactive pb-2">Белки, г</span>
                <p className="text text_type_digits-default text_color_inactive">{props.proteins}</p>
            </li>
            <li className={styles.propertyItem}>
                <span className="text text_type_main-default text_color_inactive pb-2">Жиры, г</span>
                <p className="text text_type_digits-default text_color_inactive">{props.fat}</p>
            </li>
            <li className={styles.propertyItem}>
                <span className="text text_type_main-default text_color_inactive pb-2">Углеводы, г</span>
                <p className="text text_type_digits-default text_color_inactive">{props.carbohydrates}</p>
            </li>
        </ul>
    </>)
}

IngredientDetails.propTypes = {
    name: PropTypes.string,
    image_large: PropTypes.string,
    calories: PropTypes.string,
    proteins: PropTypes.string,
    fat: PropTypes.string,
    carbohydrates: PropTypes.string,
}

export default IngredientDetails;
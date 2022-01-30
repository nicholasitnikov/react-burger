import styles from './IngredientDetails.module.css';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const IngredientDetails = () => {

    const { currentIngredient } = useSelector(store => store.burger);

    return(currentIngredient ? <>
        <img src={currentIngredient.image_large} alt={currentIngredient.name} />
        <h2 className={`text text_type_main-medium pt-4 pb-8 ${styles.name}`}>{currentIngredient.name}</h2>
        <ul className={styles.propertiesList}>
            <li className={styles.propertyItem}>
                <span className="text text_type_main-default text_color_inactive pb-2">Калории,ккал</span>
                <p className="text text_type_digits-default text_color_inactive">{currentIngredient.calories}</p>
            </li>
            <li className={styles.propertyItem}>
                <span className="text text_type_main-default text_color_inactive pb-2">Белки, г</span>
                <p className="text text_type_digits-default text_color_inactive">{currentIngredient.proteins}</p>
            </li>
            <li className={styles.propertyItem}>
                <span className="text text_type_main-default text_color_inactive pb-2">Жиры, г</span>
                <p className="text text_type_digits-default text_color_inactive">{currentIngredient.fat}</p>
            </li>
            <li className={styles.propertyItem}>
                <span className="text text_type_main-default text_color_inactive pb-2">Углеводы, г</span>
                <p className="text text_type_digits-default text_color_inactive">{currentIngredient.carbohydrates}</p>
            </li>
        </ul>
    </> : null)
}

IngredientDetails.propTypes = {
    name: PropTypes.string,
    image_large: PropTypes.string,
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
}

export default IngredientDetails;
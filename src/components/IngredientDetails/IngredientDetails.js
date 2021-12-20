import { useContext } from "react";
import ModalContext from "../../utils/modalContext";

import styles from './IngredientDetails.module.css';

const IngredientDetails = () => {

    const { content } = useContext(ModalContext);

    if(!content) { return null; }

    return(<>
        <img src={content.image_large} alt={content.name} />
        <h2 className={`text text_type_main-medium pt-4 pb-8 ${styles.name}`}>{content.name}</h2>
        <ul className={styles.propertiesList}>
            <li className={styles.propertyItem}>
                <span className="text text_type_main-default text_color_inactive pb-2">Калории,ккал</span>
                <p className="text text_type_digits-default text_color_inactive">{content.calories}</p>
            </li>
            <li className={styles.propertyItem}>
                <span className="text text_type_main-default text_color_inactive pb-2">Белки, г</span>
                <p className="text text_type_digits-default text_color_inactive">{content.proteins}</p>
            </li>
            <li className={styles.propertyItem}>
                <span className="text text_type_main-default text_color_inactive pb-2">Жиры, г</span>
                <p className="text text_type_digits-default text_color_inactive">{content.fat}</p>
            </li>
            <li className={styles.propertyItem}>
                <span className="text text_type_main-default text_color_inactive pb-2">Углеводы, г</span>
                <p className="text text_type_digits-default text_color_inactive">{content.carbohydrates}</p>
            </li>
        </ul>
    </>)
}

export default IngredientDetails;
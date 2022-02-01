import axios from "axios";
import CONSTANTS from "../../utils/constants";
import { v4 as uuidv4 } from 'uuid';

export const INGREDIENTS_REQUEST_IN_PROGRESS = 'INGREDIENTS_REQUEST_IN_PROGRESS';
export const INGREDIENTS_REQUEST_SUCCESS = 'INGREDIENTS_REQUEST_SUCCESS';
export const INGREDIENTS_REQUEST_FAILED = 'INGREDIENTS_REQUEST_FAILED';

export const ORDER_REQUEST_IN_PROGRESS = 'ORDER_REQUEST_IN_PROGRESS';
export const ORDER_REQUEST_SUCCESS = 'ORDER_REQUEST_SUCCESS';
export const ORDER_REQUEST_FAILED = 'ORDER_REQUEST_FAILED';

export const CLEAN_CURRENT_INGREDIENT = 'CLEAN_CURRENT_INGREDIENT';

export const CLEAN_ORDER = 'CLEAN_ORDER';

export const ADD_CONSTRUCTOR_ITEM = 'ADD_CONSTRUCTOR_ITEM';

export const DELETE_CONSTRUCTOR_ITEM = 'DELETE_CONSTRUCTOR_ITEM';

export const MOVE_CONSTRUCTOR_ITEM = 'MOVE_CONSTRUCTOR_ITEM';

export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';

export const CLEAN_CONTRUCTOR = 'CLEAN_CONTRUCTOR';

export const generateContructorItem = (item) => {
    return { type: ADD_CONSTRUCTOR_ITEM, id: item.id, itemType: item.type, key: uuidv4() }
}

export const sendOrder = () => (dispatch, getState) => {

    const { constructorItems } = getState().burger;
    const preparedData = constructorItems.map(el => el._id).concat([constructorItems[0]._id]);

    dispatch({ type: ORDER_REQUEST_IN_PROGRESS })

    axios.post(`${CONSTANTS.API_URL}/orders`, {
      "ingredients": preparedData
    }).then((res) => {
        if(res.data.success) {
            dispatch({ type: ORDER_REQUEST_SUCCESS, order: res.data.order })
        }
    }).catch(err => {
        dispatch({ type: ORDER_REQUEST_FAILED })
    });


}

export const getIngredients = () => dispatch => {

    dispatch({ type: INGREDIENTS_REQUEST_IN_PROGRESS });

    axios.get(`${CONSTANTS.API_URL}/ingredients`)
    .then(res => {
        dispatch({ type: INGREDIENTS_REQUEST_SUCCESS, data: res.data.data })
    }).catch(err => {
        console.log(err)
        dispatch({ type: INGREDIENTS_REQUEST_FAILED })
    })

}
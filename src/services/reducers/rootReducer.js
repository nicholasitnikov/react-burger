import { combineReducers } from "redux";
import { v4 as uuidv4 } from 'uuid';

import { 
    INGREDIENTS_REQUEST_IN_PROGRESS,
    INGREDIENTS_REQUEST_SUCCESS,
    INGREDIENTS_REQUEST_FAILED,
    ADD_CONSTRUCTOR_ITEM,
    CLEAN_CURRENT_INGREDIENT,
    ORDER_REQUEST_FAILED,
    ORDER_REQUEST_SUCCESS,
    ORDER_REQUEST_IN_PROGRESS,
    CLEAN_ORDER,
    MOVE_CONSTRUCTOR_ITEM,
    DELETE_CONSTRUCTOR_ITEM,
    SET_CURRENT_INGREDIENT,
    CLEAN_CONTRUCTOR
 } from '../actions/';

const initialState = {
    ingredients: [],
    constructorItems: [],
    currentIngredient: null,
    order: null,
    ingredientsRequest: {
        loading: true,
        failed: false
    },
    orderRequest: {
        loading: false,
        failed: false
    },
}

function moveContructorItem(targetArray, old_index, new_index) {
    if (new_index >= targetArray.length) {
        let k = new_index - targetArray.length + 1;
        while (k--) {
            targetArray.push(undefined);
        }
    }
    targetArray.splice(new_index, 0, targetArray.splice(old_index, 1)[0]);
    return targetArray;
};

const burgerReducer = (state = initialState, action) => {
    switch(action.type) {
        case INGREDIENTS_REQUEST_IN_PROGRESS: {
            return {
                ...state,
                ingredientsRequest: {
                    ...state.ingredientsRequest,
                    loading: true
                }
            }
        }
        case INGREDIENTS_REQUEST_SUCCESS: {
            return {
                ...state,
                ingredientsRequest: {
                    ...state.ingredientsRequest,
                    loading: false
                },
                ingredients: [
                    ...state.ingredients,
                    ...action.data
                ]
            }
        }
        case INGREDIENTS_REQUEST_FAILED: {
            return {
                ...state,
                ingredientsRequest: {
                    ...state.ingredientsRequest,
                    loading: false,
                    failed: true
                }
            }
        }
        case ORDER_REQUEST_IN_PROGRESS: {
            return {
                ...state,
                orderRequest: {
                    ...state.orderRequest,
                    loading: true
                }
            }
        }
        case ORDER_REQUEST_SUCCESS: {
            return {
                ...state,
                orderRequest: {
                    ...state.orderRequest,
                    loading: false
                },
                order: action.order
            }
        }
        case ORDER_REQUEST_FAILED: {
            return {
                ...state,
                orderRequest: {
                    ...state.orderRequest,
                    loading: false,
                    failed: true
                }
            }
        }
        case SET_CURRENT_INGREDIENT: {
            return {
                ...state,
                currentIngredient: state.ingredients.find(ingredient => ingredient._id === action.id),
            }
        }
        case ADD_CONSTRUCTOR_ITEM: {

            return {
                ...state,
                constructorItems: action.itemType === 'bun' && state.constructorItems.length > 0  ? [...state.constructorItems.map(el => {
                    return el.type === 'bun' ? state.ingredients.find(ingredient => ingredient._id === action.id) : el;
                })] : [
                    ...state.constructorItems,
                    ...[{...state.ingredients.find(el => el._id === action.id), key: uuidv4()}]
                ]
            }
        }
        case MOVE_CONSTRUCTOR_ITEM: {
            const targetIndex = state.constructorItems.findIndex(el => el._id === action.targetId) + 1
            const elementIndex = state.constructorItems.findIndex(el => el._id === action.id) 
            let prevState = [...state.constructorItems];
            
            return {
                ...state,
                constructorItems: moveContructorItem(prevState, elementIndex, targetIndex).filter(el => el)
            };
        }
        case CLEAN_CURRENT_INGREDIENT: {
            return {
                ...state,
                currentIngredient: null
            }
        }
        case DELETE_CONSTRUCTOR_ITEM: {
            return {
                ...state,
                constructorItems: state.constructorItems.filter(el => action.key !== el.key)
            }
        }
        case CLEAN_ORDER: {
            return {
                ...state,
                order: null
            }
        }
        case CLEAN_CONTRUCTOR: {
            return {
                ...state,
                constructorItems: []
            }
        }
        default: {
            return state;
        }
    }
}


export const rootReducer = combineReducers({
    burger: burgerReducer
})
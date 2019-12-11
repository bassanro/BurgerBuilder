import * as actionTypes from './actionTypes';
import axiosInstance from '../../axis-orders';

export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredient = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

export const fetchIngredinetFailed = () => {
  return {
    type: actionTypes.FECTH_INGREDIENTS_FAILED
  };
};

// Synchrous action.
export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

// Redux funk action creator - Async type
export const initIngredients = () => {
  return dispatch => {
    console.log('fecting data from DB');
    axiosInstance
      .get('https://react-my-burger-c304a.firebaseio.com/ingredients.json')
      .then(resposne => {
        console.log(resposne.data);
        dispatch(setIngredients(resposne.data));
      })
      .catch(err => {
        dispatch(fetchIngredinetFailed());
      });
  };
};

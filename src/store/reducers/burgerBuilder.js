import * as actionTpes from '../actions/actionTypes';

const INGREDIENTS_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 0,
  meat: 1.7
};

const initalState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTpes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
      };
    case actionTpes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]
      };
    case actionTpes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          cheese: action.ingredients.cheese,
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          meat: action.ingredients.meat
        },
        error: false
      };
    case actionTpes.FECTH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
};

export default reducer;

import * as actionTypes from './actionTypes';
import axiosInstance from '../../axis-orders';

// Action Creator handlers -> order to be cretaed in  backend.
// SYnce ones
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFailed = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

// Async action creator
export const purchaseBurger = orderData => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axiosInstance
      .post('/orders.json', orderData)
      .then(reponse => {
        console.log(reponse.data);
        dispatch(purchaseBurgerSuccess(reponse.data, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFailed(error));
      });
  };
};

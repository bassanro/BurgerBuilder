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
        dispatch(purchaseBurgerSuccess(reponse.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFailed(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fecthOrderSuccess = orders => {
  return {
    type: actionTypes.FECTH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FECTH_ORDERS_FAIL
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    axiosInstance
      .get('/orders.json')
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        dispatch(fecthOrderSuccess(fetchedOrders));
      })
      .catch(err => {
        dispatch(fetchOrdersFail());
      });
  };
};

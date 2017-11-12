export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const LOADING_PRODUCTS = 'LOADING_PRODUCTS';
export const ERROR_FOR_PRODUCTS = 'ERROR_FOR_PRODUCTS';

const PRODUCTS_FEED_URL = 'data/products.json';

export const setProductsLoading = () => {
  return {
    type: LOADING_PRODUCTS
  };
};

export const receiveProducts = (products) => {
  return {
    type: RECEIVE_PRODUCTS,
    products: products
  };
};

export const errorForProducts = (error) => {
  return {
    type: ERROR_FOR_PRODUCTS,
    error: error
  };
};

export const fetchProducts = () => dispatch => {
  const url = PRODUCTS_FEED_URL;

  dispatch(setProductsLoading());

  return fetch(url, { credentials: 'include' })
    .then(response => response.json())
    .then(json => dispatch(receiveProducts(json)))
    .catch(error => dispatch(errorForProducts(error)));
};

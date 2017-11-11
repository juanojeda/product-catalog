import { assign } from 'lodash';

import { FETCH_PRODUCTS, RECEIVE_PRODUCTS, ERROR_FOR_PRODUCTS } from '../actions/ProductsActions';

const initialState = {
  loading: false,
  products: [],
  error: {
    isError: false,
    message: ''
  }
};

const ProductsReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_PRODUCTS: {
      return assign({}, state, {
        loading: true,
        error: {...initialState.error}
      });
    }

    case RECEIVE_PRODUCTS: {
      return assign({}, state, {
        loading: false,
        products: action.products,
        error: {...initialState.error}
      });
    }

    case ERROR_FOR_PRODUCTS: {
      const errorPacket = {
        isError: true,
        message: action.error
      };

      return assign({}, state, {
        loading: false,
        error: errorPacket,
      });
    }

    default:
      return state;
  }
};

export default ProductsReducer;

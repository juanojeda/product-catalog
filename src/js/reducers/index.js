import { combineReducers } from 'redux';

import ProductsReducer from './ProductsReducer';

const rootReducer = combineReducers({
  ProductsReducer,
  // other reducers would go here
});

export default rootReducer;

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from './store';

import ProductCatalog from './productCatalog/ProductCatalog';

const StoreInstance = Store();

const root = document.getElementById('root');

if (root) {
  ReactDOM.render(
    <Provider store={StoreInstance}>
      <ProductCatalog
        categoryTitle="Women's tops"
      />
    </Provider>,
    root
  );
}

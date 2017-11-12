import { createSelector } from 'reselect';
import { filter, map, uniq } from 'lodash';

/**
 * Gets the products array from redux store
 */
const getProducts = (state) => {
  state.ProductsReducer;
};

/**
 * Loops through the products and returns an array
 * of all unique sizes in stock
 */
export const getFilters = createSelector(
  getProducts,
  (productsFeed) => {
    return uniq(map(productsFeed, 'size'));
  }
);

/**
 * Takes a size, and loops through the products
 * to find all products with that size in stock
 */
export const getProductsBySize = size => {
  return createSelector(
    getProducts,
    (productsFeed) => {
      if (size === null) {
        return productsFeed;
      }

      const products = filter(productsFeed, (product) => {
        return product.size.indexOf(size) !== -1;
      });

      return products;
    }
  );
};

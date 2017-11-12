import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { assign, isEqual } from 'lodash';

import { getFilters, getProductsBySize } from '../selectors/filterSelectors';

import * as ProductActions from '../actions/ProductsActions';

import ProductFilters from './ProductFilters';

class ProductCatalog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedFilter: null,
      products: [],
      filters: []
    };
  }


  componentWillMount() {
    const { actions } = this.props;

    // trigger fetch of products. This won't directly
    // populate the products, but will be caught by the
    // componentWillUpdate step, to handle
    actions.fetchProducts();
  }

  componentWillUpdate(nextProps, nextState) {

    const isProductsOutOfSync = (nextProps.productsFeed.products.length && !this.state.products.length);
    const isSelectedFilterOutOfSync = !isEqual(nextState.selectedFilter, this.state.selectedFilter);

    // if a filter has been selected, get the filtered products
    if (isProductsOutOfSync || isSelectedFilterOutOfSync){
      this.setState({
        products: nextProps.filteredProducts(nextState.selectedFilter)
      });
    }
  }



  render() {

    const {categoryTitle} = this.props;
    const { products, filters } = this.state;

    return (
      <div className="catalog container">

        <div className="catalog__header">
          <h2>{categoryTitle}</h2>

          <ProductFilters filters={filters} />
        </div>

        <div className="catalog__product-list">
          {
            products.map((product) => {
              return (
                <div>{product}</div>
              );
            })
          }
        </div>

      </div>
    );
  }
}

ProductCatalog.propTypes = {
  categoryTitle: PropTypes.string.isRequired,
};

function mapStateToProps (state) {
  return {
    productsFeed: state.ProductsReducer,
    filters: getFilters(state),
    filteredProducts: (size) => { return getProductsBySize(size)(state); }
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign({}, ProductActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCatalog);

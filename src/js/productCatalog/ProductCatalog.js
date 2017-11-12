import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { assign, isEqual, filter, uniq, map, flatten } from 'lodash';

import * as ProductActions from '../actions/ProductsActions';

import ProductFilters from './ProductFilters';

class ProductCatalog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      selectedFilter: null,
      filters: [],
      products: []
    };

    this.setSelectedFilterSize = this.setSelectedFilterSize.bind(this);
  }

  componentWillMount() {
    const { actions } = this.props;

    actions.fetchProducts();

  }

  componentWillUpdate(nextProps, nextState) {

    const isProductsLoaded = !isEqual(this.props.productsState, nextProps.productsState);
    const isFilterUpdated = !isEqual(this.state.selectedFilter, nextState.selectedFilter);

    if (isProductsLoaded || isFilterUpdated){
      this.setState({
        isLoading: nextProps.productsState.isLoading,
        filters: this.getFiltersFromProductsFeed(nextProps.productsState.products),
        products: this.getProductsBySize(nextProps.productsState.products, nextState.selectedFilter)
      });
    }
  }

  getProductsBySize(products, size) {
    let filteredProducts = [...products];

    if(size !== null) {
      filteredProducts = filter(products, (product) => {
        return product.size.indexOf(size) !== -1;
      });
    }

    return filteredProducts;
  }

  getFiltersFromProductsFeed(products){
    const filters = uniq(flatten(map(products, 'size')));

    return filters;
  }

  setSelectedFilterSize(size) {
    this.setState({
      selectedFilter: size
    });
  }

  render() {
    const {categoryTitle} = this.props;

    return (
      <div className='catalog container'>

        <div className='catalog__header'>
          <h2>{categoryTitle}</h2>

          <ProductFilters onChangeHandler={this.setSelectedFilterSize} filters={this.state.filters} />
        </div>

        {
          this.state.isLoading ?
            <div className='loading'>Loading ...</div>
          :
            <div className='catalog__product-list'>
              {
                this.state.products.map((product) => {
                  return (
                    <div key={product.index}>{product.productName}</div>
                  );
                })
              }
            </div>
        }
      </div>
    );
  }
}

ProductCatalog.propTypes = {
  categoryTitle: PropTypes.string.isRequired,
};

function mapStateToProps (state) {
  return {
    productsState: state.ProductsReducer
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(assign({}, ProductActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCatalog);

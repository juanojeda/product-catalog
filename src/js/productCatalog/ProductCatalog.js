import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { assign } from 'lodash';

import * as ProductActions from '../actions/ProductsActions';

import ProductFilters from './ProductFilters';

class ProductCatalog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedFilter: null,
    };
  }


  componentWillMount() {
    const { actions } = this.props;

    actions.fetchProducts();
  }


  render() {

    const {categoryTitle} = this.props;

    return (
      <div className="catalog container">

        <div className="catalog__header">
          <h2>{categoryTitle}</h2>

          <ProductFilters filters={[{name: 's'}, {name: 'm'}, {name: 'l'}]} />
        </div>

        <div className="catalog__product-list">

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
    products: state.products
  };
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    actions: bindActionCreators(assign({}, ProductActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCatalog);

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductFilters extends Component {
  render() {

    const { filters } = this.props;

    return (
      <div className="header__filters">
        <select name="productFilters" id="productFilters">
          {
            filters.map((filter)=> {
              return (
                <option key={filter.name}>
                  {filter.name}
                </option>
              );
            })
          }
        </select>
      </div>
    );
  }
}

ProductFilters.propTypes = {
  filters: PropTypes.array.isRequired
};

export default ProductFilters;

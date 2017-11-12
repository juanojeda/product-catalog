import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductFilters extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedFilter: null
    };

    this.setSelectedFilter = this.setSelectedFilter.bind(this);
  }

  setSelectedFilter(event) {
    let filter = null;

    if(event.target.value !== '') {
      filter = event.target.value;
    }

    this.props.onChangeHandler(filter);
  }

  render() {

    const { filters } = this.props;

    return (
      <div className='header__filters'>
        <select onChange={this.setSelectedFilter} name='productFilters' id='productFilters'>
          <option value=''>Filter by size</option>
          {
            /*TODO: Filter so that sizes come out ordered logically*/
            filters.map((filter) => {
              return (
                <option value={filter} key={filter}>
                  {filter}
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
  filters: PropTypes.array.isRequired,
  onChangeHandler: PropTypes.func.isRequired
};

export default ProductFilters;

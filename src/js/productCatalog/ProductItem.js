import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductItem extends Component {
  render() {

    const { isSale,
            isExclusive,
            price,
            productImage,
            productName } = this.props;

    const hasBadge = (isSale || isExclusive);

    return (
      <div className="product-item">
        <div className="product-item__image-container">
          <img src={`./images/${productImage}`} className="product-item__image" />
        </div>

        {
          hasBadge ?
          <div className="product-item__badge-container">
          {
            isSale ?
            <div className="product-item__badge product-item__badge--sale">
              Sale
            </div>
            : null
          }
          {
            isExclusive ?
            <div className="product-item__badge product-item__badge--exclusive">
              Exclusive
            </div>
            : null
          }
          </div>
          : null
        }

        <h3 className="product-item__name">{productName}</h3>
        <div className="product-item__price">{price}</div>
      </div>
    );
  }
}

ProductItem.propTypes = {
  isSale:       PropTypes.bool.isRequired,
  isExclusive:  PropTypes.bool.isRequired,
  price:        PropTypes.string.isRequired,
  productImage: PropTypes.string.isRequired,
  productName:  PropTypes.string.isRequired,
};

export default ProductItem;

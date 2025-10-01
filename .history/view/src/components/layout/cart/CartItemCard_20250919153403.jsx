import React from 'react';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import ProductImage from '../../common/ProductImage';

const CartItemCard = ({ item, deleteCartItem }) => {
  console.log(item);
  return (
    <>
      <div className='item-wrapper d-flex'>
        <div className='item-img'>
          <img
            src={item?.images?.[0]?.url || '/placeholder-image.jpg'}
            alt={item.name || 'product'}
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg';
            }}
          />
        </div>
        <div className='item-name'>
          <span>{item.name}</span>
          <br />
          <span>
            #ID <Link to={`/product/${item.product}`}>{item.product}</Link>
          </span>
          <span className='mobile-hide-details'>Quantity: {item.quantity}</span>
          <span className='mobile-hide-details'>
            <strong>
              {(item.quantity * item.price).toLocaleString('en-IN', {
                style: 'currency',
                currency: 'INR',
              })}
            </strong>
          </span>
        </div>
        <div className='item-quantity-price d-flex justify-content-between'>
          <span>Quantity: {item.quantity}</span>
          <span>
            <strong>
              {(item.quantity * item.price).toLocaleString('en-IN', {
                style: 'currency',
                currency: 'INR',
              })}
            </strong>
          </span>
        </div>
        <button
          onClick={() => {
            deleteCartItem(item.product);
          }}
          className='delete-btn'
          aria-label={`Remove ${item.name} from cart`}
          title='Remove from cart'
        >
          <MdDelete />
        </button>
      </div>
    </>
  );
};

export default CartItemCard;

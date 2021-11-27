import React from 'react';
import Rating from './Rating';

const Restaurant = ({
  name,
  imageURL,
  rating,
  phone,
  reviewCount,
  isClosed,
  method,
}) => {
  return (
    <>
      <div className="restaurant-image">
        <img src={imageURL} alt={name} />
      </div>
      <div className="restaurant-details">
        <h1>{name}</h1>
        <Rating value={rating} text={reviewCount} />
        <span className={`restaurant-isclosed-${isClosed}`}>
          {isClosed ? 'Closed' : 'Open'}
        </span>
        <div className="transaction">
          {method.map((transaction, index) => (
            <span className="transaction-name" key={index}>
              <i className="fa fa-check"></i>
              {transaction}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Restaurant;

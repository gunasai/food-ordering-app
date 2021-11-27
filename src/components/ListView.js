import React from 'react';
import Restaurant from './Restaurant';

const ListView = ({ restaurantData, filterRestaurants }) => {
  return (
    <div className="restaurants-list">
      <h2>All Results</h2>
      <ul className="card-list">
        {restaurantData.map((restaurant) => (
          <li key={restaurant.id} className="card">
            <Restaurant
              name={restaurant.name}
              imageURL={restaurant.image_url}
              rating={restaurant.rating}
              phone={restaurant.phone}
              reviewCount={restaurant.review_count}
              isClosed={restaurant.is_closed}
              method={restaurant.transactions}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListView;

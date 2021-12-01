import React from 'react';

const FiltersContainer = ({
  categories,
  cuisines,
  method,
  isOpenFilter,
  handleCuisineFilter,
  handleStatusFilter,
  handleMethodFilter,
}) => {
  return (
    <div className="filters">
      <p className="filter-header">Suggested</p>
      <div className="cuisines">
        {cuisines.map((cuisine) => (
          <div key={cuisine.id}>
            <input
              type="checkbox"
              id={`checkbox-${cuisine.name}`}
              name={cuisine.name}
              value={cuisine.name || ''}
              checked={cuisine.checked}
              onChange={(e) => handleCuisineFilter(e, cuisine)}
            />
            <label htmlFor={`checkbox-${cuisine.id}`}>{cuisine.name}</label>
          </div>
        ))}
      </div>
      <p className="status-header">Status</p>
      <div className="restaurant-status">
        {isOpenFilter.map((cuisine) => (
          <div key={cuisine.id}>
            <input
              type="checkbox"
              id={`checkbox-${cuisine.name}`}
              name={cuisine.name}
              value={cuisine.name || ''}
              checked={cuisine.checked}
              onChange={(e) => handleStatusFilter(e, cuisine)}
            />
            <label htmlFor={`checkbox-${cuisine.id}`}>Open Now</label>
          </div>
        ))}
      </div>
      <p className="status-header">Method</p>
      <div className="method">
        {method.map((cuisine) => (
          <div key={cuisine.id}>
            <input
              type="checkbox"
              id={`checkbox-${cuisine.name}`}
              name={cuisine.name}
              value={cuisine.name || ''}
              checked={cuisine.checked}
              onChange={(e) => handleMethodFilter(e, cuisine)}
            />
            <label htmlFor={`checkbox-${cuisine.id}`}>{`${
              cuisine.name.charAt(0).toUpperCase() + cuisine.name.slice(1)
            }`}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiltersContainer;

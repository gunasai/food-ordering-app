import React, { useState, useEffect } from 'react';
import ListView from '../components/ListView';
import restaurantData from '../utils/data.json';
import FiltersContainer from './FiltersContainer';

const RestaurantsContainer = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [isOpenFilter, setIsOpenFilter] = useState([
    {
      id: 1,
      name: 'isOpen',
      checked: false,
    },
  ]);
  const [method, setMethod] = useState([
    {
      id: 1,
      name: 'delivery',
      checked: false,
    },
    {
      id: 2,
      name: 'pickup',
      checked: false,
    },
  ]);

  const setFilter = (cuisine, flag) => {
    setCuisines(
      cuisines.map((c) => (c.id === cuisine.id ? { ...c, checked: flag } : c)),
    );
  };

  const setStatusFilter = (cuisine, flag) => {
    setIsOpenFilter(
      isOpenFilter.map((c) =>
        c.id === cuisine.id ? { ...c, checked: flag } : c,
      ),
    );
  };

  const setMethodFilter = (cuisine, flag) => {
    setMethod(
      method.map((c) => (c.id === cuisine.id ? { ...c, checked: flag } : c)),
    );
  };

  const handleCuisineFilter = (e, cuisine) => {
    if (e.target.checked) {
      setFilter(cuisine, true);
    } else {
      setFilter(cuisine, false);
    }
  };

  const handleStatusFilter = (e, cuisine) => {
    if (e.target.checked) {
      setStatusFilter(cuisine, true);
    } else {
      setStatusFilter(cuisine, false);
    }
  };

  const handleMethodFilter = (e, cuisine) => {
    if (e.target.checked) {
      setMethodFilter(cuisine, true);
    } else {
      setMethodFilter(cuisine, false);
    }
  };

  useEffect(() => {
    setRestaurants(restaurantData.businesses);
    setFilteredData(restaurantData.businesses);
    // Extracting categories
    let categoriesArray = restaurantData.businesses.map((restaurant) => {
      return restaurant.categories[0];
    });

    let uniqueCategories = [...new Set(categoriesArray)];
    let filtersArray = [];
    uniqueCategories.map((category, index) => {
      filtersArray.push({
        id: index + 1,
        name: category,
        checked: false,
      });
    });

    setCategories(uniqueCategories);
    setCuisines(filtersArray);
  }, []);

  useEffect(() => {
    const checkedFilters = cuisines.filter((c) => c.checked);
    const noFiltersChecked = checkedFilters.length === 0;

    const cuisineData = [...restaurants];
    let data = [];

    if (noFiltersChecked) {
      setFilteredData(cuisineData);
    } else {
      // EDITED:
      data = checkedFilters.reduce((acc, post) => {
        cuisineData.map((r) => {
          if (r.categories.includes(post.name)) {
            acc.push(r);
          }
        });
        return acc;
      }, []);

      setFilteredData(data);
    }
  }, [cuisines, restaurants]);

  useEffect(() => {
    const checkedFilters = isOpenFilter.filter((c) => c.checked);
    const noFiltersChecked = checkedFilters.length === 0;

    const cuisineData = [...restaurants];
    let data = [];

    if (noFiltersChecked) {
      setFilteredData(cuisineData);
    } else {
      // EDITED:
      data = checkedFilters.reduce((acc, post) => {
        cuisineData.map((r) => {
          if (r.is_closed === !post.checked) {
            acc.push(r);
          }
        });
        return acc;
      }, []);

      setFilteredData(data);
    }
  }, [isOpenFilter, restaurants]);

  useEffect(() => {
    const checkedFilters = method.filter((c) => c.checked);
    const noFiltersChecked = checkedFilters.length === 0;

    const cuisineData = [...restaurants];
    let data = [];

    if (noFiltersChecked) {
      setFilteredData(cuisineData);
    } else {
      // EDITED:
      data = checkedFilters.reduce((acc, post) => {
        cuisineData.map((r) => {
          if (r.transactions.includes(post.name)) {
            acc.push(r);
          }
        });
        return acc;
      }, []);

      setFilteredData(data);
    }
  }, [method, restaurants]);

  return (
    <div className="wrapper">
      <FiltersContainer
        categories={categories}
        cuisines={cuisines}
        method={method}
        isOpenFilter={isOpenFilter}
        handleCuisineFilter={handleCuisineFilter}
        handleStatusFilter={handleStatusFilter}
        handleMethodFilter={handleMethodFilter}
      />
      <ListView restaurantData={filteredData} />
    </div>
  );
};

export default RestaurantsContainer;

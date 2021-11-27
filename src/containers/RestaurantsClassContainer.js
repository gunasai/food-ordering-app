import React, { Component } from 'react';
import ListView from '../components/ListView';
import restaurantData from '../utils/data.json';
import FiltersContainer from './FiltersContainer';

export default class RestaurantsClassContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurants: [],
      categories: [],
      filteredData: [],
      cuisines: [],
      isOpenFilter: [
        {
          id: 1,
          name: 'isOpen',
          checked: false,
        },
      ],
      method: [
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
      ],
      selectedFilters: [],
    };

    this.setFilter = this.setFilter.bind(this);
    this.setStatusFilter = this.setStatusFilter.bind(this);
    this.setMethodFilter = this.setMethodFilter.bind(this);
    this.updateCuisineData = this.updateCuisineData.bind(this);
    this.updateStatusData = this.updateStatusData.bind(this);
    this.updateTransactionData = this.updateTransactionData.bind(this);
    this.handleCuisineFilter = this.handleCuisineFilter.bind(this);
    this.handleStatusFilter = this.handleStatusFilter.bind(this);
    this.handleMethodFilter = this.handleMethodFilter.bind(this);
  }

  setFilter = (cuisine, flag) => {
    this.setState(
      (prevState) => ({
        cuisines: prevState.cuisines.map((c) =>
          // check state for the selected cuisine
          c.id === cuisine.id ? { ...c, checked: flag } : c,
        ),
      }),
      () => {
        this.updateCuisineData();
      },
    );
  };

  setStatusFilter = (cuisine, flag) => {
    this.setState(
      (prevState) => ({
        isOpenFilter: prevState.isOpenFilter.map((c) =>
          // check state for the selected cuisine
          c.id === cuisine.id ? { ...c, checked: flag } : c,
        ),
      }),
      () => {
        this.updateStatusData();
      },
    );
  };

  setMethodFilter = (cuisine, flag) => {
    this.setState(
      (prevState) => ({
        method: prevState.method.map((c) =>
          // check state for the selected cuisine
          c.id === cuisine.id ? { ...c, checked: flag } : c,
        ),
      }),
      () => {
        this.updateTransactionData();
      },
    );
  };

  handleCuisineFilter = (e, cuisine) => {
    if (e.target.checked) {
      this.setFilter(cuisine, true);
    } else {
      this.setFilter(cuisine, false);
    }
  };

  handleStatusFilter = (e, cuisine) => {
    if (e.target.checked) {
      this.setStatusFilter(cuisine, true);
    } else {
      this.setStatusFilter(cuisine, false);
    }
  };

  handleMethodFilter = (e, cuisine) => {
    if (e.target.checked) {
      this.setMethodFilter(cuisine, true);
    } else {
      this.setMethodFilter(cuisine, false);
    }
  };

  updateCuisineData = () => {
    const checkedFilters = this.state.cuisines.filter((c) => c.checked);
    const noFiltersChecked = checkedFilters.length === 0;

    let cuisineData = [...this.state.filteredData];
    let data = [];

    if (noFiltersChecked) {
      this.setState({ filteredData: cuisineData });
    } else {
      // EDITED:
      data = checkedFilters.reduce((acc, post) => {
        this.state.restaurants.map((r) => {
          if (r.categories.includes(post.name)) {
            acc.push(r);
          }
          return true;
        });
        return acc;
      }, []);

      this.setState({ filteredData: data }, () => this.updateStatusData());
    }
  };

  updateStatusData = () => {
    const checkedFilters = this.state.isOpenFilter.filter((c) => c.checked);
    const noFiltersChecked = checkedFilters.length === 0;
    let cuisineData = [...this.state.filteredData];
    let data = [];

    if (noFiltersChecked) {
      this.setState({ filteredData: cuisineData });
    } else {
      // EDITED:
      data = checkedFilters.reduce((acc, post) => {
        this.state.restaurants.map((r) => {
          if (r.is_closed === !post.checked) {
            acc.push(r);
          }
          return true;
        });
        return acc;
      }, []);

      this.setState({ filteredData: data }, () => this.updateTransactionData());
    }
  };

  updateTransactionData = () => {
    const checkedFilters = this.state.method.filter((c) => c.checked);
    const noFiltersChecked = checkedFilters.length === 0;
    let cuisineData = [...this.state.filteredData];
    let data = [];

    if (noFiltersChecked) {
      this.setState({ filteredData: cuisineData });
    } else {
      // EDITED:
      data = checkedFilters.reduce((acc, post) => {
        this.state.restaurants.map((r) => {
          if (r.categories.includes(post.name)) {
            acc.push(r);
          }
          return true;
        });
        return acc;
      }, []);

      this.setState({ filteredData: data }, () => this.updateCuisineData());
    }
  };

  componentDidMount() {
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

    this.setState({ restaurants: restaurantData.businesses });
    this.setState({ filteredData: restaurantData.businesses });
    this.setState({ categories: uniqueCategories });
    this.setState({ cuisines: filtersArray });
  }
  render() {
    return (
      <div className="wrapper">
        <FiltersContainer
          categories={this.state.categories}
          cuisines={this.state.cuisines}
          method={this.state.method}
          isOpenFilter={this.state.isOpenFilter}
          handleCuisineFilter={this.handleCuisineFilter}
          handleStatusFilter={this.handleStatusFilter}
          handleMethodFilter={this.handleMethodFilter}
        />
        <ListView restaurantData={this.state.filteredData} />
      </div>
    );
  }
}

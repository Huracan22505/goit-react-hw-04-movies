import s from './MoviesPage.module.css';
import React, { Component } from 'react';
import axios from 'axios';
import { Route, NavLink, Link, Redirect, Switch } from 'react-router-dom';

import MoviesList from 'components/MoviesList';

class MoviesPage extends Component {
  state = {
    query: '',
    movies: [],
  };

  componentDidMount() {
    if (this.props.location.search !== '') {
      this.fetch(this.props.location.search.slice(7));
    }
  }

  hendleChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  hendleSubmit = e => {
    const { location, history } = this.props;

    e.preventDefault();

    if (this.state.query.trim() === '') {
      alert('Вы ввели пустой запрос!');
      return;
    }

    this.fetch(this.state.query);

    history.push({ ...location, search: `query=${this.state.query}` });

    // this.setState({ query: '' });
  };

  fetch = query => {
    return axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=cac5c08a938bff767b15f4beaa543e5a&language=en-US&page=1&include_adult=false`,
      )
      .then(response =>
        this.setState({
          movies: response.data.results,
        }),
      );
  };

  render() {
    const { movies } = this.state;

    return (
      <>
        <form className={s.searchForm} onSubmit={this.hendleSubmit}>
          <input
            className={s.searchFormInput}
            type="text"
            placeholder="Search movies"
            value={this.state.query}
            onChange={this.hendleChange}
          />
          <button type="submit">
            <span className={s.searchFormButtonLabel}>Search</span>
          </button>
        </form>

        <MoviesList movies={movies} />
      </>
    );
  }
}

export default MoviesPage;

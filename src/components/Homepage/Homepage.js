import s from './Homepage.module.css';
import { Component } from 'react';
import axios from 'axios';

import MoviesList from 'components/MoviesList';

export default class Homepage extends Component {
  state = {
    movies: [],
  };

  async componentDidMount() {
    const response = await axios.get(
      'https://api.themoviedb.org/3/trending/movie/day?api_key=cac5c08a938bff767b15f4beaa543e5a',
    );

    this.setState({
      movies: response.data.results,
    });
  }

  render() {
    const { movies } = this.state;

    return (
      <>
        <h1>Trending today</h1>
        <MoviesList movies={movies} />
      </>
    );
  }
}

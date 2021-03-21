import s from './MovieDetailsPage.module.css';
import axios from 'axios';
import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import routes from 'routes';

import Cast from 'components/Cast';
import Reviews from 'components/Reviews';

export default class MovieDetailsPage extends Component {
  state = {
    adult: null,
    backdrop_path: null,
    belongs_to_collection: null,
    budget: null,
    genres: null,
    homepage: null,
    id: null,
    imdb_id: null,
    original_language: null,
    original_title: null,
    overview: null,
    popularity: null,
    poster_path: null,
    production_companies: null,
    production_countries: null,
    release_date: null,
    revenue: null,
    runtime: null,
    spoken_languages: null,
    status: null,
    tagline: null,
    title: null,
    video: null,
    vote_average: null,
    vote_count: null,
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=cac5c08a938bff767b15f4beaa543e5a&language=en-US`,
    );

    this.setState({
      ...response.data,
    });
  }

  hendleGoBack = () => {
    const { location, history } = this.props;

    // if (location.state && location.state.from) {
    //   return history.push(location.state.from);
    // }

    // history.push(routes.home);

    history.push(location?.state?.from || routes.home);
  };

  render() {
    const { title, vote_average, overview, genres, poster_path } = this.state;
    const { match } = this.props;

    return (
      <div className={`container`}>
        <button className={s.button} type="button" onClick={this.hendleGoBack}>
          Go back
        </button>
        <div className={s.container}>
          <img
            className={s.img}
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt=""
          ></img>
          <div className={s.textContainer}>
            <h3 className={s.name}>{title}</h3>
            <p className={s.text}>User Score: {`${vote_average * 10}%`}</p>
            <h4 className={s.title}>Overview</h4>
            <p className={s.text}>{overview}</p>

            {genres && (
              <>
                <h4 className={s.title}>Genres</h4>
                <ul className={`${s.list} list`}>
                  {genres.map(genre => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
              </>
            )}

            <h4 className={s.title}>Additional information</h4>
            <ul className={`${s.list} list`}>
              <li>
                <NavLink
                  activeStyle={{
                    fontWeight: 'bold',
                    color: 'white',
                  }}
                  className={s.link}
                  to={`${match.url}/cast`}
                >
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeStyle={{
                    fontWeight: 'bold',
                    color: 'white',
                  }}
                  className={s.link}
                  to={`${match.url}/reviews`}
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <Switch>
          <Route path={`${match.path}/cast`} component={Cast} />
          <Route path={`${match.path}/reviews`} component={Reviews} />
        </Switch>
      </div>
    );
  }
}

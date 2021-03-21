import s from './MovieDetailsPage.module.css';
import axios from 'axios';
import React, { Component, lazy, Suspense } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import routes from 'routes';

import defaultImage from 'components/Cast/defaultImg.png';

const Cast = lazy(() =>
  import('components/Cast' /* webpackChunkName: "Cast" */),
);
const Reviews = lazy(() =>
  import('components/Reviews' /* webpackChunkName: "Reviews" */),
);

export default class MovieDetailsPage extends Component {
  state = {
    genres: null,
    overview: null,
    poster_path: null,
    title: null,
    vote_average: null,
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

    console.log(location);

    // if (location.state && location.state.from) {
    //   return history.push(location.state.from);
    // }

    history.push(location?.state?.from || routes.home);
  };

  render() {
    const { title, vote_average, overview, genres, poster_path } = this.state;
    const { match } = this.props;

    const imageCheck = poster_path
      ? `https://image.tmdb.org/t/p/w500${poster_path}`
      : defaultImage;

    return (
      <div className={`container`}>
        <button className={s.button} type="button" onClick={this.hendleGoBack}>
          Go back
        </button>
        <div className={s.container}>
          <img className={s.img} src={imageCheck} alt=""></img>
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
                  to={{
                    pathname: `${match.url}/cast`,
                    state: { ...this.props.location.state },
                  }}
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
                  to={{
                    pathname: `${match.url}/reviews`,
                    state: { ...this.props.location.state },
                  }}
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <Suspense fallback={<b>Загружаем...</b>}>
          <Switch>
            <Route path={`${match.path}/cast`} component={Cast} />
            <Route path={`${match.path}/reviews`} component={Reviews} />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

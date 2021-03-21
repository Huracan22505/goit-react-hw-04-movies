import s from './Cast.module.css';
import { Component } from 'react';
import axios from 'axios';
import defaultImage from './defaultImg.png';

class Cast extends Component {
  state = {
    cast: [],
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=cac5c08a938bff767b15f4beaa543e5a&language=en-US`,
    );

    this.setState({
      cast: response.data.cast,
    });

    console.log(response.data.cast);
  }

  render() {
    const { cast } = this.state;

    return (
      <ul className={`${s.list} list`}>
        {cast.map(el => {
          return (
            <li className={s.item} key={el.credit_id}>
              <img
                className={s.img}
                src={
                  el.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${el.profile_path}`
                    : `${defaultImage}`
                }
                alt={el.name}
              ></img>
              <h4 className={s.title}>{el.name}</h4>
              <p className={s.text}>{el.character}</p>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Cast;

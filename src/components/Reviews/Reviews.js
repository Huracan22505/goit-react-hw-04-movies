import s from './Reviews.module.css';
import React, { Component } from 'react';
import axios from 'axios';

class Reviews extends Component {
  state = {
    reviews: [],
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=cac5c08a938bff767b15f4beaa543e5a&language=en-US`,
    );

    this.setState({
      reviews: response.data.results,
    });
  }

  render() {
    const { reviews } = this.state;

    return reviews.length > 0 ? (
      <ul className={`${s.list} list`}>
        {reviews.map(({ id, author, content }) => {
          return (
            <li className={s.item} key={id}>
              <h4 className={s.title}>{`Author: ${author}`}</h4>
              <p className={s.text}>{content}</p>
            </li>
          );
        })}
      </ul>
    ) : (
      <p>We don't have any rewiews for this movie</p>
    );
  }
}

export default Reviews;

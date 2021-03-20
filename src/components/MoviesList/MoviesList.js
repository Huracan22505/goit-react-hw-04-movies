import s from './MoviesList.module.css';
import { Link, withRouter } from 'react-router-dom';

const MoviesLst = ({ movies, location }) => {
  return (
    <ul>
      {movies.map(({ id, title }) => (
        <li key={id}>
          <Link
            to={{
              pathname: `movies/${id}`,
              state: { from: location },
            }}
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default withRouter(MoviesLst);

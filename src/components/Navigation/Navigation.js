import s from './Navigation.module.css';
import routes from 'routes';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            exact
            to={routes.home}
            className="navLink"
            activeClassName="navLinkActive"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={routes.movies}
            className="navLink"
            activeClassName="navLinkActive"
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

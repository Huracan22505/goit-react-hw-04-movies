import s from './Navigation.module.css';
import routes from 'routes';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul className={`${s.list} list`}>
        <li className={s.item}>
          <NavLink
            exact
            to={routes.home}
            className="navLink"
            activeClassName="navLinkActive"
          >
            Home
          </NavLink>
        </li>
        <li className={s.item}>
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

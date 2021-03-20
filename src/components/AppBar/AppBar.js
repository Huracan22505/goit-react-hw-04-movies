import s from './AppBar.module.css';
import { NavLink } from 'react-router-dom';

import Navigation from 'components/Navigation';

const AppBar = () => {
  return (
    <header>
      <Navigation />
    </header>
  );
};

export default AppBar;

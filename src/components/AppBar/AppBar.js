import s from './AppBar.module.css';

import Navigation from 'components/Navigation';

const AppBar = () => {
  return (
    <header>
      <div className={'container'}>
        <Navigation />
      </div>
    </header>
  );
};

export default AppBar;

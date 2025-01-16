import React from 'react';
import Navigation from './Navigation';

const Header = () => {
  return (
    <div>
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <Navigation />
      </header>
      <div className="header-holder"></div>
    </div>
  );
};

export default Header;
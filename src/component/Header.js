import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <div className="exam__header">
      <img src="https://cdn.upgrad.com/marketing/images/logos/UpGrad_red_logo.svg" alt="header img" />
      {(() => {
        if (props.location.pathname !== '/') {
          return (
            <Link to="/" className="logout"> Logout </Link>
          );
        }
      })()}
    </div>
  );
};

export default Header;

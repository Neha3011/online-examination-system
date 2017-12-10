import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Describes the Login component
 * */

const Login = () => {
  return (
    <div className="exam__login">
      <Link to="author">
        <button className="exam__login__button exam__login__button--author">Login as Author</button>
      </Link>
      <Link to="student">
        <button className="exam__login__button exam__login__button--student">Login as Student</button>
      </Link>
    </div>
  );
};

export default Login;

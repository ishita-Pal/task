import React from 'react';
import './main.css';

const Header = () => {
  return (
    <header>
      <div className="name">
        Your Name: <input type="text" id="name" placeholder="Name here" />
      </div>
      <h1 className="heading">Task List</h1>
    </header>
  );
};

export default Header;

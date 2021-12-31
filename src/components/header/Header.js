import React from 'react';
import './header.css';
import logo from '../../assets/logo.jpg';
import githubLogo from '../../assets/github-logo.png';

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img
          src={logo}
          alt="logo"
          style={{ height: '5rem', width: '5.3rem' }}
        />
      </div>
      <div className="heading">
        <h2>SQL EDITOR</h2>
      </div>
      <div className="repo">
      <a href="https://github.com/hopper01/sql_editor" target="_blank" rel="noreferrer">
        <img
          src={githubLogo}
          alt="logo"
          style={{ height: '2rem', width: '2rem' }}
        />
      </a>
      </div>
    </div>
  );
};
export default Header;

import * as React from "react";
import PropTypes from "prop-types";
import "./TopNavBar.css";
import { Link } from "react-router-dom";

const TopNavBar = ({ onLogin, isAuthenticated, modalOpen, setModalOpen }) => (
  <header className="top-nav-header">
    <h2>
      <Link to="/">ArtGuessr</Link>
    </h2>
    <nav>
      {isAuthenticated ? (
        <ul>
          <li>
            <Link to="/game">Play</Link>
          </li>
          <li>
            <h3>Username</h3>
          </li>
          <li>
            <button type="button" onClick={() => onLogin(false)}>
              Sign Out
            </button>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/game">Play</Link>
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              Sign Up
            </button>
          </li>
          <li>
            <button type="button" onClick={() => onLogin(true)}>
              Sign in
            </button>
          </li>
        </ul>
      )}
    </nav>
  </header>
);

TopNavBar.propTypes = {
  onLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
};

export default TopNavBar;

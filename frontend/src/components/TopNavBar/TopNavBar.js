import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { setModalOpen, setModalContent } from '../Modal/modalSlice';

import SignUpForm from "../SignUpForm";
import SignInForm from "../SignInForm";

import "./TopNavBar.css";


import credentials from '../../services/credentials';
import ls from '../../services/localStorage';

const token = {
  ...ls('artguessr'),
  ...credentials({ username: 'demo', password: 'demo' })
}

const TopNavBar = ({ reload, setReload }) => {

  const isAuthenticated = useSelector((state) => state.authorization.isAuthenticated);
  const dispatch = useDispatch();

  return (
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
              <button type="button" onClick={() => {
                token.removeItem();
                setReload(!reload);
              }}>
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
                  dispatch(setModalContent(<SignUpForm />));
                  dispatch(setModalOpen());
                }}
              >
                Sign Up
              </button>
            </li>
            <li>
              <button type="button" onClick={() => {
                dispatch(setModalContent(<SignInForm />));
                dispatch(setModalOpen());
              }}>
                Sign in
              </button>
            </li>
          </ul>
        )}
      </nav>
    </header >
  )
};

TopNavBar.propTypes = {
  reload: PropTypes.bool.isRequired,
  setReload: PropTypes.func.isRequired,
};

export default TopNavBar;

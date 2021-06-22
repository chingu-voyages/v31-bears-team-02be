import * as React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setSignedInUser } from '../App/authSlice';
import { setModalOpen, setModalContent } from '../Modal/modalSlice';

// import "./TopNavBar.css";

import credentials from '../../services/credentials';
import ls from '../../services/localStorage';

const token = {
  ...ls('artguessr'),
  ...credentials({ username: 'demo', password: 'demo' })
}

const TopNavBar = () => {

  const isAuthenticated = useSelector((state) => state.authorization.isAuthenticated);
  const signedInUser = useSelector((state) => state.authorization.signedInUser)
  const dispatch = useDispatch();

  return (
    <header className="flex p-6 h-24 lg:container lg:mx-auto">
      <h2 className="flex-none">
        <Link to="/">ArtGuessr</Link>
      </h2>
      <nav className="flex-auto">
        <ul className="flex flex-row justify-end items-center text-lg md:text-xl space-x-3">
          <li>
            <Link to="/game">Play</Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <h3>{signedInUser}</h3>
              </li>
              <li>
                <button type="button" onClick={() => {
                  token.removeItem();
                  dispatch(setSignedInUser(''));
                }}>
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    dispatch(setModalContent('SIGNUPFORM'));
                    dispatch(setModalOpen());
                  }}
                >
                  Sign Up
                </button>
              </li>
              <li>
                <button type="button" onClick={() => {
                  dispatch(setModalContent('SIGNINFORM'));
                  dispatch(setModalOpen());
                }}>
                  Sign in
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header >
  )
};

export default TopNavBar;

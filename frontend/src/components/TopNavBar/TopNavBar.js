import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSignedInUser } from "../App/authSlice";
import { setModalOpen, setModalContent } from "../Modal/modalSlice";

import "./TopNavBar.css";

import credentials from "../../services/credentials";
import ls from "../../services/localStorage";

const token = {
  ...ls("artguessr"),
  ...credentials({ username: "demo", password: "demo" }),
};

const TopNavBar = () => {
  const isAuthenticated = useSelector(
    (state) => state.authorization.isAuthenticated
  );
  const signedInUser = useSelector((state) => state.authorization.signedInUser);
  const dispatch = useDispatch();

  return (
    <header className="flex flex-wrap items-center p-6 h-24 lg:container lg:mx-auto">
      <h2 className="font-semibold">
        <Link to="/">ArtGuessr</Link>
      </h2>
      <nav className="flex-auto">
        {isAuthenticated ? (
          <ul className="flex flex-row justify-end sm:mt-0 items-center text-lg md:text-xl space-x-3 ssf capitalize font-semibold">
            <li>
              <NavLink to="/game">Play</NavLink>
            </li>
            <li>
              <span>{signedInUser}</span>
            </li>
            <li>
              <button
                type="button"
                className="font-semibold"
                onClick={() => {
                  token.removeItem();
                  dispatch(setSignedInUser(""));
                }}
              >
                Sign Out
              </button>
            </li>
          </ul>
        ) : (
          <ul className="nav-links flex flex-row justify-end sm:mt-0 items-center text-lg md:text-xl space-x-3 ssf capitalize font-semibold">
            <li>
              <NavLink to="/game">Play</NavLink>
            </li>
            <li>
              <button
                type="button"
                className="font-semibold"
                onClick={() => {
                  dispatch(setModalContent("SIGNUPFORM"));
                  dispatch(setModalOpen());
                }}
              >
                Sign Up
              </button>
            </li>
            <li>
              <button
                type="button"
                className="font-semibold"
                onClick={() => {
                  dispatch(setModalContent("SIGNINFORM"));
                  dispatch(setModalOpen());
                }}
              >
                Sign in
              </button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default TopNavBar;

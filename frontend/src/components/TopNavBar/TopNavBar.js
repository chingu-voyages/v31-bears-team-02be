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
    <header className="container mx-auto flex flex-wrap items-center">
      <nav className="flex flex-wrap items-center justify-between w-full px-4">
        <h2 className="title font-semibold">
          <Link to="/">ArtGuessr</Link>
        </h2>
        <input className="menu-btn hidden" type="checkbox" id="menu-btn" />
        <label
          className="menu-icon block cursor-pointer md:hidden px-2 py-4 relative select-none"
          for="menu-btn"
        >
          <span className="navicon bg-grey-darkest flex items-center relative"></span>
        </label>
        {isAuthenticated ? (
          <ul className="menu border-b md:border-none flex justify-end list-reset m-0 w-full md:w-auto">
            <li className="border-t md:border-none">
              <NavLink
                className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker font-bold"
                to="/game"
              >
                Play
              </NavLink>
            </li>
            <li className="border-t md:border-none">
              <span className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker">
                {signedInUser}
              </span>
            </li>
            <li className="border-t md:border-none">
              <button
                type="button"
                className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker"
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
          <ul className="menu border-b md:border-none flex justify-end list-reset m-0 w-full md:w-auto">
            <li className="border-t md:border-none">
              <NavLink
                className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker font-bold"
                to="/game"
              >
                Play
              </NavLink>
            </li>
            <li className="border-t md:border-none">
              <button
                type="button"
                className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker"
                onClick={() => {
                  dispatch(setModalContent("SIGNUPFORM"));
                  dispatch(setModalOpen());
                }}
              >
                Sign Up
              </button>
            </li>
            <li className="border-t md:border-none">
              <button
                type="button"
                className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker"
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

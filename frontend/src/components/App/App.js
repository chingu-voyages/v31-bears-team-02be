import * as React from "react";
import { Switch, Route } from "react-router-dom";
// Using a 'routes' file as single source of truth for route strings
import { HOME, USERHOME } from "../../config/routes";
// Wrapper components to handle redirects and access to routes that need auth
import { PrivateRoute, PublicRoute } from "../routes";
import TopNavBar from "../TopNavBar";
import HomePage from "../HomePage";
// 404 page
import NotFound from "../NotFound";
import Modal from "../Modal/Modal";
import Footer from "../Footer/Footer";
import Game from "../Game/Game";
import "./App.css";

import { useDispatch, useSelector } from "react-redux";
import {
  loginSuccess,
  logout,
  setSignedInUser,
  setSignedInUserId,
} from "./authSlice";

import credentials from "../../services/credentials";
import ls from "../../services/localStorage";

const token = {
  ...ls("artguessr"),
  ...credentials({ username: "demo", password: "demo" }),
};

function App() {
  const dispatch = useDispatch();
  const signedInUser = useSelector((state) => state.authorization.signedInUser);

  const handleUserVerify = async (tokenStr) => {
    const user = await token.verifyUser(tokenStr);
    console.log(user);
    dispatch(setSignedInUserId(user.user_id));
    dispatch(setSignedInUser(user.username));

    dispatch(loginSuccess());
  };

  /* When App component mounts, check for token in local storage,
  if found, dispatch callback to set authenticated state to 'true',
  else set to 'false'. Has 'signedInUser' state value as dependency */
  React.useEffect(() => {
    console.log(signedInUser);
    if (token.getItem()) {
      console.log("token found");
      handleUserVerify(token.getItem());
    } else {
      dispatch(logout());
    }
  });

  return (
    <div className="App">
      <TopNavBar />
      <Switch>
        <PublicRoute exact path={HOME} component={HomePage} />
        <PrivateRoute exact path={USERHOME} component={HomePage} />
        <Route path="/game" component={Game} />
        <PrivateRoute path="*" component={NotFound} />
      </Switch>
      <Footer />
      <Modal />
    </div>
  );
}

export default App;

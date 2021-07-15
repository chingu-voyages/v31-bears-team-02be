import * as React from "react";
import { useDispatch } from "react-redux";

import { setModalClose, setModalContent } from "../Modal/modalSlice";
import { setSignedInUser, setSignedInUserId } from "../App/authSlice";
import credentials from "../../services/credentials";
import ls from "../../services/localStorage";
import "./SignUpForm.css";

const validatePassword = (password) => {
  if (password.length < 8) {
    return "Password must be longer than 8 characters";
  }
  if (password.length > 72) {
    return "Password must be less than 72 characters";
  }
  return null;
};

const validateUsername = (username) => {
  if (username.length > 72) {
    return "Username must be less than 72 characters";
  }
  return null;
};

const SignUpForm = () => {
  const [username, setUsername] = React.useState("");
  const [usernameFeedback, setUsernameFeedback] = React.useState("");
  const [usernameTouched, setUsernameTouched] = React.useState("");

  const [password, setPassword] = React.useState("");
  const [passwordFeedback, setPasswordFeedback] = React.useState("");
  const [passwordTouched, setPasswordTouched] = React.useState(false);

  const [requesting, setRequesting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const dispatch = useDispatch();

  React.useEffect(() => {
    setPasswordFeedback(validatePassword(password));
    setUsernameFeedback(validateUsername(username));
  }, [username, password]);

  return (
    <form
      className="signup"
      onSubmit={async (e) => {
        e.preventDefault();
        // create object with methods to handle storage and credentials
        const newUser = {
          ...ls("artguessr"),
          ...credentials({
            username: username.trim(),
            password: password.trim(),
          }),
        };
        // Clear any lingering errors
        if (errorMsg) setErrorMsg("");

        try {
          // Set requesting state to true
          setRequesting(true);
          // Make post request to endpoint
          const newUserData = await newUser.postNewUser();

          if (newUserData instanceof Error) {
            if (newUserData.message === "Username is already taken") {
              setRequesting(false);
              setUsernameFeedback(newUserData.message);
            } else {
              throw newUserData;
            }
          } else {
            // Proceed to sign in new user
            // Get JWT token from api
            const newToken = await newUser.getToken();

            if (newToken instanceof Error) {
              throw newToken;
            } else if (!newToken) {
              throw new Error("Authentication error, try again later.");
            } else {
              // Store token in local storage
              newUser.setItem(newToken.authToken);
              // Grab username from stored token key
              const { sub, user_id } = await newUser.decodeUserData();
              // Save username of signed up user in state
              dispatch(setSignedInUser(sub));
              dispatch(setSignedInUserId(user_id));
              // Signal request is done
              setRequesting(false);
              // Close modal
              dispatch(setModalClose());
            }
          }
        } catch (error) {
          setRequesting(false);
          setErrorMsg(error.message);
        }
      }}
    >
      <fieldset className="stack">
        <legend>
          <h2>Sign Up</h2>
        </legend>
        <p>
          Enter a username and password to create an account. Usernames are
          unique and passwords must be longer than 8 characters.
        </p>
        {errorMsg && <aside>{`Error: ${errorMsg}`}</aside>}
        {requesting && (
          <aside>
            <p>Loading...</p>
          </aside>
        )}
        <label htmlFor="username">
          <p>Username</p>
          <input
            required
            name="username"
            type="text"
            onChange={({ target: { value } }) => {
              setUsername(value);
              if (!usernameTouched) setUsernameTouched(true);
            }}
          />
          {usernameFeedback && usernameTouched && <p>{usernameFeedback}</p>}
        </label>
        <label htmlFor="password">
          <p>Password</p>
          <input
            required
            name="password"
            type="text"
            pattern=".{8,}"
            onChange={({ target: { value } }) => {
              setPassword(value);
              if (!passwordTouched) setPasswordTouched(true);
            }}
          />
          {passwordFeedback && passwordTouched && <p>{passwordFeedback}</p>}
        </label>
      </fieldset>
      <fieldset>
        <button type="submit">Submit</button>
        <button
          type="button"
          onClick={() => {
            dispatch(setModalContent("SIGNINFORM"));
          }}
        >
          I have an account
        </button>
      </fieldset>
    </form>
  );
};

export default SignUpForm;

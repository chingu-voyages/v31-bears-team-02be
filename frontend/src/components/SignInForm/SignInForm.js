import * as React from "react";
import { useDispatch } from "react-redux";
import { setModalClose, setModalContent } from "../Modal/modalSlice";
import { setSignedInUser, setSignedInUserId } from "../App/authSlice";
import credentials from "../../services/credentials";
import ls from "../../services/localStorage";
import "./SignInForm.css";

const SignInForm = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [requesting, setRequesting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const dispatch = useDispatch();

  return (
    <form
      className="signin"
      onSubmit={async (e) => {
        e.preventDefault();
        // create object with methods to handle storage and credentials
        const user = {
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
          // Get JWT token from api
          const token = await user.getToken();

          if (token instanceof Error) {
            throw token;
          } else if (!token) {
            throw new Error("Authentication error, try again later.");
          } else {
            // Store token in local storage
            user.setItem(token.authToken);
            // Grab username from stored token key
            const userData = await user.decodeUserData();
            console.log(userData); // {user_id: 1, iat: 1626128125, sub: "joel"}
            // Save username of signed up user in state
            dispatch(setSignedInUser(userData.sub));
            dispatch(setSignedInUserId(userData.user_id));
            // Signal request is done
            setRequesting(false);
            // Close modal
            dispatch(setModalClose());
          }
        } catch (error) {
          setRequesting(false);
          setErrorMsg(error.message);
        }
      }}
    >
      <fieldset>
        <legend className="mb-4">
          <h2>Sign In</h2>
        </legend>
        <p className="max-w-prose mx-auto">Enter your information to log in.</p>
        {errorMsg && <aside className="mx-auto">{`Error: ${errorMsg}`}</aside>}
        {requesting && (
          <aside className="mx-auto">
            <p>Loading...</p>
          </aside>
        )}
        <div className="flex flex-col items-center w-3/4 mx-auto my-4">
          <label className="w-full" htmlFor="username">
            <p className="text-xl ssf font-semibold">Username</p>
            <input
              name="username"
              required
              type="text"
              className="w-full text-2xl ssf font-bold"
              onChange={({ target: { value } }) => {
                setUsername(value);
              }}
            />
          </label>
          <label className="w-full" htmlFor="password">
            <p className="text-xl ssf font-semibold">Password</p>
            <input
              name="password"
              required
              type="password"
              className="w-full text-2xl ssf font-bold"
              onChange={({ target: { value } }) => {
                setPassword(value);
              }}
            />
          </label>
        </div>
      </fieldset>
      <fieldset className="space-x-10">
        <button className="text-xl ssf font-semibold" type="submit">
          Sign In
        </button>
        <button
          type="button"
          className="text-xl ssf font-semibold"
          onClick={() => {
            dispatch(setModalContent("SIGNUPFORM"));
          }}
        >
          I don't have an account
        </button>
      </fieldset>
    </form>
  );
};

export default SignInForm;

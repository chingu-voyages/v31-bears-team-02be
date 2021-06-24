import * as React from 'react';
import { useDispatch } from 'react-redux';
import { setModalClose, setModalContent } from '../Modal/modalSlice';
import { setSignedInUser } from '../App/authSlice';
import credentials from '../../services/credentials';
import ls from '../../services/localStorage';
import './SignInForm.css';

const SignInForm = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [requesting, setRequesting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  const dispatch = useDispatch();

  return (
    <form
      className="signin"
      onSubmit={async (e) => {
        e.preventDefault();
        // create object with methods to handle storage and credentials
        const user = {
          ...ls('artguessr'),
          ...credentials({ username: username.trim(), password: password.trim() })
        }

        // Clear any lingering errors
        if (errorMsg) setErrorMsg('');

        try {
          // Set requesting state to true
          setRequesting(true);
          // Get JWT token from api
          const token = await user.getToken();

          if (token instanceof Error) {
            throw token;
          } else if (!token) {
            throw new Error('Authentication error, try again later.')
          } else {
            // Store token in local storage
            user.setItem(token.authToken);
            // Grab username from stored token key
            const { sub } = await user.decodeUserData();
            // Save username of signed up user in state
            dispatch(setSignedInUser(sub));
            // Signal request is done
            setRequesting(false);
            // Close modal
            dispatch(setModalClose());
          }
        } catch (error) {
          setRequesting(false);
          setErrorMsg(error.message);
        }
      }}>
      <fieldset className="">
        <legend><h2>Sign In</h2></legend>
        <p>Enter your information to log in.</p>
        {errorMsg && <aside>{`Error: ${errorMsg}`}</aside>}
        {requesting && <aside><p>Loading...</p></aside>}
        <label htmlFor="username">
          <p>
            Username
          </p>
          <input
            name="username"
            required
            type="text"
            onChange={({ target: { value } }) => {
              setUsername(value);
            }} />
        </label>
        <label htmlFor="password">
          <p>
            Password
          </p>
          <input
            name="password"
            required
            type="text"
            onChange={({ target: { value } }) => {
              setPassword(value);
            }}
          />
        </label>
      </fieldset>
      <fieldset>
        <button type="submit">Sign In</button>
        <button
          type="button"
          onClick={() => {
            dispatch(setModalContent('SIGNUPFORM'));
          }}
        >
          I don't have an account
        </button>
      </fieldset>
    </form>
  );
}

export default SignInForm;

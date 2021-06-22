import * as React from 'react';
import { useDispatch } from 'react-redux';

import { setModalClose } from '../Modal/modalSlice';
import { setSignedInUser } from '../App/authSlice';
import credentials from '../../services/credentials';
import ls from '../../services/localStorage';

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

const validatePassword = (password) => {
  if (password.length < 8) {
    return 'Password must be longer than 8 characters';
  }
  if (password.length > 72) {
    return 'Password must be less than 72 characters';
  }
  if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
    return 'Password must contain one upper case, lower case, number and special character';
  }
  return null;
}

const validateUsername = (username) => {
  if (username.length > 72) {
    return 'Password must be less than 72 characters';
  }
  return null;
}

const SignUpForm = () => {
  const [username, setUsername] = React.useState('');
  const [usernameFeedback, setUsernameFeedback] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordFeedback, setPasswordFeedback] = React.useState('');

  const dispatch = useDispatch();

  React.useEffect(() => {
    setPasswordFeedback(validatePassword(password));
    setUsernameFeedback(validateUsername(username));
  }, [username, password])

  return (
    <form onSubmit={async (e) => {
      e.preventDefault();

      const newUser = {
        ...ls('artguessr'),
        ...credentials({ username, password })
      }

      const newUserData = await newUser.postNewUser();

      if (newUserData) {
        const newToken = await newUser.getToken();
        newUser.setItem(newToken);
        const { sub } = await newUser.decodeUserData();
        dispatch(setSignedInUser(sub));
        dispatch(setModalClose());
      } else {
        console.error('Something went wrong');
      }
    }}>
      <fieldset>
        <label htmlFor="username">
          <p>
            Username
          </p>
          <input name="username"
            required
            type="text"
            onChange={({ target: { value } }) => {
              setUsername(value);
            }} />
          {usernameFeedback && <p>{usernameFeedback}</p>}
        </label>
        <label htmlFor="password">
          <p>
            Password
          </p>
          <input
            required
            name="password"
            type="text"
            onChange={({ target: { value } }) => {
              setPassword(value);
            }}
          />
          {passwordFeedback && <p>{passwordFeedback}</p>}
        </label>
      </fieldset>
      <fieldset>
        <button type="submit">Submit</button>
      </fieldset>
    </form>
  );
}

export default SignUpForm;
import * as React from 'react';

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

const SignUpForm = () => {
  const [username, setUsername] = React.useState('');
  const [usernameFeedback, setUsernameFeedback] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordFeedback, setPasswordFeedback] = React.useState('');
  return (
    <form>
      <fieldset>
        <label htmlFor="username">
          <p>
            Username
          </p>
          <input name="username"
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
          <input name="password" type="text" />
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
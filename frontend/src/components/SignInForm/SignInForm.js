import * as React from 'react';
import { useDispatch } from 'react-redux';
import { setModalClose } from '../Modal/modalSlice';
import { setSignedInUser } from '../App/authSlice';
import credentials from '../../services/credentials';
import ls from '../../services/localStorage';

const SignInForm = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const dispatch = useDispatch();

  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      const user = {
        ...ls('artguessr'),
        ...credentials({ username, password })
      }
      const token = await user.getToken();
      user.setItem(token);
      const { sub } = await user.decodeUserData();
      dispatch(setSignedInUser(sub));
      dispatch(setModalClose());
    }}>
      <fieldset>
        <label>
          Username
          <input
            type="text"
            onChange={({ target: { value } }) => {
              setUsername(value);
            }} />
        </label>
        <label>
          Password
          <input
            type="text"
            onChange={({ target: { value } }) => {
              setPassword(value);
            }}
          />
        </label>
      </fieldset>
      <fieldset>
        <button type="submit">Submit</button>
      </fieldset>
    </form>
  );
}

export default SignInForm;

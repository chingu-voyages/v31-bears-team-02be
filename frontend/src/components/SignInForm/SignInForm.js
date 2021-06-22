import * as React from 'react';

const SignInForm = () => {
  return (
    <form>
      <fieldset>
        <label>
          Username
          <input type="text"/>
        </label>
        <label>
          Password
          <input type="text"/>
        </label>
      </fieldset>
    </form>
  );
}

export default SignInForm;

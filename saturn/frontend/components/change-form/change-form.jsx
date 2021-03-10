import React from 'react';
import Cookies from 'js-cookie'


const ChangeForm = ({modelObj}) => {
  const csrftoken = Cookies.get('csrftoken');

  return (
    <form action={'/saturn/sandbox/dummyuser/2/change/'} method={'post'}>
    <div>
      <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken}/>
      <label htmlFor="username">Username</label>
      <input type="text" id={'username'} name={'username'}/>
    </div>
      <button type={'submit'}>Submit</button>
    </form>
  );
};

export default ChangeForm;

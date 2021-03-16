 import {useState} from 'react'

const Signup = () => {

  return (
    <>
      <label>Enter your Email</label>
      <input type="text" placeholder="Email" />
      <label>Choose a Password</label>
      <input type="text" placeholder="Password" />
      <label>Confirm your Password</label>
      <input type="text" placeholder="Confirm your password" />
      <label>Enter your First Name</label>
      <input type="text" placeholder="First name" />
      <label>Choose a Surname</label>
      <input type="text" placeholder="Surname" />
      <label>Enter your Date of Birth</label>
      <input
        type="date"
        id="start"
        name="date-of-birth"
        min="1900-01-01"
        max="2020-12-31"
      />
      <button type="submit">Submit</button>
    </>
  );
};

export default Signup;

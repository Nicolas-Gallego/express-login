import { useState, useEffect } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState("");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    setFormValid(false);
    let verifEmail = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/.test(
      email
    );
    if (
      verifEmail &&
      password.length >= 8 &&
      confirmPassword === password &&
      firstName.length > 0 &&
      surname.length > 0 &&
      birthday.length === 10
    ) {
      console.log("OK");
      setFormValid(true);
    } else console.log("something is wrong");
  }, [email, password, confirmPassword, firstName, surname, birthday]);

  const signup = () => {
    fetch("http://localhost:8000/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: email,
        firstName: firstName,
        surname: surname,
        password: password,
        confirmPassword: confirmPassword,
        birthday: birthday,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setError(response.error);
        console.log(response.error);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <label>Enter your Email</label>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name="email"
          />
          <label>Choose a Password</label>
          <input
            type="password"
            className="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            name="password"
          />
          <small>Password must contain at least 1 number,<br></br> 1 uppercase and be 8 characters long.</small>
          <label>Confirm your Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            name="confirmPassword"
          />
          <label>Enter your First Name</label>
          <input
            type="text"
            placeholder="First name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            name="firstName"
          />
          <label>Choose a Surname</label>
          <input
            type="text"
            placeholder="Surname"
            onChange={(e) => {
              setSurname(e.target.value);
            }}
            name="surname"
          />
          <label>Enter your Date of Birth</label>
          <input
            type="date"
            id="start"
            name="date-of-birth"
            min="1900-01-01"
            max="2020-12-31"
            onChange={(e) => {
              setBirthday(e.target.value);
            }}
            name="birthday"
          />
          <button
            type="submit"
            onClick={() =>
              formValid ? signup() : alert("Something is missing/wrong")
            }
          >
            Submit
          </button>
        </header>
      </div>
    </>
  );
};

export default Signup;

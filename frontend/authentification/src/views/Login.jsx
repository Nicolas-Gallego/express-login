import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginValid, setLoginValid] = useState(false);
  const [message, setMessage] = useState("")

  useEffect(() => {
    setLoginValid(false);
    let verifEmail = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/.test(
      email
    );
    if (verifEmail && password.length >= 8) {
      console.log("OK");
      setLoginValid(true);
    } else console.log("something is wrong");
  }, [email, password, loginValid]);

  const login = () => {
    fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    })
        .then((response) => {
            return response.json()
        })
        .then(response => {
            localStorage.setItem('token', response.token);
            setMessage(response.message)
            props.isConnected()
        })
        .catch((error) => {
            console.log(error)
        })
}

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
          <label>Enter your Password</label>
          <input
            type="password"
            className="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            name="password"
          />
          <button
            type="submit"
            onClick={() =>
              loginValid ? login() : alert("Something is missing/wrong")
            }
          >
            Login
          </button>
        </header>
      </div>
    </>
  );
};

export default Login;

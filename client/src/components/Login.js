import React, {useState} from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth'
import {useHistory} from 'react-router-dom'

const initialState = { 
  username: '',
  password: ''
}

const Login = () => {
  const {push} = useHistory()
  const [login, setLogin] = useState(initialState)

  // make a post request to retrieve a token from the api



  // when you have handled the token, navigate to the BubblePage route

  const handleChange = e => {
    e.preventDefault()
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    axiosWithAuth()
    .post('/api/login', login)
    .then(res => {
      // console.log(res.data.payload)
      localStorage.setItem('token', res.data.payload)
      push('/bubblepage')
    })
    .catch(err => {console.log(err)})
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
          <input
            label="Username"
            type="text"
            name="username"
            placeholder="username"
            value={login.username}
            onChange={handleChange}
          />
          <br />
          <input
            label="Password"
            type="password"
            name="password"
            placeholder="password"
            value={login.password}
            onChange={handleChange}
          />
          <br />
          <button>Log In</button>
        </form>
    </>
  );
};

export default Login;

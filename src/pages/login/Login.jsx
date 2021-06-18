import {  useContext ,useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

import axios from 'axios';
import Context from '../../context/Context';



export default function Login() {
    const userRef = useRef();
    const passwordRef = useRef();
    const {dispatch, isFetching } = useContext(Context);
    const [error,setError]=useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post("/auth/login", {
          username: userRef.current.value,
          password: passwordRef.current.value,
        });
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE" });
        setError(true);
      }
    };
  
    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form  className="loginForm" onSubmit={handleSubmit}>
                <label>Nom d'utilistateur</label>
                <input type="text" 
                className="loginInput" 
                placeholder="entrer votre Nom"
                ref={userRef}
                 />
                <label>Mot de passe</label>
                <input type="password" 
                className="loginInput"
                 placeholder="Password"
                 ref={passwordRef}
                  />
                <button className="loginButton" type="submit" disabled={isFetching}>Connexion</button>
                {error && <span style={{color:"red",marginTop:'10px',}}>Something went wrong!!</span>}
            </form>
            
            <button className="loginRegisterButton">
                <Link className="link" to="/register">Créer un compte</Link>
                </button>
        </div>
    )
}

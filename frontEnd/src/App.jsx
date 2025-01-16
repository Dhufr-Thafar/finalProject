import LoginPage from "./components/LoginPage";
import Twitter from "./components/Twitter";
import {useState} from "react";

import "./App.css";
export default function App() {
  function logout() {
    sessionStorage.removeItem("username")
    location.reload()
  }

  function login(username) {
    sessionStorage.setItem("username", username)
    location.reload()
  }

  return (
    <>
      {sessionStorage.getItem("username")== null ? (
        <LoginPage login={login}/>
      ) : (
        <Twitter logout={logout} />
      )}
    </>
  );
}

import LoginPage from "./components/LoginPage";
import Twitter from "./components/Twitter";
import {useState} from "react";

import "./App.css";
export default function App() {
  const [username, setUsername] = useState(null);

  function logout() {
    setUsername(null);
  }

  return (
    <>
      {username == null ? (
        <LoginPage setUsername={setUsername} />
      ) : (
        <Twitter username={username} logout={logout} />
      )}
    </>
  );
}

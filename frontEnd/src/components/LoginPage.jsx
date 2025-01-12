import { Form, Button } from "react-bootstrap";
import axios from "axios";
import {useState} from "react";

export default function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setError] = useState(false);

  const renderErrorText = () => {
    if (isError)
      return <div>Wrong user name or password</div>;
  }

  const formSubmit = async (e) => {
    e.preventDefault();
    const response = await axios
      .post("http://localhost:8081/api/users/login", {
        username : username,
        password : password,
      })
      .then((response) => {
        if (response.data.data == true) {
          props.setUsername(username);
          setError(false)
        } else {
          setError(true)
        }
      })
      .catch((error) => {
        setError(true)
      });

  };
  return (
    <>
      <Form onSubmit={formSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {renderErrorText()}      
        <Button type="submit">Login</Button>
      </Form>
    </>
  );
}

import { Button, Form } from "react-bootstrap";
import NavBar from "../components/NavBar";
import { useAuth } from "../contexts/FakeAuthContext";
import { useState } from "react";
import Footer from "../components/Footer";

function Login() {
  const { login, error } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    login(username, password);
    setUsername("");
    setPassword("");
  }
  return (
    <div className="off-white-style">
      <NavBar />
      <Form className="login-form light-style my-5" onSubmit={handleLogin}>
        <div className="text-center">
          <img
            src={require("../images/logo-picture-only.png")}
            alt="Logo alt"
            className="mb-3 logo-alt"
          />
          <h3 className="mb-3">Log in to continue</h3>
        </div>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username or email"
          className="mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          className="mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Form.Check type="checkbox" label="Remember me" className="mb-4" />
        <Button className="mb-4" variant="dark" type="submit">
          Login
        </Button>
        {error && <p>{error}</p>}
      </Form>
      <Footer />
    </div>
  );
}

export default Login;

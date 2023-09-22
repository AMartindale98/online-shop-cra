import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import NavDropdown from "./NavDropdown";
import { useProducts } from "../contexts/ProductsContext";
import { Badge, Button } from "react-bootstrap";
import { useAuth } from "../contexts/FakeAuthContext";

//we figured out how to do filters, now we'll need more. that might change the code but i'm confident you'll figure it out. currently we have a category filter, we probably also want a price filter. - THIS IS DONE.
//might not hurt to also have a sort option. sorting a-z, z-a, price ascending, price descending.

function NavBar() {
  const { cart } = useProducts();
  const { user, isAuthenticated, logout } = useAuth();

  function handleLogout() {
    alert("You have successfully logged out!");
    logout();
  }
  return (
    <Navbar expand="md" className="justify-content-start light-style">
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Container fluid>
          <Row className="d-flex align-items-center navbar-font">
            <Col xxl="1">
              <NavLink to="/">
                <Navbar.Brand className=" navbar navbar-brand-font">
                  <img
                    src={require("../images/logo.png")}
                    alt="Logo"
                    className="logo"
                  />
                </Navbar.Brand>
              </NavLink>
            </Col>

            <Col xxl="1" className="py-1">
              <NavLink
                to="/products"
                className=" text-decoration-none text-dark"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    className="bi bi-house-door px-1"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z" />
                  </svg>
                </span>
                Home
              </NavLink>
            </Col>
            <Col xxl="1" className="py-1">
              <NavLink
                to="/favorites"
                className=" text-decoration-none text-dark"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    className="bi bi-heart px-1"
                    viewBox="0 0 16 16"
                  >
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                  </svg>
                </span>
                Favorites
              </NavLink>
            </Col>
            <Col xxl="1" className="py-1">
              <NavLink
                to="/cart"
                className="text-decoration-none text-dark d-flex"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    className="bi bi-cart px-1"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                </span>
                Cart
                {cart.length > 0 ? (
                  <span className="d-flex align-items-start">
                    <Badge className="pill cart-pill" bg="danger">
                      {cart.length}
                    </Badge>
                  </span>
                ) : (
                  ""
                )}
              </NavLink>
            </Col>
            <Col></Col>
            <Col className=" d-flex justify-content-end">
              {isAuthenticated ? (
                <div className="login-module">
                  <Row className="fixed-row">
                    <Col xs="auto">
                      <p className="user-avatar">{user.name.slice(0, 1)}</p>
                    </Col>
                    <Col className="m-0 p-0">
                      <p>Welcome back, {user.name}!</p>
                    </Col>
                  </Row>
                  <Row
                    className="mt-0 d-flex justify-content-end logout-text"
                    onClick={handleLogout}
                  >
                    Logout
                  </Row>
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className=" text-decoration-none text-dark login-text"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    class="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                  </svg>
                  Login
                </NavLink>
              )}
            </Col>
            <Col xxl="4" className="justify-content-end">
              <Form className="p-2">
                <NavDropdown />
              </Form>
            </Col>
          </Row>
        </Container>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;

import { useProducts } from "../contexts/ProductsContext";
import SingleProduct from "../components/SingleProduct";
import NavBar from "../components/NavBar";
import { Row, Col } from "react-bootstrap";
import { useAuth } from "../contexts/FakeAuthContext";
import Footer from "../components/Footer";

function Favorites() {
  const { favorites } = useProducts();
  const { isAuthenticated } = useAuth();
  console.log(favorites);
  return (
    <div>
      <NavBar />
      <div className="favorites off-white-style pt-5">
        <Row className="d-flex align-items-center mb-4 row-box py-2">
          <Col md="auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-heart-fill heart-icon"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
              />
            </svg>
          </Col>
          <Col>
            <h1>My Favorites</h1>
          </Col>
        </Row>
        <Row className="d-flex justify-content-evenly mx-4">
          {favorites.length > 0 ? (
            favorites.map((favorite) => (
              <SingleProduct product={favorite} key={favorite.id} />
            ))
          ) : isAuthenticated ? (
            <h3 className="mx-4">No favorited items yet</h3>
          ) : (
            <h3>Please login to access favorited items</h3>
          )}
        </Row>
      </div>

      <Footer />
    </div>
  );
}

export default Favorites;

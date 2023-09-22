import { Col, Card, Badge, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../contexts/ProductsContext";
import { useAuth } from "../contexts/FakeAuthContext";

function SingleProduct({ product }) {
  const { dispatch, favorites } = useProducts();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <Col className="py-3" lg="auto">
      <Card className="product-card">
        {isAuthenticated && favorites.includes(product) ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-heart-fill heart-icon"
            viewBox="0 0 16 16"
            onClick={() =>
              dispatch({ type: "products/unfavorited", payload: product.id })
            }
          >
            <path
              fill-rule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-heart heart-icon"
            viewBox="0 0 16 16"
            onClick={() => {
              isAuthenticated
                ? dispatch({ type: "products/favorited", payload: product })
                : navigate("/login");
            }}
          >
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
          </svg>
        )}

        <Card.Img variant="top" src={product.image} className="card-img py-3" />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>Price: ${Number(product.price).toFixed(2)}</Card.Text>
          <div>
            <span className="px-2">
              <Badge bg="secondary">{product.category}</Badge>
            </span>
            <span>
              <Badge bg="secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  fill="currentColor"
                  className="bi bi-star mb-1"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                </svg>{" "}
                {product.rating.rate} by {product.rating.count} users
              </Badge>
            </span>
          </div>
          <Link to={`/products/product-id=${product.id}`} replace={true}>
            <Button
              variant="success"
              className="mt-4"
              onClick={() =>
                dispatch({ type: "products/current", payload: product })
              }
            >
              View item
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default SingleProduct;

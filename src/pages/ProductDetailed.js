import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useProducts } from "../contexts/ProductsContext";
import { Button, Card, Badge } from "react-bootstrap";
import Footer from "../components/Footer";

function ProductDetailed() {
  const { currentProduct, dispatch, favorites, error } = useProducts();

  function handleAddCart() {
    dispatch({ type: "cart/productAdded", payload: currentProduct });
  }

  return (
    <>
      <NavBar />
      <div className="text-center py-3 off-white-style pb-5">
        <Link to="/products" className="text-decoration-none return-text">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-return-left mx-2"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"
            />
          </svg>
          Return to all products
        </Link>
        {error ? (
          <p>{error}</p>
        ) : (
          <Card className="detailed-product-card mt-3">
            <Card.Header className="fw-bold fs-3">
              {favorites.includes(currentProduct) ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-heart-fill heart-icon-detailed"
                  viewBox="0 0 16 16"
                  onClick={() =>
                    dispatch({
                      type: "products/unfavorited",
                      payload: currentProduct.id,
                    })
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
                  className="bi bi-heart heart-icon-detailed"
                  viewBox="0 0 16 16"
                  onClick={() =>
                    dispatch({
                      type: "products/favorited",
                      payload: currentProduct,
                    })
                  }
                >
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                </svg>
              )}
              {currentProduct.title}
            </Card.Header>
            <Card.Body>
              <Card.Img
                src={currentProduct.image}
                alt={currentProduct.title}
                className="detailed-product-img"
              />
              <Card.Text className="pt-4 fw-bold fs-5">
                ${Number(currentProduct.price).toFixed(2)}
              </Card.Text>
              <Card.Text className="pt-2">
                {currentProduct.description}
              </Card.Text>
              <div className="py-3">
                <span className="px-2">
                  <Badge bg="info" className="text-dark">
                    {currentProduct.category}
                  </Badge>
                </span>
                <span>
                  <Badge bg="warning" className="text-dark">
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
                    {currentProduct.rating.rate} by{" "}
                    {currentProduct.rating.count} users
                  </Badge>
                </span>
              </div>
              <div className="py-3" onClick={handleAddCart}>
                <Button variant="success">Add to cart</Button>
              </div>
            </Card.Body>
          </Card>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ProductDetailed;

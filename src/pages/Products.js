//object contains: title, description, category, id, image, price, rating and how many people rated
import Row from "react-bootstrap/esm/Row";
import { useProducts } from "../contexts/ProductsContext";
import Col from "react-bootstrap/esm/Col";
import LoadingSpinner from "../components/LoadingSpinner";
import NavBar from "../components/NavBar";
import SingleProduct from "../components/SingleProduct";
import { CloseButton, Button } from "react-bootstrap";
import SortDropdown from "../components/SortDropdown";
import Footer from "../components/Footer";

function Products() {
  const {
    products,
    isLoading,
    filteredProducts,
    searchInput,
    searchedProducts,
    sortedProducts,
    dispatch,
    error,
  } = useProducts();

  function handleClose() {
    dispatch({ type: "products/searched", payload: [] });
    dispatch({ type: "search/change", payload: "" });
    dispatch({ type: "search/complete" });
  }

  function handleSortClear() {
    dispatch({ type: "products/sorted", payload: [] });
    dispatch({ type: "products/loaded", payload: products });
    console.log("clicked");
  }

  return (
    <div className="off-white-style">
      <NavBar />
      {isLoading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : (
        <div className="ms-3">
          {searchInput ? (
            <Row className="d-flex align-items-center mt-3">
              <Col md="auto">
                <CloseButton onClick={handleClose} />
              </Col>
              <Col>
                <h1>Results for '{searchInput}'</h1>
              </Col>
            </Row>
          ) : (
            ""
          )}
          <Row>
            {filteredProducts.length === 0 &&
              searchedProducts.length === 0 &&
              sortedProducts.length === 0 &&
              !searchInput &&
              !error && (
                <Row className="py-2 my-5 d-flex align-items-center row-box">
                  <Col sm={5} lg={8} xxl={9} className="mx-4 me-5">
                    <h1 className=" text-start">All Products</h1>
                  </Col>
                  <SortDropdown />
                  <Button
                    className="sort-button btn-dark"
                    onClick={() => handleSortClear()}
                    disabled={searchInput ? true : false}
                  >
                    Clear sorting
                  </Button>
                </Row>
              )}
          </Row>
          <Row className="d-flex justify-content-center mx-4">
            {filteredProducts.length === 0 &&
              searchedProducts.length === 0 &&
              sortedProducts.length === 0 &&
              !searchInput &&
              !error &&
              products.map((product) => (
                <SingleProduct product={product} key={product.id} />
              ))}
            {filteredProducts.length > 0 &&
              !error &&
              filteredProducts.map((product) => (
                <SingleProduct product={product} key={product.id} />
              ))}
            {searchedProducts.length > 0 &&
              !error &&
              searchedProducts.map((product) => (
                <SingleProduct product={product} key={product.id} />
              ))}
            {sortedProducts.length > 0 &&
              !error &&
              sortedProducts.map((product) => (
                <SingleProduct product={product} key={product.id} />
              ))}
            {searchInput && searchedProducts.length === 0 && !error && (
              <h5 className="mb-5 mx-5 mt-2 pb-5">
                No results for your search query. Please try searching for
                another product.
              </h5>
            )}
            {error && <p>{error}</p>}
          </Row>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Products;

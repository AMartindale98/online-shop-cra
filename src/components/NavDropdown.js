import {
  DropdownButton,
  Dropdown,
  DropdownHeader,
  DropdownItem,
  InputGroup,
  Button,
  Form,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useProducts } from "../contexts/ProductsContext";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//TO DO AT SOME POINT: figure out how to get the search working if you use the enter key. DONE GIRL

function NavDropdown() {
  const {
    products,
    dispatch,
    searchInputProgress,
    searchInput,
    sortedProducts,
    filteredProducts,
  } = useProducts();

  const navigate = useNavigate();

  function handleClickCategory(e) {
    const currentFilter = e.target.textContent.toLowerCase();
    const filteredArray = products.filter(
      (product) => currentFilter === product["category"]
    );
    dispatch({ type: "products/filtered", payload: filteredArray });
  }

  function handleClickPrice(e) {
    const currentFilter = e.target.textContent;
    const filteredStr = currentFilter
      .replace("$", "")
      .replace("$", "")
      .replace("-", ",")
      .replace(/\s/g, "");
    const filteredArr = filteredStr.split(",");
    const arrWithNumbers = filteredArr.map((item) => Number(item));
    const finalFilteredArr = products.filter(
      (product) =>
        arrWithNumbers[0] <= product["price"] &&
        product["price"] <= arrWithNumbers[1]
    );
    dispatch({ type: "products/filtered", payload: finalFilteredArr });
    //console.log(finalFilteredArr);
  }

  const handleSearch = useCallback(() => {
    if (!searchInputProgress) return;

    const string = searchInputProgress.slice(1);
    const string2 = searchInputProgress.slice(0, 1).toUpperCase();
    const newSearchInput = string2 + string;
    dispatch({ type: "search/complete", payload: newSearchInput });

    const filteredArray = products.filter((product) =>
      product.title.includes(newSearchInput)
    );
    dispatch({ type: "products/searched", payload: filteredArray });
    dispatch({ type: "search/change", payload: "" });
    console.log(newSearchInput);
    navigate("/products");
  }, [dispatch, products, searchInputProgress, navigate]);

  function handleClear() {
    dispatch({ type: "products/filtered", payload: [] });
    console.log("clicked");
  }

  useEffect(
    function () {
      document.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {
          e.preventDefault();
          handleSearch();
        }
      });
    },
    [handleSearch]
  );

  return (
    <InputGroup>
      <DropdownButton
        title="Filters"
        id="dropdown-filters"
        variant="sort"
        disabled={sortedProducts.length > 0 || searchInput ? true : false}
      >
        <DropdownHeader>Item Categories</DropdownHeader>
        <Dropdown.Item onClick={(e) => handleClickCategory(e)}>
          Men's clothing
        </Dropdown.Item>
        <Dropdown.Item onClick={(e) => handleClickCategory(e)}>
          Women's clothing
        </Dropdown.Item>
        <Dropdown.Item onClick={(e) => handleClickCategory(e)}>
          Jewelery
        </Dropdown.Item>
        <Dropdown.Item onClick={(e) => handleClickCategory(e)}>
          Electronics
        </Dropdown.Item>
        <Dropdown.Divider />
        <DropdownHeader>Prices</DropdownHeader>
        <DropdownItem onClick={(e) => handleClickPrice(e)}>
          $0 - $25
        </DropdownItem>
        <DropdownItem onClick={(e) => handleClickPrice(e)}>
          $26 - $75
        </DropdownItem>
        <DropdownItem onClick={(e) => handleClickPrice(e)}>
          $76 - $100
        </DropdownItem>
        <DropdownItem onClick={(e) => handleClickPrice(e)}>
          $100 - $1000
        </DropdownItem>
      </DropdownButton>
      <Button
        variant="dark"
        onClick={handleClear}
        disabled={sortedProducts.length > 0 || searchInput ? true : false}
      >
        Clear filter
      </Button>

      <Form.Control
        type="text"
        placeholder={
          filteredProducts.length > 0 || sortedProducts.length > 0
            ? "Press clear to search for a product"
            : "Search for a product"
        }
        aria-label="Search"
        aria-describedby="search"
        value={searchInputProgress}
        onChange={(e) =>
          dispatch({
            type: "search/change",
            payload: e.target.value,
          })
        }
      />

      <NavLink to="/products">
        <Button
          id="search"
          variant="secondary"
          onClick={handleSearch}
          disabled={
            filteredProducts.length > 0 || sortedProducts.length > 0
              ? true
              : false
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-search py-1"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </Button>
      </NavLink>
    </InputGroup>
  );
}

export default NavDropdown;

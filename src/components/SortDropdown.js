import { DropdownButton, DropdownItem } from "react-bootstrap";
import { useProducts } from "../contexts/ProductsContext";

function SortDropdown() {
  const { products, dispatch, searchInput } = useProducts();
  function handleSortAz() {
    const azTitle = products.toSorted((a, b) => {
      const titleA = a.title;
      const titleB = b.title;
      if (titleA > titleB) {
        return 1;
      }
      if (titleB > titleA) {
        return -1;
      }

      return 0;
    });
    dispatch({ type: "products/sorted", payload: azTitle });
  }

  function handleSortZa() {
    const zaTitle = products.toSorted((a, b) => {
      const titleA = a.title;
      const titleB = b.title;
      if (titleA < titleB) {
        return 1;
      }
      if (titleB < titleA) {
        return -1;
      }

      return 0;
    });
    dispatch({ type: "products/sorted", payload: zaTitle });
  }

  function handleSortPriceHighLow() {
    const highLowPrice = products.toSorted((a, b) => {
      return b.price - a.price;
    });
    dispatch({ type: "products/sorted", payload: highLowPrice });
  }

  function handleSortPriceLowHigh() {
    const lowHighPrice = products.toSorted((a, b) => {
      return a.price - b.price;
    });
    dispatch({ type: "products/sorted", payload: lowHighPrice });
  }

  function handleSortRatingHighLow() {
    const highLowRating = products.toSorted((a, b) => {
      return b.rating.rate - a.rating.rate;
    });
    dispatch({ type: "products/sorted", payload: highLowRating });
  }

  function handleSortRatingLowHigh() {
    const lowHighRating = products.toSorted((a, b) => {
      return a.rating.rate - b.rating.rate;
    });
    dispatch({ type: "products/sorted", payload: lowHighRating });
  }

  return (
    <DropdownButton
      title="Sort by"
      className="sort-button"
      variant="sort"
      disabled={searchInput ? true : false}
    >
      <DropdownItem onClick={handleSortAz}>Product name: A-Z</DropdownItem>
      <DropdownItem onClick={handleSortZa}>Product name: Z-A</DropdownItem>
      <DropdownItem onClick={handleSortPriceHighLow}>
        Price: High to low
      </DropdownItem>
      <DropdownItem onClick={handleSortPriceLowHigh}>
        Price: Low to high
      </DropdownItem>
      <DropdownItem onClick={handleSortRatingHighLow}>
        Rating: High to low
      </DropdownItem>
      <DropdownItem onClick={handleSortRatingLowHigh}>
        Rating: Low to high
      </DropdownItem>
    </DropdownButton>
  );
}

export default SortDropdown;

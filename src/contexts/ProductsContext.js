import { createContext, useContext, useEffect, useReducer } from "react";

const ProductsContext = createContext();

const initialState = {
  isLoading: false,
  products: [],
  filteredProducts: [],
  searchedProducts: [],
  sortedProducts: [],
  currentProduct: {},
  cart: [],
  favorites: [],
  searchInputProgress: "",
  searchInput: "",
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "loading/complete":
      return { ...state, isLoading: false };
    case "products/loaded":
      return { ...state, isLoading: false, products: action.payload };
    case "products/filtered":
      return { ...state, filteredProducts: action.payload };
    case "products/searched":
      return { ...state, searchedProducts: action.payload };
    case "products/sorted":
      return { ...state, sortedProducts: action.payload };
    case "products/current":
      return { ...state, currentProduct: action.payload };
    case "products/favorited":
      return { ...state, favorites: [...state.favorites, action.payload] };
    case "products/unfavorited":
      return {
        ...state,
        favorites: state.favorites.filter(
          (favorite) => favorite.id !== action.payload
        ),
      };
    case "search/change":
      return { ...state, searchInputProgress: action.payload };
    case "search/complete":
      return { ...state, searchInput: action.payload };
    case "cart/productAdded":
      return { ...state, cart: [...state.cart, action.payload] };
    case "cart/productDeleted":
      return { ...state, cart: action.payload };
    case "error":
      return { ...state, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function ProductsProvider({ children }) {
  const [
    {
      products,
      isLoading,
      error,
      filteredProducts,
      searchedProducts,
      searchInputProgress,
      searchInput,
      sortedProducts,
      currentProduct,
      cart,
      favorites,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    async function fetchProducts() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        dispatch({ type: "products/loaded", payload: data });
        //   console.log(data);
      } catch {
        dispatch({
          type: "error",
          payload: "There was an error loading products. Please try again",
        });
      }
    }
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        isLoading,
        error,
        filteredProducts,
        searchedProducts,
        searchInputProgress,
        searchInput,
        sortedProducts,
        currentProduct,
        cart,
        favorites,
        dispatch,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined)
    throw new Error("ProductsContext was used outside of the ProductsProvider");
  return context;
}

export { ProductsProvider, useProducts };

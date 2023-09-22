import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  user: null,
  isAuthenticated: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: "",
      };
    case "logout":
      return { ...state, user: null, isAuthenticated: false, error: "" };
    case "error":
      return {
        ...state,
        error: "Incorrect username or password. Please try again.",
      };
    default:
      throw new Error("Unknown action");
  }
}

const USER = {
  name: "Ash",
  email: "ash@email.com",
  password: "123",
  photo: require("../images/fake-avatar.jpg"),
  error: "",
};

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const navigate = useNavigate();

  function login(email, password) {
    if (email === USER.email && password === USER.password) {
      dispatch({ type: "login", payload: USER });
      navigate("/products");
    } else
      dispatch({
        type: "error",
      });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, error, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside of the AuthProvider");
  return context;
}

export { AuthProvider, useAuth };

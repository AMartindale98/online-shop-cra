/*
stuff we wanna do/implement:
-bootstrap
  -navbar: pages maybe, definitely a search bar, shopping cart that leads to a shopping cart - done but need to finish navigation
  -cards for each product - done
  -footer i guess
-react/js/redux
  -reducer sorry not doing redux
    -shopping cart - need
    -products - done
    -search bar - done
    -filters for shopping homepage - done
  -api for products: https://fakestoreapi.com/. probs want to use context api and use effect hook for this. - done, used context api.
  -pages
    -homepage - done. need footer but whatevs
    -all products - done.
    -shopping cart page with components like things that have been added to the cart, the total price with shipping and taxes separately then that total, idk - done but uggo
    -probably a full product page when you click on a product - done
    -favorites page, could be combined with some of user info situation - done but ugly
    -could potentially have a featured and recommended page? up to you
    -could have a login feature with user authentication
  -other stuff
    -error handling: message component like in worldwise app is good basis
    -navigation which we def wanna practice. might need to check out worldwise to figure out how to implement this - i've started this process which should make it easier to implement when creating more pages.

    JUST ABOUT DONE. but if you want to check out more of the error handling you can. i just realized we're not really catching errors so most of the places where we might have an error it's not really working. idk. but it's pretty much good enough as is.
*/
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import { ProductsProvider } from "./contexts/ProductsContext";
import Homepage from "./pages/Homepage";
import LoadingSpinner from "./components/LoadingSpinner";
import { AuthProvider } from "./contexts/FakeAuthContext";

const Products = lazy(() => import("./pages/Products"));
const ProductDetailed = lazy(() => import("./pages/ProductDetailed"));
const Cart = lazy(() => import("./pages/Cart"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <ProductsProvider>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route index element={<Homepage />} />
                <Route path="products" element={<Products />} />
                <Route path="products/:id" element={<ProductDetailed />} />
                <Route path="cart" element={<Cart />} />
                <Route path="favorites" element={<Favorites />} />
                <Route path="login" element={<Login />} />
              </Routes>
            </Suspense>
          </ProductsProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

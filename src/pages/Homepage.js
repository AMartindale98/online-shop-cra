import { Button, DropdownButton } from "react-bootstrap";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

//she is not the prettiest. if we could update the logo to match whatever ends up in the navbar that might look better.

function Homepage() {
  return (
    <div>
      <NavBar />
      <div className="homepage py-3">
        <h1 className="text-white small-width py-2 mt-5 m-auto">
          one stop shop
        </h1>

        <h4 className="my-5 py-3 text-white">
          home of luxury, discounted goods and apparel. unbeatable deals with
          unmatchable quality
        </h4>
        <Link to="/products">
          <Button variant="dark">enter the shop</Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;

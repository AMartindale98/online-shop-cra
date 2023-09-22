import { Card, Row, Col } from "react-bootstrap";
import NavBar from "../components/NavBar";
import { useProducts } from "../contexts/ProductsContext";
import CurrentShoppingCart from "../components/CurrentShoppingCart";
import { useState } from "react";
import CartInfoForm from "../components/CartInfoForm";
import LoadingSpinner from "../components/LoadingSpinner";
import Footer from "../components/Footer";

//media queries should be good so sizing doesn't get wonky. stuff we wanna add before getting too deep into the cart component: purchase button in total summary. also want to be mindful that in order for purchase button to 'work' (we should take it to a confirmation page), we must have at least one product in the cart and the form must be submitted.

//stuff we need: product in cart functionality, form submission, purchase submission, tax calculation (api is https://api-ninjas.com/api/salestax), other calculations (shipping, subtotal, final total), confirmation page, badge for cart.

function Cart() {
  const { cart, isLoading } = useProducts();
  const [zipCode, setZipCode] = useState("");
  const [shipping, setShipping] = useState("");
  const [tax, setTax] = useState("");

  const cartSubTotal =
    cart.length === 1
      ? Number(cart[0]["price"])
      : cart.length > 1
      ? cart.reduce((acc, item) => {
          console.log(typeof acc, typeof item["price"]);
          let final = 0;
          if (typeof acc !== "number" && typeof acc !== "string") {
            final = acc["price"] + item["price"];
            return final;
          } else if (typeof acc === "object") {
            final = acc + item["price"];
            return final.toFixed(2);
          } else {
            final = Number(acc) + item["price"];
            return final.toFixed(2);
          }
        })
      : 0;

  const finalTotal =
    cartSubTotal * (Number(tax) / 100) +
    Number(cartSubTotal) +
    Number(shipping);

  return (
    <div>
      <NavBar />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="off-white-style py-5">
          <Row className="mx-2">
            <Col className="mt-3">
              <CartInfoForm
                tax={tax}
                setShipping={setShipping}
                setTax={setTax}
                zipCode={zipCode}
                setZipCode={setZipCode}
              />
            </Col>
            <Col className="d-flex flex-column align-items-end">
              <h1 className="mt-3 text-end">Your Shopping Cart</h1>
              {cart.length > 0 ? (
                cart.map((item) => (
                  <CurrentShoppingCart item={item} key={item.id} />
                ))
              ) : (
                <p className="mx-2 py-2 text-end">Cart is empty</p>
              )}
              <Col className="mt-5 d-flex justify-content-end">
                <Card className="total-card p-2">
                  <Card.Title className="py-2 px-1">Total Summary</Card.Title>
                  <Row className="py-2 px-2">
                    <Col className="text-start">
                      <Card.Text>Cart subtotal</Card.Text>
                    </Col>
                    <Col className="text-end">
                      <Card.Text>${cartSubTotal.toFixed(2)}</Card.Text>
                    </Col>
                  </Row>
                  <Row className="py-2 px-2">
                    <Col className="text-start">
                      <Card.Text>Tax</Card.Text>
                    </Col>
                    <Col className="text-end">
                      <Card.Text>
                        {tax
                          ? `${tax}%`
                          : "Complete information form to calculate tax"}
                      </Card.Text>
                    </Col>
                  </Row>
                  <Row className="py-2 px-2">
                    <Col className="text-start">
                      <Card.Text>Shipping</Card.Text>
                    </Col>
                    <Col className="text-end">
                      <Card.Text>
                        {shipping > 0
                          ? `$${shipping}`
                          : "Complete information form to calculate shipping"}
                      </Card.Text>
                    </Col>
                  </Row>
                  <Row className="py-2 px-2 mt-5">
                    <Col className="text-start">
                      <Card.Text>Total</Card.Text>
                    </Col>
                    <Col className="text-end">
                      <Card.Text>
                        {!cartSubTotal || !tax || !shipping
                          ? "Not yet calculated"
                          : `$${finalTotal.toFixed(2)}`}
                      </Card.Text>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Col>
          </Row>
          <Row className="my-4 mx-2"></Row>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Cart;

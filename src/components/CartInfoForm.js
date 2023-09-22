import { useState } from "react";
import { useProducts } from "../contexts/ProductsContext";
import { Card, Row, Col, Button, Form } from "react-bootstrap";
import LoadingSpinner from "./LoadingSpinner";

function CartInfoForm({ tax, setShipping, setTax, zipCode, setZipCode }) {
  const { dispatch, isLoading, cart } = useProducts();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [usState, setUsState] = useState("");
  const allStates = [
    "AL",
    "AK",
    "AS",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "DC",
    "FM",
    "FL",
    "GA",
    "GU",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MH",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "MP",
    "OH",
    "OK",
    "OR",
    "PW",
    "PA",
    "PR",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VI",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];
  /*
    useEffect(
      function () {
        async function getTax() {
          if (!zipCode) return;
          const res = await fetch(
            `https://api.api-ninjas.com/v1/salestax?zip_code=${zipCode}`,
            {
              headers: {
                "X-Api-Key": "tMlw/EIBb4r7/h9Ou2Im1Q==4wOPeJGYNWblVczN",
              },
            }
          );
          const data = await res.json();
          console.log(data);
          setTax(Number(data[0]["total_rate"]) * 100);
          console.log(tax);
        }
        getTax(zipCode);
      },
      [zipCode, tax]
    ); */

  function handleSubmit(e) {
    dispatch({ type: "loading" });
    e.preventDefault();
    setShipping(5.99);
    async function getTax() {
      if (!zipCode) return;
      const res = await fetch(
        `https://api.api-ninjas.com/v1/salestax?zip_code=${zipCode}`,
        {
          headers: {
            "X-Api-Key": "tMlw/EIBb4r7/h9Ou2Im1Q==4wOPeJGYNWblVczN",
          },
        }
      );
      const data = await res.json();
      console.log(data);
      setTax(Number(data[0]["total_rate"]) * 100);
      console.log(tax);
    }
    getTax(zipCode);
    setFirstName("");
    setLastName("");
    setAddress1("");
    setAddress2("");
    setCity("");
    setZipCode("");
    setUsState("");
    dispatch({ type: "loading/complete" });
  }
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="d-flex justify-content-end">
          <Card className="p-4 info-card">
            <Card.Title>Your Information</Card.Title>
            <Form>
              <Row className="py-2">
                <Col>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </Col>
                <Col>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </Col>
              </Row>
              <Row className="py-2">
                <Col>
                  <Form.Label>Address 1</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter address"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    required
                  />
                </Col>
              </Row>
              <Row className="py-2">
                <Col>
                  <Form.Label>Address 2</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Apartment, studio, or floor (optional)"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </Col>
              </Row>
              <Row className="py-2">
                <Col>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </Col>
                <Col>
                  <Form.Label>State</Form.Label>
                  <Form.Select
                    required
                    value={usState}
                    onChange={(e) => setUsState(e.target.value)}
                  >
                    <option placeholder="Choose your state"></option>
                    {allStates.map((state) => (
                      <option key={state}>{state}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Zip code</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter zip code"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    required
                  />
                </Col>
              </Row>
              <Button
                type="submit"
                className="mt-3"
                onClick={handleSubmit}
                disabled={cart.length === 0 ? true : false}
              >
                Submit
              </Button>
            </Form>
          </Card>
        </div>
      )}
    </>
  );
}

export default CartInfoForm;

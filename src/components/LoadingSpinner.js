import Spinner from "react-bootstrap/Spinner";

function LoadingSpinner() {
  return (
    <div className="spinner-div">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default LoadingSpinner;
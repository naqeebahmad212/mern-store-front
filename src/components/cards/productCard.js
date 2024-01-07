import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Rating } from "@mui/material";

function ProductCard({ product }) {
  return (
    <Card className="product-card" style={{ width: "15rem", margin: "10px" }}>
      <div style={{ height: "250px", overflow: "hidden" }}>
        <Card.Img
          className="w-100 "
          variant="top"
          src={product.images[0].url}
        />
      </div>
      <Card.Body>
        <h5>{product.name}</h5>
        <p className="p-0 m-0">Pkr {product.price}</p>
        <Rating name="read-only" value={product.ratings} />
      </Card.Body>
    </Card>
  );
}

export default ProductCard;

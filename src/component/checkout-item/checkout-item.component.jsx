import "./checkout-item.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({ cartItem }) => {
  const { id, name, imageUrl, price, quantity } = cartItem;
  const { changeQuantity, deleteItem } = useContext(CartContext);

  const incrementHandler = (id) => {
    console.log("increment");
    changeQuantity(id, "increment");
  };

  const decrementHandler = (id) => {
    changeQuantity(id, "decrement");
  };

  const deleteHandler = (id) => {
    deleteItem(id);
  };

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => decrementHandler(id)}>
          &#10094;
        </div>
        {quantity}
        <div className="arrow" onClick={() => incrementHandler(id)}>
          &#10095;
        </div>
      </span>
      <div className="price"> {price}</div>
      {/* onClick={() => deleteHandler(id)} */}
      <div className="remove-button" onClick={() => deleteHandler(id)}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;

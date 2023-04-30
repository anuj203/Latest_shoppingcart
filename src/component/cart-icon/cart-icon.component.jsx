import { ReactComponent as CartIconImage } from "../../shopping-bag.svg";
import "./cart-icon.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CartIcon = () => {
  // const [iscartIconClicked, setCartIconClick] = useState(false);

  const { setCartState, totalQuantity } = useContext(CartContext);

  const cartIconHandler = () => {
    setCartState((prevState) => {
      return !prevState;
    });
  };

  return (
    <div className="cart-icon-container" onClick={cartIconHandler}>
      <CartIconImage className="shopping-icon" />
      <span className="item-count">{totalQuantity}</span>
      {/* {iscartIconClicked && <CartDropDown />} */}
    </div>
  );
};

export default CartIcon;

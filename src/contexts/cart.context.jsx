import { createContext, useState } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setCartState: () => null,
  cartItem: [],
  addItemToCart: () => null,
  totalQuantity: 0,
  isCheckoutPage: false,
  setIsCheckout: () => null,
  changeQuantity: () => null,
  deleteItem: () => null,
  totalPrice: 0
});

export const CartContextProvider = ({ children }) => {
  const [isCartOpen, setCartState] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [isCheckoutPage, setIsCheckout] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const addItemToCart = (item) => {
    console.log("Heloo  from cart");
    const { id, name, imageUrl, price } = item;

    let isProductAreadyPresent = false;
    cartItem.forEach((value) => {
      if (value.id === id) {
        isProductAreadyPresent = true;
      }
    });
    let cartProducts = cartItem.map((value) => {
      if (value.id === id) {
        return {
          ...value,
          quantity: value.quantity + 1
        };
      } else {
        return value;
      }
    });

    if (!isProductAreadyPresent) {
      cartProducts = [
        ...cartProducts,
        { id, name, imageUrl, price, quantity: 1 }
      ];
    }

    let totalQuantity = cartProducts.reduce((total, value) => {
      return (total = total + value.quantity);
    }, 0);

    setTotalQuantity(totalQuantity);
    console.log(totalQuantity);
    setCartItem(cartProducts);

    let totalPrice = cartProducts.reduce((totalPrice, value) => {
      return (totalPrice = totalPrice + value.price * value.quantity);
    }, 0);

    setTotalPrice(totalPrice);
    console.log(cartProducts);
  };

  const changeQuantity = (id, value) => {
    let updateCartItem = cartItem.map((item) => {
      if (item.id === id) {
        if (value === "increment")
          return { ...item, quantity: item.quantity + 1 };
        else return { ...item, quantity: item.quantity - 1 };
      } else {
        return item;
      }
    });

    let totalQuantity = updateCartItem.reduce((total, value) => {
      return (total = total + value.quantity);
    }, 0);

    let totalPrice = updateCartItem.reduce((totalPrice, value) => {
      return (totalPrice = totalPrice + value.price * value.quantity);
    }, 0);

    setTotalPrice(totalPrice);

    setTotalQuantity(totalQuantity);

    setCartItem(updateCartItem);
  };

  const deleteItem = (id) => {
    let filterItem = cartItem.filter((value) => {
      if (value.id === id) return false;
      else return true;
    });

    let totalQuantity = filterItem.reduce((total, value) => {
      return (total = total + value.quantity);
    }, 0);

    let totalPrice = filterItem.reduce((totalPrice, value) => {
      return (totalPrice = totalPrice + value.price * value.quantity);
    }, 0);

    setTotalPrice(totalPrice);

    setTotalQuantity(totalQuantity);

    setCartItem(filterItem);
  };
  const value = {
    isCartOpen,
    setCartState,
    cartItem,
    addItemToCart,
    totalQuantity,
    isCheckoutPage,
    setIsCheckout,
    changeQuantity,
    deleteItem,
    totalPrice
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

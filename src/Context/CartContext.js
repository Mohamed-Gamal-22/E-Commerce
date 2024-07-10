import axios from "axios";
import { createContext } from "react";

export const CartContext = createContext();

export default function CartContextProvider(props) {
  const token = localStorage.getItem("userToken");

  function AddToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers: { token: token } }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  return (
    <CartContext.Provider value={{ AddToCart }}>
      {props.children}
    </CartContext.Provider>
  );
}

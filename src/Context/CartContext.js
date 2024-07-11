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

  async function clearCart() {
    let { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      { headers: { token: token } }
    );
    console.log("data deleted");
  }

  return (
    <CartContext.Provider value={{ AddToCart , clearCart}}>
      {props.children}
    </CartContext.Provider>
  );
}

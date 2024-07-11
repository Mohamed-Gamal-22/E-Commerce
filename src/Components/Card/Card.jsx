import React, { useContext, useEffect, useState } from "react";
import "./Card.module.css";
import axios from "axios";
import { CartContext } from "./../../Context/CartContext";

export default function Card() {
  const [products, setProducts] = useState([]);
  const { clearCart } = useContext(CartContext);

  async function getCardProducts() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: {
            token: `${localStorage.getItem("userToken")}`,
          },
        }
      );
      setProducts(data.data.products);
    } catch (error) {
      setProducts([]);
    }
  }

  useEffect(() => {
    getCardProducts();
  }, []);
  return (
    <>
      <h1 className="bg-dark text-white text-center text-uppercase fw-bold p-3 my-5">
        Card Items
      </h1>
      <div className="container">
        <div className="row">
          {products.length > 0 ? (
            products.map((product) => (
              <div className="col-xl-2 col-lg-3 col-md-4" key={product._id}>
                <div className="item p-2 border border-2 border-success rounded ">
                  <img
                    src={product.product.imageCover}
                    className="w-100"
                    alt=""
                  />
                  <h6>{product.product.title} of 5.0</h6>
                  <h6 className="d-flex fw-bold justify-content-between align-items-center">
                    count : {product.count}{" "}
                    <div>
                      {" "}
                      <i className="fas fa-plus bg-dark p-2 mx-3 text-white cursor-pointer rounded-circle"></i>
                      <i className="fas fa-minus bg-dark p-2 text-white cursor-pointer rounded-circle"></i>
                    </div>
                  </h6>
                  <h6>price : {product.price}</h6>
                  <h6>rate : {product.product.ratingsAverage} of 5.0</h6>
                  <button className="btn btn-danger w-100">delete</button>
                </div>
              </div>
            ))
          ) : (
            <h2 className="text-dark text-center my-2">
              no cart item yet to show!
            </h2>
          )}
        </div>
        <div
          onClick={() => {
            clearCart();
            getCardProducts();
          }}
          className="btn btn-outline-danger py-3 my-3 w-100"
        >
          clear all products
        </div>
      </div>
    </>
  );
}

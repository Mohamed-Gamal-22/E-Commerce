import React, { useContext } from "react";
import "./Products.module.css";
import { useQuery } from "react-query";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

// import Swal from "sweetalert2";

export default function Products() {
  const { AddToCart } = useContext(CartContext);

  async function addProduct(productid) {
    let res = await AddToCart(productid);
    console.log(res);

    if (res.data.status === "success") {
      toast.success("Product Add Successfully", {
        duration: 4000,
        icon: "😍",
      });
    } else {
      toast.error("Error While Adding Product", {
        duration: 4000,
        icon: "💔😞",
      });
    }

    // if (res.data.status === "success") {
    //   Swal.fire({
    //     position: "center",
    //     icon: "success",
    //     title: res.data.message,
    //     showConfirmButton: false,
    //     timer: 2000,
    //   });
    // } else {
    //   Swal.fire({
    //     position: "center",
    //     icon: "error",
    //     title: res.data.message,
    //     showConfirmButton: false,
    //     timer: 1000,
    //   });
    // }
  }

  function getAllProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { isLoading, /*isFetching,*/ data /*, isError*/ } = useQuery(
    "allProducts",
    getAllProducts
  );

  // console.log(data?.data.data);
  // console.log("loading", isLoading);
  // console.log("fetching", isFetching);

  return (
    <>
      {isLoading ? (
        <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
          <Oval
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div className="container">
          <div className="row g-2">
            <>
              {data?.data.data.map((product) => (
                <div className="col-lg-2 col-md-3 col-sm-6" key={product.id}>
                  <div className="product overflow-hidden p-2 cursor-pointer">
                    <Link
                      to={`/productdetails/${product.id}`}
                      className="text-dark text-decoration-none"
                    >
                      <div>
                        <img
                          src={product.imageCover}
                          alt={product.title}
                          className="w-100"
                        />
                      </div>
                      <span className=" text-main small fw-bold">
                        {product.category.name}
                      </span>
                      <h3 className="h6">
                        {product.title.split(" ").slice(0, 2).join(" ")}
                      </h3>

                      <div className="d-flex justify-content-between align-items-center">
                        <span>{product.price} EGP</span>
                        <span>
                          <span>
                            <i className="fas fa-star  rating-color"></i>
                            {product.ratingsAverage}
                          </span>
                        </span>
                      </div>
                    </Link>
                    <div
                      onClick={() => addProduct(product.id)}
                      className="btn bg-main text-white w-100 text-center my-2"
                    >
                      Add To Card
                    </div>
                  </div>
                </div>
              ))}
            </>
          </div>
        </div>
      )}
    </>
  );
}

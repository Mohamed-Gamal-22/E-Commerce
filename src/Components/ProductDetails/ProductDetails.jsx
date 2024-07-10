import React from "react";
import "./ProductDetails.module.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
//https://ecommerce.routemisr.com/api/v1/products/6428de2adc1175abc65ca05b

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate()

  function getProduct(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { data } = useQuery("getProduct", () => getProduct(id));

  // console.log(data?.data.data);


  return (
    <>
      {data?.data.data ? (
        <div className="container">
          <Helmet>
            <title>{data?.data.data.title}</title>
          </Helmet>
          <div className="row align-items-center">
            <div className="col-md-4">
              <div className="img">
                <img
                  src={data?.data.data.imageCover}
                  alt={data?.data.data.description}
                  className="w-100"
                />
              </div>
            </div>
            <div className="col-md-8">
              <h2 className="fw-bold text-uppercase">
                {data?.data.data.title}
              </h2>
              <p>{data?.data.data.description}</p>
              <h6 className="text-main "> {data?.data.data.category.name}</h6>

              <div className="d-flex justify-content-between align-items-center">
                <h6> Price: {data?.data.data.price}</h6>
                <span>
                  {data?.data.data.ratingsAverage}{" "}
                  <i className="fas fa-star rating-color"></i>
                </span>
              </div>
              <div
                // onClick={() => addToCard(data?.data.data.id)}
                className="btn bg-main text-white w-100 text-center my-2"
              >
                Add To Card
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

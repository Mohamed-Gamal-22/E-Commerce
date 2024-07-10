import React, { useState } from "react";
import "./Register.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid } from "react-loader-spinner";
import Swal from "sweetalert2";

export default function Register() {
  const navigate = useNavigate();
  const [err, seterr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function registerSubmit(values) {
    setIsLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((err) => {
        seterr(err.response.data.message);
        setIsLoading(false);
      });

    if (data.message === "success") {
      setIsLoading(false);
      Swal.fire({
        icon: "success",
        title: "Congratulations, You Have Been Registerd Successfully!",
        text: "You Can Login Now 😍",
        timer: 3000,
      });
      navigate("/login");
    }
  }

  let phoneRegex = /^01[0125][0-9]{8}$/gm;

  let validationSchema = yup.object({
    name: yup
      .string()
      .min(3, "min char is 3")
      .max(10, "max chars is 10")
      .required(),
    email: yup.string().email("in valid email").required("email is required"),
    phone: yup
      .string()
      .matches(phoneRegex, "invalid phone number")
      .required("phone is required"),
    password: yup.string().required("passwrod si required").min(6),
    rePassword: yup
      .string()
      .required("rePasword is required")
      .oneOf([yup.ref("password")], "password and rePasword doesn't match"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: registerSubmit,
  });

  return (
    <>
      <div className="w-75 mx-auto my-5 p-3">
        <h1 className="fw-bold text-center my-2">Register Now</h1>

        <form onSubmit={formik.handleSubmit} className="mt-5">
          {err ? <div className="alert alert-danger">{err}</div> : ""}

          <div className="my-2">
            <label htmlFor="name">Name :</label>
            <input
              id="name"
              name="name"
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              className="form-control my-2"
            />
            {formik.errors.name && formik.touched.name ? (
              <div className="alert alert-danger p-2">{formik.errors.name}</div>
            ) : (
              ""
            )}
          </div>
          <div className="my-2">
            <label htmlFor="email">email :</label>
            <input
              id="email"
              name="email"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              className="form-control my-2"
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="alert alert-danger p-2">
                {formik.errors.email}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="my-2">
            <label htmlFor="phone">phone :</label>
            <input
              id="phone"
              name="phone"
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="tel"
              className="form-control my-2"
            />
            {formik.errors.phone && formik.touched.phone ? (
              <div className="alert alert-danger">{formik.errors.phone}</div>
            ) : (
              ""
            )}
          </div>
          <div className="my-2">
            <label htmlFor="password">password :</label>
            <input
              id="password"
              name="password"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              className="form-control my-2"
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="alert alert-danger p-2">
                {formik.errors.password}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="my-2">
            <label htmlFor="rePassword">Re-Password :</label>
            <input
              id="rePassword"
              name="rePassword"
              value={formik.values.rePassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              className="form-control my-2"
            />
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div className="alert alert-danger p-2">
                {formik.errors.rePassword}
              </div>
            ) : (
              ""
            )}
          </div>

          {isLoading ? (
            <button type="button" className="btn bg-main text-white text-white">
              <Grid
                visible={true}
                height="20"
                width="20"
                color="#fff"
                ariaLabel="grid-loading"
                radius="12.5"
                wrapperStyle={{}}
                wrapperClass="grid-wrapper"
              />
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn bg-main text-white"
            >
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}

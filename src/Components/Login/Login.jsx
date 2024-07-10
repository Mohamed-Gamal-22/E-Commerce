import React, { useContext, useState } from "react";
import "./Login.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid } from "react-loader-spinner";
import Swal from "sweetalert2";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
  const { setUserToken } = useContext(UserContext);

  const navigate = useNavigate();
  const [err, seterr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function LoginSubmit(values) {
    setIsLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((err) => {
        seterr(err.response.data.message);
        setIsLoading(false);
      });

    if (data.message === "success") {
      setIsLoading(false);
      Swal.fire({
        icon: "success",
        title: "You Almost at home Page!",
        text: "feel free in our website 😍",
        timer: 3000,
      });
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token)
      navigate("/");
    }
  }

  let validationSchema = yup.object({
    email: yup.string().email("in valid email").required("email is required"),
    password: yup.string().required("passwrod si required").min(6),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: LoginSubmit,
  });

  return (
    <>
      <div className="w-75 mx-auto my-5 p-3">
        <h1 className="fw-bold text-center my-2">Login Now</h1>

        <form onSubmit={formik.handleSubmit} className="mt-5">
          {err ? <div className="alert alert-danger">{err}</div> : ""}

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
              Login
            </button>
          )}
        </form>
      </div>
    </>
  );
}

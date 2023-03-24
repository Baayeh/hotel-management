import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Username Length is too short!")
    .max(50, "Username Length is too long!")
    .required("Username is Required!"),
  password: Yup.string()
    .min(8, "Password must be at least 8 character long!")
    .required("Password is required!"),
});

const initialValues = {
  username: "admin@gmail.com",
  password: "password",
};

const LoginForm = () => {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (values) => {
    if (values.username && values.password) {
      authenticate();
    }
  };

  const authenticate = () => {
    setloading(true);

    setTimeout(() => {
      setloading(false);
      navigate("/dashboard");
    }, 3000);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => {
        console.log(errors, touched);
        return (
          <Form className="w-[70%] mx-auto">
            <div className="form-group mb-5">
              <Field
                type="text"
                className={`form-control ${
                  errors.username && touched.username
                    ? "border-b border-red-500"
                    : ""
                }`}
                placeholder="Enter Username"
                name="username"
              />
              {errors.username && touched.username ? (
                <span className="block text-red-600 italic text-xs font-bold mt-1">
                  {errors.username}
                </span>
              ) : null}
            </div>

            <div className="form-group mb-8">
              <Field
                type="password"
                className={`form-control ${
                  errors.password && touched.password
                    ? "border-b border-red-500"
                    : ""
                }`}
                placeholder="Enter Password"
                name="password"
              />
              {errors.password && touched.password ? (
                <span className="d-block text-red-600 italic text-xs font-bold mt-1">
                  {errors.password}
                </span>
              ) : null}
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-primaryColor hover:bg-primaryColorDark px-10 py-3 text-white rounded-md text-sm flex items-center justify-center min-w-max mx-auto"
              >
                {loading ? "Authenticating..." : "Sign In"}
                {loading && (
                  <svg
                    className="animate-spin ml-2 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;

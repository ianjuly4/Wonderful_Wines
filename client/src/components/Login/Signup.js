import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";

function Signup() {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: yup.object().shape({
      username: yup.string().required("Must enter a username or email.").max(25),
      password: yup
        .string()
        .required("Must enter a password")
        .max(25)
    }),
    onSubmit: (values) => {
      fetch("signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((r) => r.json())
        .then((newUser) => {
          console.log("Submitted:", newUser);
        })
        .catch((error) => console.error("Error:", error));
      formik.resetForm();
    },
  });

  return (
    <div className="flex flex-col items-center p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Create An Account</h2> {/* Header */}
      
      <form onSubmit={formik.handleSubmit} className="w-full">
        {/* Username Input */}
        <div className="mb-4">
          <input
            type="text"
            name="username"
            placeholder="Username or Email"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-4 py-2 border-2 border-black squared-md"
          />
          {formik.touched.username && formik.errors.username && (
            <div className="text-red-500 mt-1 text-sm">{formik.errors.username}</div>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-4 py-2 border-2 border-black squared-md"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 mt-1 text-sm">{formik.errors.password}</div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="w-full py-2 bg-black text-white squared-md "
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;

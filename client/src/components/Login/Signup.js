import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";

function Signup(){
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
            formik.resetForm()
        },
      });
    

    return(
        <div className="p-4 rounded shadow-lg flex flex-col gap-4">
            <div className="flex gap-8">
            <div className="flex-1 w-[40%]">
            <input
                type="text"
                name="username"
                placeholder="Username or Email"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ border: "2px solid black", padding: "10px", width: "100%" }}
                />
            {formik.touched.username && formik.errors.username && (
            <div style={{ color: "black" }}>{formik.errors.username}</div>
            )}
            </div>
            </div>
            <div className="flex gap-8">
            <div className="flex-1 w-[40%]">
            <input
                type="text"
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ border: "2px solid black", padding: "10px", width: "100%" }}
                />
            {formik.touched.password && formik.errors.password && (
            <div style={{ color: "black" }}>{formik.errors.password}</div>
            )}
            </div>
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="submit" 
                onClick={formik.handleSubmit}
                style={{
                  padding: "10px",
                  border: "2px solid black",
                }}
              >
                Submit
              </button>
        </div>
      </div>
    )
}
export default Signup;
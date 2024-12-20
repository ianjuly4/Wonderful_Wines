import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function AddReview({ wineId }) {
  const [message, setMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      rating: "",
      comment: ""
    },
    validationSchema: yup.object().shape({
      rating: yup.number().positive().integer().required("Must enter a wine rating").typeError("Please enter an integer").max(5),
      comment: yup.string().required("Must enter a review comment").max(50),
    }),
    onSubmit: (values) => {
     
      fetch(`/reviews/${wineId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: values.rating,  
          comment: values.comment,  
        }),
      })
        .then((result) => {
          if (result.ok) {
            setMessage("Wine added successfully!");
          } else {
            result.json().then((data) => {
              setMessage(data.message || "An error occurred, please try again.");
            });
          }
        })
        .catch((error) => {
          setMessage("An unexpected error occurred.");
        });
      formik.resetForm();
    },
  });

  return (
    <div className="p-4 rounded shadow-lg flex flex-col gap-4">
      <div className="flex gap-8">
        <div className="flex-1 w-[40%]">
          <input
            type="text"
            name="comment"
            placeholder="New Wine Review Comment"
            value={formik.values.comment}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ border: "2px solid black", padding: "10px", width: "100%" }}
          />
          {formik.touched.comment && formik.errors.comment && (
            <div style={{ color: "black", fontSize: "12px" }}>{formik.errors.comment}</div>
          )}

          <input
            type="text"
            name="rating"
            placeholder="New Wine Rating"
            value={formik.values.rating}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ border: "2px solid black", padding: "10px", width: "100%" }}
          />
          {formik.touched.rating && formik.errors.rating && (
            <div style={{ color: "black", fontSize: "12px" }}>{formik.errors.rating}</div>
          )}
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
    </div>
  );
}

export default AddReview;

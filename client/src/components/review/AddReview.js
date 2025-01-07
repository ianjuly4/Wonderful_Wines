import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { MyContext } from "../MyContext";

function AddReview({ wineId }) {
  const [message, setMessage] = useState('');
  const { user, setUser } = useContext(MyContext);  

  const formik = useFormik({
    initialValues: {
      star_review: "",
      comment: ""
    },
    validationSchema: yup.object().shape({
      star_review: yup.number().positive().integer().required("Must enter a wine rating").typeError("Please enter an integer").max(5),
      comment: yup.string().required("Must enter a review comment").max(50),
    }),
    onSubmit: (values) => {
      fetch("/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          star_review: values.star_review,
          comment: values.comment,
          wine_id: wineId,
        }),
      })
        .then((result) => {
          if (result.ok) {
            setMessage("Wine Review added successfully!");
            
            
            result.json().then((newReview) => {
              const updatedUser = {
                ...user,
                reviews: [...user.reviews, newReview]  
              };
              setUser(updatedUser); 
            });
          } else {
            result.json().then((data) => {
              setMessage(data.message || "An error occurred, please try again.");
            });
          }
        })
        .catch((error) => {
          setMessage("An unexpected error occurred.");
        });

      formik.resetForm(); // Reset the form after submission
    },
  });

  return (
    <div className="p-4 rounded shadow-lg flex flex-col gap-4">
      <h3>{message}</h3>
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
            name="star_review"
            placeholder="New Wine Rating"
            value={formik.values.star_review}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ border: "2px solid black", padding: "10px", width: "100%" }}
          />
          {formik.touched.star_review && formik.errors.star_review && (
            <div style={{ color: "black", fontSize: "12px" }}>{formik.errors.star_review}</div>
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

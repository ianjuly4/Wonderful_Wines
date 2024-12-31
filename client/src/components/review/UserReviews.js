import React, { useContext, useState } from "react";
import { MyContext } from "../MyContext"; 
import { useFormik } from "formik";
import * as yup from "yup";
import DeleteReview from "./DeleteReview"; 

function UserReviews({ wineId, displayStarRating, userReview }) {
  const { user, wines, fetchWines } = useContext(MyContext); 
  const [message, setMessage] = useState("");

  const wine = wines.find((wine) => wine.id === parseInt(wineId));

  const wineReviews = wine ? wine.reviews : [];
  console.log(userReview.id)
  console.log(wineId)
  console.log(`username${user}`)
  
  const handleDeleteReview = (reviewId) => {
    fetch(`/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setMessage("Review deleted successfully!");
         
          fetchWines();
        } else {
          response.json().then((data) => {
            setMessage(data.message || "An error occurred, please try again.");
          });
        }
      })
      .catch((error) => {
        setMessage("An unexpected error occurred.");
      });
  };

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
      console.log("Submitting review:", values); 
    
      fetch(`/reviews/${userReview.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          star_review: values.star_review,
          comment: values.comment,
        }),
      })
      .then((result) => {
        if (result.ok) {
          setMessage("Review updated successfully!");
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
    }
  })    

  if (!wine) {
    return <div>Wine not found!</div>;
  }

  return (
    <div className="wine-detail">
      {/* Render Reviews */}
      <div className="reviews">
        <h3>{message}</h3>
        <h3>{user.username}'s Review</h3>
        {wineReviews.length > 0 ? (
          wineReviews.map((review) => (
            <div
              key={review.id}
              className="review flex justify-between border p-4 rounded-lg shadow-md mb-4"
              style={{
                border: "2px solid #ddd",
                padding: "16px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                marginBottom: "16px",
              }}
            >
              {/* Left side: review content */}
              <div className="flex-1">
                <p>
                  <strong>{review.user ? review.user.name : "Anonymous"}</strong>
                </p>

                <h5
                  className={`text-lg font-semibold mb-2 ${
                    review.star_review ? "text-yellow-400" : "text-black"
                  }`}
                >
                  {displayStarRating(review.star_review) || "No rating available"}
                </h5>

                <p>{review.comment}</p>
              </div>

              {/* Right side: Delete button */}
              <div className="ml-4">
                {review.user && review.user.id === user.id && (
                  <DeleteReview reviewId={review.id} onDelete={handleDeleteReview} />
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No reviews available for this wine.</p>
        )}
      </div>

      {/* Update Review Form */}
      <div className="p-4 rounded shadow-lg flex flex-col gap-4">
        <div className="flex gap-8">
          <div className="flex-1 w-[40%]">
            <input
              type="text"
              name="comment"
              placeholder="Update Wine Review Comment"
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
              placeholder="Update Wine Review Rating"
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
    </div>
  );
}

export default UserReviews;

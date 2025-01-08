import React, {useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";


function UserReviews({ displayStarRating, wine, user, userReview, setUser, fetchWines}) {
  const [message, setMessage] = useState('')

   const formSchema =
   yup.object().shape({
    star_review: yup.number().positive().integer().required("Must enter a wine rating").typeError("Please enter an integer").max(5),
    comment: yup.string().required("Must enter a review comment").max(50),
  })
    const formik = useFormik({
      initialValues: {
        star_review: userReview.star_review,
        comment: userReview.comment,
        wine_id: wine.id,
        user_id: user.id,
      },
      validationSchema: formSchema,
      onSubmit: (values) => {
       
        fetch(`/reviews/${userReview.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((result) => {
            if (result.ok) {
              console.log('postin')
              const updatedReviews = user.reviews.map((review) =>
                review.id === userReview.id ? { ...review, ...values } : review
              );
              setUser({ ...user, reviews: updatedReviews });
              fetchWines()
            } else {
              result.json().then((data) => {
                setMessage(data.message || "An error occurred, please try again.");
              });
            }
          })
          .catch((error) => {
            setMessage("An unexpected error occurred.");
          });
      },
    });

    const deleteReview = () => {
      fetch(`/reviews/${userReview.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.ok) {
          setMessage("Wine Review Deleted")
          const updatedReviews = user.reviews.filter(
            (review) => review.id !== userReview.id
          );
          setUser({ ...user, reviews: updatedReviews });
          fetchWines()
        } else {
          response.json().then((data) => {
            setMessage(data.message || "An error occurred while deleting the review.");
          });
        }
      })
      .catch((error) => {
        setMessage("An unexpected error occurred while deleting the review.");
      });
  };

  if (!wine) {
    return <div>Wine not found!</div>;
  }

  return (
      <div className="reviews">
        <h3>{message}</h3>
        <h3>{user.username}'s Review</h3>
        <div
  
          className="review flex justify-between border p-4 rounded-lg shadow-md mb-4"
        >
          {/* Left side: review content */}
          <div className="flex-1">
            <h5 className={`text-lg font-semibold mb-2 ${userReview.star_review ? "text-yellow-400" : "text-black"}`}>
              {displayStarRating(userReview.star_review) || "No rating available"}
            </h5>
            <p>{userReview.comment}</p>
          </div>

          {/* Right side: Delete button */}
          <div className="ml-4">
           <button 
            onClick={() => deleteReview(userReview.id)}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-black"
           >
            DELETE
            </button>
          </div>
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
              type="number"
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

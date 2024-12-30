import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";


function AddForm({ displayStarRating, user }) {
  const [message, setMessage] = useState("");  
  const [isUserNotLoggedIn, setIsUserNotLoggedIn] = useState(false);


  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      location: "",
      flavorProfile: "",
      price: "",
      image: "",
      rating: "",
      comment: ""
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Must enter a wine name").max(50),
      type: yup.string().required("Must enter a wine type").max(25),
      location: yup.string().required("Must enter a location").max(25),
      flavorProfile: yup.string().required("Must enter a flavor profile").max(500),
      price: yup.number().positive().integer().required("Must enter a price").typeError("Please enter an Integer").max(200),
      image: yup.string().url("Must be a valid URL").max(200),
      rating: yup.number().positive().integer().required("Must enter a wine rating").typeError("Please enter an integer").max(5),
      comment: yup.string().required("Must enter a review comment").max(50),
    }),
    onSubmit: (values) => {
     
      fetch("/wines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((result) => {
          if (result.ok) {
            setMessage("Wine added successfully!");
            formik.resetForm(); 
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

  
  const handleInputChange = (e) => {
    if (!user) {
      setIsUserNotLoggedIn(true); 
    } else {
      setIsUserNotLoggedIn(false); 
    }
    formik.handleChange(e);
  };

  
  useEffect(() => {
    if (user) {
      setMessage(""); 
    }
  }, [user]);

  return (
    <div className="p-4 rounded shadow-lg flex flex-col gap-4">
      {message && <div className="message">{message}</div>}
      
      {/* Show warning message if the user is not logged in */}
      {isUserNotLoggedIn && (
        <div className="warning-message" style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>
          You must be logged in to enter information in the form.
        </div>
      )}

      <div className="flex gap-8">
        <div className="flex-1 w-[40%]">
          <input
            type="text"
            name="name"
            placeholder="New Wine Name"
            value={formik.values.name}
            onChange={handleInputChange} 
            onBlur={formik.handleBlur}
            style={{
              border: "2px solid black", 
              padding: "10px", 
              width: "100%",
              pointerEvents: !user ? "none" : "auto" 
            }}
          />
          {formik.touched.name && formik.errors.name && (
            <div style={{ color: "black", fontSize: "12px" }}>{formik.errors.name}</div>
          )}

          <input
            type="text"
            name="type"
            placeholder="New Wine Type"
            value={formik.values.type}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            style={{
              border: "2px solid black", 
              padding: "10px", 
              width: "100%",
              pointerEvents: !user ? "none" : "auto" 
            }}
          />
          {formik.touched.type && formik.errors.type && (
            <div style={{ color: "black", fontSize: "12px" }}>{formik.errors.type}</div>
          )}

          <input
            type="text"
            name="location"
            placeholder="New Wine Location"
            value={formik.values.location}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            style={{
              border: "2px solid black", 
              padding: "10px", 
              width: "100%",
              pointerEvents: !user ? "none" : "auto" 
            }}
          />
          {formik.touched.location && formik.errors.location && (
            <div style={{ color: "black", fontSize: "12px" }}>{formik.errors.location}</div>
          )}

          <input
            type="text"
            name="flavorProfile"
            placeholder="New Wine Flavor Profile"
            value={formik.values.flavorProfile}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            style={{
              border: "2px solid black", 
              padding: "10px", 
              width: "100%",
              pointerEvents: !user ? "none" : "auto" 
            }}
          />
          {formik.touched.flavorProfile && formik.errors.flavorProfile && (
            <div style={{ color: "black", fontSize: "12px" }}>{formik.errors.flavorProfile}</div>
          )}

          <input
            type="number"
            name="price"
            placeholder="New Wine Price"
            value={formik.values.price}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            style={{
              border: "2px solid black", 
              padding: "10px", 
              width: "100%",
              pointerEvents: !user ? "none" : "auto" 
            }}
          />
          {formik.touched.price && formik.errors.price && (
            <div style={{ color: "black", fontSize: "12px" }}>{formik.errors.price}</div>
          )}

          <input
            type="number"
            name="rating"
            placeholder="New Wine Rating"
            value={formik.values.rating}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            style={{
              border: "2px solid black", 
              padding: "10px", 
              width: "100%",
              pointerEvents: !user ? "none" : "auto" 
            }}
          />
          {formik.touched.rating && formik.errors.rating && (
            <div style={{ color: "black", fontSize: "12px" }}>{formik.errors.rating}</div>
          )}

          <input
            type="text"
            name="comment"
            placeholder="New Wine Review Comment"
            value={formik.values.comment}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            style={{
              border: "2px solid black", 
              padding: "10px", 
              width: "100%",
              pointerEvents: !user ? "none" : "auto" 
            }}
          />
          {formik.touched.comment && formik.errors.comment && (
            <div style={{ color: "black", fontSize: "12px" }}>{formik.errors.comment}</div>
          )}

          <input
            type="text"
            name="image"
            placeholder="New Wine Image URL"
            value={formik.values.image}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            style={{
              border: "2px solid black", 
              padding: "10px", 
              width: "100%",
              pointerEvents: !user ? "none" : "auto" 
            }}
          />
          {formik.touched.image && formik.errors.image && (
            <div style={{ color: "black", fontSize: "12px" }}>{formik.errors.image}</div>
          )}
        </div>
        
        <div className="flex-1 w-[40%] border-2 border-gray-600 rounded-lg shadow-md">
          <div className="w-full h-full p-4 bg-white shadow-md rounded flex flex-col items-center">
            <h3 className="font-bold text-xl mb-2">{formik.values.name || ""}</h3>
            <h5 className="text-gray-700 text-base">{formik.values.type || ""}</h5>
            <img
              className="h-32 object-cover mt-2 mb-4"
              src={formik.values.image || ""}
              alt={formik.values.name || ""}
            />
            <h5 className="text-gray-600 text-sm">{formik.values.location || ""}</h5>
            <p className="text-gray-600 text-sm">{formik.values.flavorProfile || ""}</p>
            <p className="text-gray-600 text-sm">{formik.values.comment || ""}</p>

            {formik.values.rating && (
              <h5 className="text-lg font-semibold mt-2">{displayStarRating(formik.values.rating)}</h5>
            )}

            <h5 className="text-lg font-semibold mt-2">{formik.values.price || ""}</h5>
          </div>
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
          disabled={!user} 
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddForm;

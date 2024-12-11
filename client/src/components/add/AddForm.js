import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";

function AddForm({ displayStarRating, setUser }) {
  const [message, setMessage] = useState("");  
  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      location: "",
      flavorProfile: "",
      price: "",
      image: "",
      rating: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Must enter a wine name"),
      type: yup.string().required("Must enter a wine type"),
      location: yup.string().required("Must enter a location"),
      flavorProfile: yup.string().required("Must enter a flavor profile"),
      price: yup
        .number()
        .positive()
        .integer()
        .required("Must enter a price")
        .typeError("Please enter an Integer")
        .max(200),
      image: yup.string().max(200),
      rating: yup
        .number()
        .positive()
        .integer()
        .required("Must enter a wine rating")
        .typeError("please enter an integer")
        .max(5),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch("/wines", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const result = await response.json();
        
        if (response.ok) {
          setMessage("Wine added successfully!");
        } else {
          setMessage(result.message || "An error occurred, please try again.");
        }

      } catch (error) {
       
        setMessage("An unexpected error occurred.");
      }
      formik.resetForm();
    },
  });
    

    return(
        <div className="p-4 rounded shadow-lg flex flex-col gap-4">
          {message && <div className="message">{message}</div>}
        <div className="flex gap-8">
            <div className="flex-1 w-[40%]">
            <input
                type="text"
                name="name"
                placeholder="New Wine Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ border: "2px solid black", padding: "10px", width: "100%" }}
                />
            {formik.touched.name && formik.errors.name && (
            <div style={{ color: "black" }}>{formik.errors.name}</div>
            )}

                <input
                    type="text"
                    name="type"
                    placeholder="New Wine Type"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{ border: "2px solid black", padding: "10px", width: "100%" }}
                />
            {formik.touched.type && formik.errors.type && (
            <div style={{ color: "black" }}>{formik.errors.type}</div>
            )}

                <input
                    type="text"
                    name="location"
                    placeholder="New Wine Location"
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{ border: "2px solid black", padding: "10px", width: "100%" }}
                />
            {formik.touched.location && formik.errors.location && (
            <div style={{ color: "black" }}>{formik.errors.location}</div>
            )}

                <input
                    type="text"
                    name="flavorProfile"
                    placeholder="New Wine Flavor Profile"
                    value={formik.values.flavorProfile}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{ border: "2px solid black", padding: "10px", width: "100%" }}
                />
            {formik.touched.flavorProfile && formik.errors.flavorProfile && (
            <div style={{ color: "black" }}>{formik.errors.flavorProfile}</div>
            )}

                <input
                    type="number"
                    name="price"
                    placeholder="New Wine Price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{ border: "2px solid black", padding: "10px", width: "100%" }}
                />
            {formik.touched.price && formik.errors.price && (
            <div style={{ color: "black" }}>{formik.errors.price}</div>
            )}

                <input
                    type="number"
                    name="rating"
                    placeholder="New Wine Rating"
                    value={formik.values.rating}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{ border: "2px solid black", padding: "10px", width: "100%" }}
                />
            {formik.touched.rating && formik.errors.rating && (
            <div style={{ color: "black" }}>{formik.errors.rating}</div>
            )}

                <input
                    type="text"
                    name="image"
                    placeholder="New Wine Image URL"
                    value={formik.values.image}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{ border: "2px solid black", padding: "10px", width: "100%" }}
                />
            {formik.touched.image && formik.errors.image && (
            <div style={{ color: "black" }}>{formik.errors.image}</div>
            )}
        </div>
            
        {/*preview add wine */}
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
          <h5 className="text-gray-600 text-sm">{formik.values.flavorProfile || ""}</h5>

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
      >
        Submit
      </button>
    </div>
  </div>
    );
}
export default AddForm;
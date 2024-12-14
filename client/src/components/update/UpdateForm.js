import React, { useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";

function UpdateForm({ selectedWineId, wines, onUpdate }) {
  const selectedWine = wines.find((wine) => wine.id === selectedWineId);

  const formik = useFormik({
    initialValues: {
      wineNumber: selectedWine ? selectedWine.id : "", 
      name: selectedWine ? selectedWine.name : "",
      type: selectedWine ? selectedWine.type : "",
      location: selectedWine ? selectedWine.location : "",
      flavorProfile: selectedWine ? selectedWine.flavor_profile : "",  
      price: selectedWine ? selectedWine.price : 0,
      image: selectedWine ? selectedWine.image : "",
      rating: selectedWine ? selectedWine.rating : "",
    },
    enableReinitialize: true,  
    validationSchema: yup.object().shape({
      wineNumber: yup
        .number()
        .positive()
        .integer()
        .required("Wine number is required"),
      name: yup.string(),
      type: yup.string(),
      location: yup.string(),
      flavorProfile: yup.string(), 
      price: yup
        .number()
        .positive()
        .integer()
        .typeError("Please enter an Integer")
        .max(200),
      image: yup.string().max(200),
    }),
    onSubmit: (values) => {
      
      const snakeCaseValues = {
        wine_number: values.wineNumber,
        name: values.name,
        type: values.type,
        location: values.location,
        flavor_profile: values.flavorProfile,  
        price: values.price,
        image: values.image,
        rating: values.rating,
      };
    
      fetch(`wines/${values.wineNumber}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(snakeCaseValues),  
      })
        .then((r) => r.json())
        .then((updatedWine) => {
          console.log("Submitted:", updatedWine);
        })
        .catch((error) => console.error("Error:", error));
    
      
      const updatedWine = { ...values, id: values.wineNumber };
      onUpdate(updatedWine);
    
 
      formik.resetForm();
    },
    
  });

 
  if (!selectedWine) {
    return (
      <div className="p-4 rounded-lg shadow-lg bg-red flex flex-col gap-4">
        <p className="text-white">Please select a wine to update.</p>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-lg shadow-lg bg-red flex flex-col gap-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-4">
          <div>
            <h4>UPDATE WINES</h4>
             {/* Wine Name */}
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Wine Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Update Wine Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full px-2 py-2 border-2 square-md focus:ring-2 ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : "border-black"
              }`}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
            )}
          </div>
          
          {/* Wine Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Wine Type
            </label>
            <input
              type="text"
              id="type"
              name="type"
              placeholder="Update Wine Type"
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full px-2 py-2 border-2 square-md focus:ring-2 ${
                formik.touched.type && formik.errors.type
                  ? "border-red-500"
                  : "border-black"
              }`}
            />
            {formik.touched.type && formik.errors.type && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.type}</div>
            )}
          </div>

          {/* Wine Flavor Profile */}
          <div>
            <label htmlFor="flavorProfile" className="block text-sm font-medium text-gray-700">
              Flavor Profile
            </label>
            <input
              type="text"
              id="flavorProfile"
              name="flavorProfile"
              placeholder="Update Wine Flavor Profile"
              value={formik.values.flavorProfile} // Ensure this is properly tied to Formik state
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full px-2 py-2 border-2 square-md focus:ring-2 ${
                formik.touched.flavorProfile && formik.errors.flavorProfile
                  ? "border-red-500"
                  : "border-black"
              }`}
            />
            {formik.touched.flavorProfile && formik.errors.flavorProfile && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.flavorProfile}</div>
            )}
          </div>

          {/* Wine Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Wine Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Update Wine Location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full px-2 py-2 border-2 square-md focus:ring-2 ${
                formik.touched.location && formik.errors.location
                  ? "border-red-500"
                  : "border-black"
              }`}
            />
            {formik.touched.location && formik.errors.location && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.location}</div>
            )}
          </div>

          {/* Wine Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Wine Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Update Wine Price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full px-2 py-2 border-2 square-md focus:ring-2 ${
                formik.touched.price && formik.errors.price
                  ? "border-red-500"
                  : "border-black"
              }`}
            />
            {formik.touched.price && formik.errors.price && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.price}</div>
            )}
          </div>

          {/* Wine Image */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Wine Image
            </label>
            <input
              type="text"
              id="image"
              name="image"
              placeholder="Update Wine Image"
              value={formik.values.image}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 block w-full px-2 py-2 border-2 square-md focus:ring-2 ${
                formik.touched.image && formik.errors.image
                  ? "border-red-500"
                  : "border-black"
              }`}
            />
            {formik.touched.image && formik.errors.image && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.image}</div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 w-full py-2 px-4 bg-black text-white square-md"
          >
            Update Wine
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateForm;

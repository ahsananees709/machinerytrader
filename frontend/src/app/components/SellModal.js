import { useState } from "react";
import { BASE_URL } from "../utils/constant";
import { Spinner } from "../ui/spinner";
const SellModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
      fullName: "",
      phone: "",
      email: "",
      vehicleLocation: "",
      make: "",
      model: "",
      year: "",
      price: "",
      images: [],
    });
    const [errors, setErrors] = useState({});
    const [imageError, setImageError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting,setIsSubmitting] = useState(false)
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleFileChange = (e) => {
      const selectedFiles = Array.from(e.target.files);
  
      if (selectedFiles.length + formData.images.length > 3) {
        setImageError("You can select up to 3 images only.");
        return;
      } else {
        setImageError("");
        setFormData((prev) => ({ ...prev, images: [...prev.images, ...selectedFiles] }));
      }
    };
  
    const handleImageRemove = (index) => {
      const updatedImages = formData.images.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, images: updatedImages }));
    };
  
    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   let validationErrors = {};
      
    //   if (!formData.fullName) validationErrors.fullName = "Full Name is required.";
    //   if (!formData.email) validationErrors.email = "Email is required.";
    //   if (!formData.phone) validationErrors.phone = "Phone number is required.";
    //   if (!formData.vehicleLocation) validationErrors.vehicleLocation = "Vehicle location is required.";
    //   if (!formData.make) validationErrors.make = "Make is required.";
    //   if (!formData.model) validationErrors.model = "Model is required.";
    //   if (!formData.year) validationErrors.year = "Year is required.";
    //   if (!formData.price) validationErrors.price = "Price is required.";
    //   if (formData.images.length === 0) validationErrors.images = "Please select at least one image.";
  
    //   if (Object.keys(validationErrors).length > 0) {
    //     setErrors(validationErrors);
    //     setErrorMessage("Please fill out all required fields.");
    //     return;
    //   }
  
    //   setSuccessMessage("Form submitted successfully!");
    //   setErrorMessage("");
    //   setTimeout(() => {
    //     onClose();
    //   }, 2000);
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};
      
        if (!formData.fullName) validationErrors.fullName = "Full Name is required.";
        if (!formData.email) validationErrors.email = "Email is required.";
        if (!formData.phone) validationErrors.phone = "Phone number is required.";
        if (!formData.vehicleLocation) validationErrors.vehicleLocation = "Vehicle location is required.";
        if (!formData.make) validationErrors.make = "Make is required.";
        if (!formData.model) validationErrors.model = "Model is required.";
        if (!formData.year) validationErrors.year = "Year is required.";
        if (!formData.price) validationErrors.price = "Price is required.";
        if (formData.images.length === 0) validationErrors.images = "Please select at least one image.";
      
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          setErrorMessage("Please fill out all required fields.");
          return;
        }
      
        const formDataToSend = new FormData();
        formDataToSend.append("fullName", formData.fullName);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("phone", formData.phone);
        formDataToSend.append("vehicleLocation", formData.vehicleLocation);
        formDataToSend.append("make", formData.make);
        formDataToSend.append("model", formData.model);
        formDataToSend.append("year", formData.year);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("message", formData.message || "");
      
        formData.images.forEach((image) => {
          formDataToSend.append("images", image);
        });
      
      try {
        setIsSubmitting(true)
          const response = await fetch(`${BASE_URL}/email/vehicle-sale`, {
            method: "POST",
            body: formDataToSend,
          });
      
        if (response.ok) {
            setIsSubmitting(false)
            setSuccessMessage("Your inquiry has been submitted successfully!");
            setErrorMessage("");
            setTimeout(() => {
              onClose();
            }, 2000);
        } else {
          setIsSubmitting(false)
            const errorData = await response.json();
            setErrorMessage(errorData.message || "Something went wrong!");
          }
      } catch (error) {
        setIsSubmitting(false)
          setErrorMessage("Unable to send your inquiry at this time.");
        }
      };
      
    const imagePreviews = formData.images.map((image, index) => (
      <div key={index} className="inline-block relative mr-2 mb-2">
        <button
          type="button"
          onClick={() => handleImageRemove(index)}
          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
        >
          X
        </button>
        <img
          src={URL.createObjectURL(image)}
          alt={`preview-${index}`}
          className="w-8 h-8 object-fit rounded-xl"
        />
      </div>
    ));

    const resetStateAndClose = () => {
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          vehicleLocation: "",
          make: "",
          model: "",
          year: "",
          price: "",
          images: [],
        });
        setErrors({});
        setImageError("");
        setSuccessMessage("");
        setErrorMessage("");
        onClose();
      };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
          <h2 className="text-2xl text-gray-900 text-center font-bold mb-4">Sell Your Equipment</h2>
  
          {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
  
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-between gap-2">
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-2 border-2 rounded text-black"
                  placeholder="Your Full Name"
                  required
                />
                {/* {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>} */}
              </div>
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border-2 rounded text-black"
                  placeholder="Your Email Address"
                  required
                />
                {/* {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>} */}
              </div>
            </div>
  
            <div className="flex items-center justify-between gap-2">
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border-2 rounded text-black"
                  placeholder="Your Mobile Number"
                  required
                />
                {/* {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>} */}
              </div>
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="vehicleLocation" className="text-sm font-medium text-gray-700">
                  Vehicle Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="vehicleLocation"
                  value={formData.vehicleLocation}
                  onChange={handleChange}
                  className="w-full p-2 border-2 rounded text-black"
                  placeholder="Vehicle Location"
                  required
                />
                {/* {errors.vehicleLocation && <p className="text-red-500 text-sm">{errors.vehicleLocation}</p>} */}
              </div>
            </div>
  
            <div className="flex items-center justify-between gap-2">
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="make" className="text-sm font-medium text-gray-700">
                  Make <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="make"
                  value={formData.make}
                  onChange={handleChange}
                  className="w-full p-2 border-2 rounded text-black"
                  placeholder="Make"
                  required
                />
                {/* {errors.make && <p className="text-red-500 text-sm">{errors.make}</p>} */}
              </div>
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="model" className="text-sm font-medium text-gray-700">
                  Model <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="w-full p-2 border-2 rounded text-black"
                  placeholder="Model"
                  required
                />
                {/* {errors.model && <p className="text-red-500 text-sm">{errors.model}</p>} */}
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="year" className="text-sm font-medium text-gray-700">
                  Year <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full p-2 border-2 rounded text-black"
                  placeholder="Year"
                  required
                />
                {/* {errors.year && <p className="text-red-500 text-sm">{errors.year}</p>} */}
              </div>
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="price" className="text-sm font-medium text-gray-700">
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-2 border-2 rounded text-black"
                  placeholder="Price"
                  required
                />
                {/* {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>} */}
              </div>
            </div>
  
            <div className="mt-4">
            <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                  Upload Images (Upto 3) <span className="text-red-500">*</span>
                </label>
              <input
                type="file"
                name="images"
                onChange={handleFileChange}
                accept="image/*"
                multiple
                className="w-full mt-2"
              />
              {imageError && <p className="text-red-500 text-sm">{imageError}</p>}
                        <div className="mt-2">
                        {formData.images.length > 0 && (
  <h3 className="text-sm font-medium text-black">Selected Images:</h3>
)}

                <div className="flex">{imagePreviews}</div>
              </div>
            </div>
  
                    <div className="mt-4 text-center flex justify-end gap-2">
                    <button
              type="button"
              className="bg-secondary text-white px-4 hover:bg-red-600 py-2 rounded"
              onClick={resetStateAndClose}
            >
              Cancel
            </button>
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 hover:bg-blue-600 rounded"
              >
                {isSubmitting ? (
                            <div className="flex items-center">
                              Submitting...
                                    <Spinner width={6} height={6}/>  
                            </div>
                          ) : (
                            'Submit'
                          )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default SellModal
import { useState } from "react";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    gender: "",
    contactNumber: "",
    avatar: null, // Store file
  });
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData({ ...formData, avatar: file });
      setPreview(URL.createObjectURL(file)); // Show image preview
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch("http://localhost:8080/api/user/register", {
        method: "POST",
        body: formDataToSend,
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      alert("Registration Successful");
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl self-center font-bold text-center mb-6 text-gray-700">
          Register
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4"
          encType="multipart/form-data"
        >
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter first name"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600  mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter last name"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600  mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600  mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-600  mb-2">
              Gender
            </label>
            <select
              name="gender"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-sm font-medium text-gray-600  mb-2">
              Contact Number
            </label>
            <input
              type="tel"
              name="contactNumber"
              placeholder="Enter contact number"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
              required
            />
          </div>

          {/* Avatar Upload */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-600  mb-2">
              Upload Avatar
            </label>
            <div className="mt-2 relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:border-blue-400 hover:bg-gray-100 transition">
              {preview ? (
                <img
                  src={preview}
                  alt="Avatar Preview"
                  className="h-full object-cover rounded-md"
                />
              ) : (
                <p className="text-gray-400">Drag & Drop or Click to Upload</p>
              )}
              {/* Fixed file input positioning */}
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleChange}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

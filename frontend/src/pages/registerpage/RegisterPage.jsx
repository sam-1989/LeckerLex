import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false); // terms and conditions checkbox
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameRegex = /^[a-zA-Z0-9_]{3,15}$/; // 3-15 chars long, only letters (uppercase, lowercase), digits, and underscores

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/; // part before "@" allows (upper- and lowercase) letters, digits and special characters (._%+-), must contain @, part after @ allows (upper- and lowercase) letters, digits and special characters (.-), last part must contain a dot (.) followed by 2-5 letters

    const passwordRegex =
      /^(?=(?:.*[a-z]){1})(?=(?:.*[A-Z]){1})(?=(?:.*\d){1})(?=(?:.*[@$!%*?&^#-=_+]){1}).{6,}$/; // Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&^#-=_+).

    if (!email || !password || !name) {
      setErrorMessage("Please enter your username, email and password.");
      return;
    }

    if (!nameRegex.test(name)) {
      setErrorMessage(
        "Username must be between 3 and 15 characters long, and allows only letters, digits and underscores."
      );
      console.log(errorMessage);
      return;
    }

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&^#-=_+)."
      );
      console.log(errorMessage);
      return;
    }

    if (!isChecked) {
      setErrorMessage(
        "To register you must agree to the terms and conditions."
      );
      return;
    }

    setErrorMessage(""); // clean previous errors

    try {
      const response = await fetch("http://localhost:3000/users/signup", {
        // TODO: use env variables for route
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.msg || "An error occured. Please try again.");
        return;
      }
      navigate("/home/verify-email");
    } catch (error) {
      setErrorMessage(
        "An error occured while trying to register. Please try again later."
      );
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center mt-30 font-sans ">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Create Account
        </h1>

        {/* Registration Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                USERNAME
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                YOUR E-MAIL
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CREATE PASSWORD
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Country Dropdown */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SELECT COUNTRY
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200">
              <option value="denmark">Denmark</option>
              <option value="germany">Germany</option>
              <option value="france">France</option>
              <option value="usa">USA</option>
            </select>
          </div>

          {/* Terms & Conditions */}
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="w-5 h-5 border-gray-300 rounded focus:ring focus:ring-indigo-200"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
              I Agree To{" "}
              <a href="/terms" className="text-indigo-600 hover:underline">
                The Terms & Conditions
              </a>
            </label>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-center mt-4">{errorMessage}</p>
          )}
          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 w-full py-3 bg-blue-600 text-white rounded-md text-lg shadow-lg hover:bg-blue-500 transition duration-300"
          >
            GET STARTED
          </button>
        </form>

        {/* Social Buttons
        <div className="mt-6 text-center">
          <div className="flex justify-center items-center space-x-4">
            <button className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-400 transition">
              <i className="fab fa-twitter mr-2"></i> Twitter
            </button>
            <button className="flex items-center px-4 py-2 text-white bg-blue-800 rounded-md hover:bg-blue-700 transition">
              <i className="fab fa-facebook mr-2"></i> Facebook
            </button>
            <button className="flex items-center px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-500 transition">
              <i className="fab fa-google mr-2"></i> Google
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

// import React from "react";

// export default function RegisterPage() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
//         <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
//         <form>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Username:</label>
//             <input
//               type="text"
//               placeholder="Enter your username"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Email:</label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Password:</label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
//           >
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

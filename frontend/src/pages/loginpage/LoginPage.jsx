import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { isLoggedIn, checkLoginStatus } = useContext(AuthContext);
  const navigate = useNavigate(); // React Router's navigate function for redirection

  useEffect(() => {
    const checkUserLogin = async () => {
      await checkLoginStatus();
      if (isLoggedIn) {
        navigate("/home"); // Redirect if user is already logged in
      }
    };

    checkUserLogin();
  }, [isLoggedIn, navigate]); // Dependencies for re-render

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!email || !password) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    setErrorMessage(""); // clean previous errors
    try {
      const response = await fetch("http://localhost:3000/users/login", {
        // TODO: use env variables for route
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.msg || "Incorrent email or password.");
        return;
      }
      const data = await response.json(); // testing purpose
      console.log("User data", data); // testing purpose
      navigate("/home");
    } catch (error) {
      console.error("Error by login", error); // debug log
      setErrorMessage(
        "An error occured while trying to login. Please try again later."
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-sans">
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center">
        {/* Registration Form */}
        <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
          <form onSubmit={handleSignUp}>
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
              Log in
            </h1>
            <div className="mb-4">
              <label className="block text-md font-semibold text-gray-800">
                Email:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-semibold text-gray-800">
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 text-center mt-4">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="w-full px-4 py-2 text-lg bg-green-600 text-white rounded-full shadow-lg hover:bg-green-500 transition duration-300"
            >
              Sign In
            </button>
          </form>
          <div className="text-center mt-4 text-sm text-gray-800">
            <p>
              No profile?{" "}
              <Link to="/register" className="text-indigo-600 hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// import React from 'react';
// import { Link } from "react-router-dom";

// export default function LoginComponent() {
//   return (
//     <div className="min-h-screen flex flex-col bg-gray-100 font-sans">

//       {/* Main Content */}
//       <div className="flex-grow flex items-center justify-center">
//         {/* Registration Form */}
//         <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
//           {/* <h1 className="text-2xl font-heading text-gray-900 mb-6 text-center">
//             Sign Up
//           </h1> */}
//           <form>
//             <div className="mb-4">
//               <label className="text-2xl font-heading text-gray-900 mb-6 text-center">
//                 Email:
//               </label>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2 font-heading">
//                 Password:
//               </label>
//               <input
//                 type="password"
//                 placeholder="Enter your password"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full px-4 py-2 text-lg bg-green-600 text-white rounded-full shadow-lg hover:bg-green-500 transition duration-300"
//             >
//               Sign Up
//             </button>
//           </form>
//           <div className="text-center mt-4 text-sm text-gray-600">
//             <p>
//               No profile?{' '}
//               <a href="/register" className="text-indigo-600 hover:underline">
//                 Register here
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function LoginComponent() {
  const navigate = useNavigate(); // React Router's navigate function for redirection

  const handleSignUp = (e) => {
    e.preventDefault(); // Prevent default form submission
    navigate("/profile"); // Redirect to the profile page
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-sans">
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center">
        {/* Registration Form */}
        <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
          <form onSubmit={handleSignUp}>
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Log in</h1>
            <div className="mb-4">
              <label className="block text-md font-semibold text-gray-800">
                Email:
              </label>
              <input
                type="email"
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
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-lg bg-green-600 text-white rounded-full shadow-lg hover:bg-green-500 transition duration-300"
            >
              Sign Up
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

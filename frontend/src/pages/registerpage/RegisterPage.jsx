import React from "react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>

        {/* Registration Form */}
        <form>
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
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
              I Agree To{" "}
              <a href="/terms" className="text-indigo-600 hover:underline">
                The Terms & Conditions
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 w-full py-3 bg-blue-600 text-white rounded-md text-lg shadow-lg hover:bg-blue-500 transition duration-300"
          >
            GET STARTED
          </button>
        </form>

        {/* Social Buttons */}
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
        </div>
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
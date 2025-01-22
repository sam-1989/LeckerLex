import { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  const checkLoginStatus = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/users/verify-user`, {
        credentials: "include",
      }); // TODO: route with .env replace

      if (response.ok) {
        setIsLoggedIn(true);
        setErrorMessage("");
      } else {
        setIsLoggedIn(false);
        setErrorMessage("This feature is available only for logged-in users.");
      }
    } catch (error) {
      setIsLoggedIn(false);
      setErrorMessage("An error occured. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AuthContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          errorMessage,
          setErrorMessage,
          checkLoginStatus,
          loading,
          setLoading,
          isGuest,
          setIsGuest,
        }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
}

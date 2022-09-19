import { createContext, useState } from "react";
import { useEffect } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
      setIsLoggedIn(currentUser);
    }
  }, []);

  const loginUser = (user) => {
    localStorage.setItem("currentUser", JSON.stringify([user]));
    setIsLoggedIn(true);
  };
  const logoutUser = () => {
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ email: "", password: "" })
    );
    setIsLoggedIn(false);
  };

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;

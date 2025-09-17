import { createContext, useState, useEffect } from "react";
// import { getUserInfo } from "../services/api";
import { getUserInfo } from "../services/apiSwitcher";

export const AuthContext = createContext("");

export const AuthProvider = ({ children }) => {
  const [authForm, setAuthForm] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const isMock = process.env.REACT_APP_USE_MOCK === "true";

        const res = await getUserInfo();
        setUser({
          ...res,
          avatar: res.avatar
            ? isMock
              ? res.avatar
              : `${process.env.API_URL}${res.avatar}`
            : null,
        });
      } catch (error) {
        setUser(null);
      }
    };
    fetchAuth();
  }, [authForm]);

  return (
    <AuthContext.Provider
      value={{
        authForm,
        setAuthForm,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

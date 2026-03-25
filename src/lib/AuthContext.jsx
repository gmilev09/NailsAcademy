import React, { createContext, useState, useContext, useEffect } from "react";
import {
  getUser,
  getSettings,
  login,
  signup,
  logout as netlifyLogout,
  onAuthChange,
  handleAuthCallback,
  AuthError,
  MissingIdentityError,
} from "@netlify/identity";

const AuthContext = createContext();

function getReadableError(error) {
  if (error instanceof MissingIdentityError) {
    return "Netlify Identity не е конфигуриран. Стартирайте през netlify dev или активирайте Identity в Netlify.";
  }
  if (error instanceof AuthError) {
    if (error.status === 401) return "Невалиден имейл или парола.";
    if (error.status === 403) return "Регистрацията е изключена.";
    if (error.status === 422) return "Проверете имейла и паролата.";
    return error.message || "Възникна проблем с автентикацията.";
  }
  return "Възникна неочаквана грешка.";
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true);
  const [authSettings, setAuthSettings] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [callbackNotice, setCallbackNotice] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      setIsLoadingAuth(true);
      setIsLoadingPublicSettings(true);
      try {
        const callbackResult = await handleAuthCallback();
        if (!isMounted) return;
        if (callbackResult?.type === "confirmation") {
          setCallbackNotice("Имейлът е потвърден успешно. Входът е активен.");
        }
      } catch (error) {
        if (!isMounted) return;
        setAuthError(getReadableError(error));
      }

      try {
        const [currentUser, settings] = await Promise.all([getUser(), getSettings()]);
        if (!isMounted) return;
        setUser(currentUser);
        setIsAuthenticated(Boolean(currentUser));
        setAuthSettings(settings);
      } catch (error) {
        if (!isMounted) return;
        setAuthError(getReadableError(error));
      } finally {
        if (isMounted) {
          setIsLoadingAuth(false);
          setIsLoadingPublicSettings(false);
        }
      }
    };

    initializeAuth();

    const unsubscribe = onAuthChange(async (_event, authUser) => {
      if (!isMounted) return;
      setUser(authUser);
      setIsAuthenticated(Boolean(authUser));
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const loginUser = async (email, password) => {
    setAuthError(null);
    try {
      const loggedInUser = await login(email, password);
      setUser(loggedInUser);
      setIsAuthenticated(true);
      return loggedInUser;
    } catch (error) {
      const message = getReadableError(error);
      setAuthError(message);
      throw new Error(message);
    }
  };

  const signupUser = async (email, password, fullName) => {
    setAuthError(null);
    try {
      return await signup(email, password, fullName ? { full_name: fullName } : undefined);
    } catch (error) {
      const message = getReadableError(error);
      setAuthError(message);
      throw new Error(message);
    }
  };

  const logout = async () => {
    try {
      await netlifyLogout();
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      window.location.href = "/";
    }
  };

  const navigateToLogin = () => {
    window.location.href = "/Auth";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoadingAuth,
        isLoadingPublicSettings,
        authSettings,
        authError,
        callbackNotice,
        setAuthError,
        loginUser,
        signupUser,
        logout,
        navigateToLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

import React, { createContext, useState, useContext, useEffect } from "react";

// LOCAL PREVIEW SHIM — replaces `@netlify/identity` with a localStorage-backed
// auth so the site works fully offline. Public API is kept identical:
// loginUser / signupUser / logout / navigateToLogin / useAuth()

const USERS_KEY = "na_users";
const SESSION_KEY = "na_mock_user";

class AuthError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
class MissingIdentityError extends Error {}

const readUsers = () => {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || "[]"); } catch { return []; }
};
const writeUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));

const getUser = async () => {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); } catch { return null; }
};
const getSettings = async () => ({ signup_disabled: false });
const login = async (email, password) => {
  const users = readUsers();
  const found = users.find((u) => u.email === email && u.password === password);
  if (!found) throw new AuthError("Невалиден имейл или парола.", 401);
  const user = { id: found.id, email: found.email, name: found.user_metadata?.full_name || "", user_metadata: found.user_metadata };
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  notify("login", user);
  return user;
};
const signup = async (email, password, metadata) => {
  const users = readUsers();
  if (users.some((u) => u.email === email)) throw new AuthError("Потребител с този имейл вече съществува.", 422);
  if (!email || !password || password.length < 4) throw new AuthError("Проверете имейла и паролата.", 422);
  const user = { id: String(Date.now()), email, password, user_metadata: metadata || {} };
  users.push(user);
  writeUsers(users);
  // auto-login after signup (preview behaviour)
  const sessionUser = { id: user.id, email: user.email, name: user.user_metadata?.full_name || "", user_metadata: user.user_metadata };
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
  notify("signup", sessionUser);
  return { ...user, confirmed: true, autoconfirm: true };
};
const netlifyLogout = async () => {
  localStorage.removeItem(SESSION_KEY);
  notify("logout", null);
};
const listeners = new Set();
function notify(event, user) { listeners.forEach((fn) => fn(event, user)); }
const onAuthChange = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };
const handleAuthCallback = async () => null;

const AuthContext = createContext();

function getReadableError(error) {
  if (error instanceof MissingIdentityError) {
    return "Netlify Identity не е конфигуриран. Стартирайте през netlify dev или активирайте Identity в Netlify.";
  }
  if (error instanceof AuthError) {
    if (error.status === 401) return "Невалиден имейл или парола.";
    if (error.status === 403) return "Регистрацията е изключена.";
    if (error.status === 422) return error.message || "Проверете имейла и паролата.";
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
    window.location.href = "/auth";
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

"use client";

import axios, { AxiosError } from "axios";
import { getCookie } from "cookies-next";
import { useState, createContext, useEffect } from "react";
import useAuth from "../hooks/useAuth";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
}
interface State {
  loading: boolean;
  error: string | undefined;
  data: User | undefined;
}
interface AuthState extends State {
  setAuthState: React.Dispatch<React.SetStateAction<State>>;
}

export const AuthenticationContext = createContext<AuthState>({
  loading: false,
  data: undefined,
  error: undefined,
  setAuthState: () => {},
});

export default function AuthContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authState, setAuthState] = useState<State>({
    loading: true,
    data: undefined,
    error: undefined,
  });

  const fetchUser = async () => {
    setAuthState((prev) => ({
      ...prev,
      loading: true,
    }));
    try {
      const jwt = getCookie("jwt");
      if (!jwt) {
        return setAuthState((prev) => ({
          ...prev,
          loading: false,
        }));
      }
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      return setAuthState({
        error: undefined,
        data: response.data,
        loading: false,
      });
    } catch (error) {
      // do we really need to handle this error?
      let errorMessage: string;
      if (error instanceof AxiosError) {
        if (error.response?.data.error) {
          errorMessage = error.response.data.error.message;
        }
      }
      setAuthState((prevState) => ({
        ...prevState,
        error: errorMessage || "Unknown error",
      }));
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
}

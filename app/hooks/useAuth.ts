import axios, { AxiosError } from "axios";
import { removeCookies } from "cookies-next";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";

const useAuth = () => {
  const { setAuthState } = useContext(AuthenticationContext);

  const signIn = async ({
    email,
    password,
    handleClose,
  }: {
    email: string;
    password: string;
    handleClose: () => void;
  }) => {
    setAuthState({
      error: undefined,
      data: undefined,
      loading: true,
    });
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/signin`,
        // "http://localhost:3000/api/auth/signin",
        {
          email,
          password,
        }
      );
      setAuthState({
        error: undefined,
        data: response.data,
        loading: false,
      });
      handleClose();
    } catch (error) {
      let errorMessage;

      if (error instanceof AxiosError) {
        if (error.response?.data.error) {
          errorMessage = error.response.data.error.message;
        }
      }
      setAuthState({
        error: errorMessage || "Unknown error",
        data: undefined,
        loading: false,
      });
    }
  };

  const signUp = async ({
    firstName,
    lastName,
    email,
    password,
    phone,
    city,
    handleClose,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    city: string;
    handleClose: () => void;
  }) => {
    setAuthState({
      error: undefined,
      data: undefined,
      loading: true,
    });

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/signup`,
        // "http://localhost:3000/api/auth/signin",
        {
          firstName,
          lastName,
          email,
          phone,
          city,
          password,
        }
      );
      setAuthState({
        error: undefined,
        data: response.data,
        loading: false,
      });
      handleClose();
    } catch (error) {
      let errorMessage;

      if (error instanceof AxiosError) {
        if (error.response?.data.error) {
          errorMessage = error.response.data.error.message;
        }
      }
      setAuthState({
        error: errorMessage || "Unknown error",
        data: undefined,
        loading: false,
      });
    }
  };

  const signOut = async () => {
    removeCookies("jwt");

    setAuthState({
      data: undefined,
      error: undefined,
      loading: false,
    });
  };

  return { signIn, signUp, signOut };
};

export default useAuth;

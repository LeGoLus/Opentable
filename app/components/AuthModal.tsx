"use client";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import cx from "classnames";
import AuthModalInputs from "./AuthModalInputs";
import useAuth from "../hooks/useAuth";
import { AuthenticationContext } from "../context/AuthContext";
import { Alert, CircularProgress } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  color: "black",
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ isSignIn }: { isSignIn: boolean }) {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });
  const { signIn, signUp } = useAuth();
  const { data, error, loading } = useContext(AuthenticationContext);

  const handleButtonClick = () => {
    if (isSignIn) {
      signIn({ email: inputs.email, password: inputs.password, handleClose });
    } else {
      signUp({ ...inputs, handleClose });
    }
  };
  useEffect(() => {
    for (let [key, value] of Object.entries(inputs)) {
      if (isSignIn) {
        if (key === "email" || key === "password") {
          if (value.length < 3) {
            !disabled && setDisabled(true);
            return;
          }
        }
      } else {
        if (value.length < 3) {
          !disabled && setDisabled(true);
          return;
        }
      }
    }
    setDisabled(false);
  }, [inputs]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  return (
    <div>
      <button
        onClick={handleOpen}
        className={cx({
          ["bg-blue-400 text-white border p-1 px-4 rounded mr-3"]: isSignIn,
          ["border p-1 px-4 rounded mr-3 text-black"]: !isSignIn,
        })}
      >
        {cx({
          ["Sign In"]: isSignIn && !data,
          [data?.firstName || "undefined"]: isSignIn && data,
          ["Sign Up"]: !isSignIn && !data,
        })}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-sign-in"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={"p-2 h-[500px] relative"}>
            {loading && (
              <div className="flex justify-center h-[300px] items-center absolute left-0 right-0 m-auto w-full z-10">
                <CircularProgress />
              </div>
            )}
            <div
              className={cx({
                ["uppercase font-bold text-center pb-2 border-b mb-2 text-black"]:
                  true,
                ["blur pointer-events-none"]: loading,
              })}
            >
              <p className="text-sm">
                {cx({
                  ["Sign in"]: isSignIn,
                  ["Create account"]: !isSignIn,
                })}
              </p>
            </div>
            <div
              className={cx({
                ["m-auto"]: true,
                ["blur"]: loading,
              })}
            >
              <h2 className="text-2xl font-light text-center">
                {cx({
                  ["Log into your account"]: isSignIn,
                  ["Create new Open Table account"]: !isSignIn,
                })}
              </h2>
              <AuthModalInputs
                inputs={inputs}
                handleInputChange={handleInputChange}
                isSignIn={isSignIn}
              />
              <button
                disabled={disabled || loading}
                onClick={handleButtonClick}
                className="upperCase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"
              >
                {cx({
                  ["Sign in"]: isSignIn,
                  ["Create account"]: !isSignIn,
                })}
              </button>
            </div>
            {error && <Alert severity="error">{error}</Alert>}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

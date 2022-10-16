import React, { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { useAppDispatch } from "../store/hooks";
import { checkLogin } from "../store/auth-actions";
import Box from "@mui/material/Box";
import "./Login.module.css";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type obj = { email: string; password: string };

const Login = () => {
  let [error, setError] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const dataHandler = async (data: obj) => {
    setError(false);
    const returnedData = await dispatch(checkLogin(data));
    console.log(returnedData);
    if (!!returnedData) {
      setError(true);
    } else {
      navigate("/");
    }
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      margin={10}
      minHeight="40vh"
      sx={{}}
    >
      <Box
        padding={5}
        sx={{
          alignItems: "center",

          backgroundColor: "white",
          width: { xs: "90%", sm: "40%", lg: "30%" },
        }}
      >
        <Typography variant="h4">Login</Typography>
        <LoginForm onReceiveData={dataHandler} error={error} />
      </Box>
    </Box>
  );
};

export default Login;

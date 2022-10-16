import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { FormControl, Typography } from "@mui/material";

interface LoginProps {
  email: string;
  password: string;
}

export const LoginForm: React.FC<{
  onReceiveData: (data: LoginProps) => void;
  error: boolean;
}> = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wasTouched, setWasTouched] = useState(false);
  console.log(props.error);

  const touchHandler = () => {
    setWasTouched(true);
  };

  let receivedError = props.error;

  let hasError = !wasTouched && receivedError;

  let errorMessage =
    hasError && "The provided email or password was incorrect.";

  const marg = hasError ? "10px" : "30px";

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setWasTouched(false);
    const enteredEmail = email;
    const enteredPass = password;

    props.onReceiveData({ email: enteredEmail, password: enteredPass });
    setPassword("");
  };

  return (
    <form onSubmit={submitHandler}>
      <FormControl sx={{ width: "100%" }}>
        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
          error={hasError}
          margin="dense"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          onKeyDown={touchHandler}
        />
        <TextField
          id="standard-basic"
          type="password"
          label="Password"
          variant="standard"
          error={hasError}
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          onKeyDown={touchHandler}
        />

        {hasError && (
          <Typography
            component="span"
            variant="subtitle1"
            marginTop={1.5}
            fontSize={15}
          >
            {errorMessage}
          </Typography>
        )}

        <Button
          sx={{ marginTop: marg }}
          type="submit"
          variant="contained"
          color="success"
        >
          Log In
        </Button>
      </FormControl>
    </form>
  );
};

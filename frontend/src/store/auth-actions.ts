import { authActions } from "./auth-slice";
import { useNavigate } from "react-router-dom";

type obj = { email: string; password: string };

type authTokenState = {
  access: string;
  refresh: string;
};

export const checkLogin = (loginInfo: obj) => {
  return async (dispatch: any) => {
    let err = "";
    const sendRequest = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/account/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginInfo.email,
          password: loginInfo.password,
        }),
      });
      if (!response.ok) {
        console.log(response);
        throw new Error(
          "The entered email or password was incorrect. Please try again."
        );
      }
      const data = await response.json();
      console.log(data);
      return data;
    };
    try {
      const data: authTokenState = await sendRequest();

      if (!!data.access && !!data.refresh) {
        console.log("Dispatching");
        console.log(data);
        dispatch(authActions.loginUser(data));
      } else {
      }
    } catch (error) {
      if (error instanceof Error) {
        err = error.message;
      }
    }
    return err;
  };
};

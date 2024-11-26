import { useState, useContext } from "react";
import { Context } from "@/context/Context";
import { createUser } from "../firebase/createUser";
import { authHandler } from "../firebase/authHandler";
import { loginUser } from "../firebase/loginUser";
import { authErrors } from "../firebase/firebase.config";
import Error from "./common/Error";
import { CircularProgress } from "@mui/material";
import Input from "./common/Input";

export default function AuthForm() {
  const { setLoadingScreen, setAuthModalActive, setUserLogged, noAccount, setNoAccount, setFirebaseActiveUser } = useContext(Context);
  const [userData, setUserData] = useState({ username: "", email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState({ active: false, text: "" });
  const [loadingAuth, setLoadingAuth] = useState(false);

  const authInputFields = [
    {
      label: "Email",
      type: "email",
      placeholder: "email@example.com",
      value: userData.email || "",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setUserData({ ...userData, email: e.target.value }),
    },
    {
      label: "Password",
      type: "password",
      placeholder: "Password",
      value: userData.password || "",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setUserData({ ...userData, password: e.target.value }),
    },
  ];

  const handleSubmit = async () => {
    const methodToUseForAuth = noAccount ? createUser : loginUser;
    let resultFromAuth;
    setLoadingAuth(true);

    try {
      resultFromAuth = await authHandler(methodToUseForAuth, userData);
      setFirebaseActiveUser({ email: resultFromAuth.user.email, uid: resultFromAuth.user.uid });
      setUserLogged(true);
      setAuthModalActive(false);
      setErrorMessage({ active: false, text: "" });
      setUserData({ username: "", email: "", password: "" });
      setLoadingScreen(true);

      setTimeout(() => {
        setLoadingScreen(false);
      }, 1000);
    } catch (error) {
      setErrorMessage({ active: true, text: authErrors(error) });
    } finally {
      setLoadingAuth(false);
    }
  };

  return (
    <>
      {noAccount ? <h2 className="bold text-xl">Sign up</h2> : <h2 className="bold text-xl">Login</h2>}
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          handleSubmit();
        }}
        className="auth-form gap-6 w-full sm:w-[80%] xl:w-[85%] 2xl:w-[65%] 4:w-[55%]"
      >
        {authInputFields.map((input, index) => {
          return (
            <label htmlFor="" key={index}>
              {input.label}
              <Input type={input.type} placeholder={input.placeholder} value={input.value || ""} onChange={input.onChange} hasPassword={input.type == "password" ? true : false} />
            </label>
          );
        })}

        {errorMessage.active && <Error errorMessage={errorMessage} />}

        <button className={`rounded-3xl w-full    ${loadingAuth ? "bg-white/20 cursor-wait text-zinc-500" : "bg-white/90 hover:bg-white text-black cursor-pointer"}`} type="submit" onClick={() => {}}>
          {loadingAuth ? (
            <span className="flex gap-1 items-center justify-center">
              <CircularProgress size={15} color="inherit" />
              <p>Loading</p>
            </span>
          ) : noAccount ? (
            "Create account"
          ) : (
            "Login"
          )}
        </button>
      </form>

      <p>
        {noAccount ? "Already have an account? " : "Dont have an account? "}
        <button
          className=" border-none  mt-2 p-0 text-[var(--primary)] hover:bg-transparent hover:underline"
          onClick={() => {
            noAccount ? setNoAccount(false) : setNoAccount(true);

            setErrorMessage({ active: false, text: "" });
          }}
        >
          {noAccount ? "Login" : "Create account"}
        </button>
      </p>
    </>
  );
}

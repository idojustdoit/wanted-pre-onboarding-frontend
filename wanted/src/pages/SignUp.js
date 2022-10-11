import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../utils/AxiosInstance";

function SignUp() {
  const [signupValue, setSignupValue] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const isValid =
    signupValue.email.includes("@") && signupValue.password.length >= 8;

  const idHandler = (e) => {
    e.preventDefault();
    setSignupValue((prev) => ({ ...prev, email: e.target.value }));
  };

  const pwHandler = (e) => {
    e.preventDefault();
    setSignupValue((prev) => ({ ...prev, password: e.target.value }));
  };

  const signUpApi = () => {
    const data = { email: signupValue.email, password: signupValue.password };

    AxiosInstance.post("/auth/signup", data)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      signUpApi();
    }
  };

  return (
    <div>
      <span>email</span>
      <input
        placeholder="이메일을 입력해주세요."
        type="email"
        onChange={idHandler}
      />

      <span>password</span>
      <input
        placeholder="비밀번호를 입력해주세요."
        type="password"
        onChange={pwHandler}
        onKeyPress={handleOnKeyPress}
      />

      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </button>
      <button onClick={signUpApi} disabled={!isValid}>
        회원가입 하기
      </button>
    </div>
  );
}

export default SignUp;

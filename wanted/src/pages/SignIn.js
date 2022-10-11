import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AxiosInstance from "../utils/AxiosInstance";
import isLogin from "../utils/isLogin";

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isLogin() && location === "/") {
      navigate("/todos");
    }
  }, []);

  const idHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const pwHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      LoginApi();
    }
  };

  const LoginApi = () => {
    const data = { email, password };
    AxiosInstance.post("/auth/signin", data)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("access_token", res.data.access_token);
        navigate("/todos");
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  };

  return (
    <div>
      <span>email</span>
      <input
        type="email"
        placeholder="이메일을 입력해주세요."
        onChange={idHandler}
      />
      <span>password</span>
      <input
        type="password"
        placeholder="비밀번호를 입력해주세요."
        onChange={pwHandler}
        onKeyPress={handleOnKeyPress}
      />
      <button onClick={LoginApi}>로그인하기</button>{" "}
      <button
        onClick={() => {
          navigate("/signup");
        }}
      >
        회원가입 하러가기
      </button>
    </div>
  );
}

export default SignIn;

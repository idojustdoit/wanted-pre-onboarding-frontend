import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const idHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const pwHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const signUpApi = (e) => {
    const config = {
      email,
      password,
    };
    axios
      .post("/auth/signup", Headers:{

      contentType: application/json}
      
      ,config)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert("정보를 다시입력해주세요!");
      });
  };

  return (
    <div>
      <span>email</span>
      <input placeholder="이메일을 입력해주세요." onChange={idHandler} />

      <span>password</span>
      <input placeholder="비밀번호를 입력해주세요." onChange={pwHandler} />

      <button>뒤로가기</button>
      <button onClick={signUpApi}>회원가입 하기</button>
    </div>
  );
}

export default SignUp;

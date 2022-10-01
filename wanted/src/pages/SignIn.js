import React, { useState } from "react";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const idHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const pwHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  return (
    <div>
      <span>email</span>
      <input placeholder="이메일을 입력해주세요." onChange={idHandler} />
      <span>password</span>
      <input placeholder="비밀번호를 입력해주세요." onChange={pwHandler} />

      <button>로그인하기</button>
    </div>
  );
}

export default SignIn;

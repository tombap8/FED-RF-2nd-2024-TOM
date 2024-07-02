// 로그인 페이지 컴포넌트 - Login.jsx
import React from "react";

// CSS 불러오기 (회원가입과 동일)
import "../../css/member.scss";

function Login(props) {
  return (
    <div className="outbx">
      <section className="membx" 
      style={{minHeight: "300px"}}>
        <h2>LOG IN</h2>
        <form method="post" action="process.php">
          <ul>
            <li>
              <label>ID : </label>
              <input
                type="text"
                maxLength="20"
                placeholder="Please enter your ID"
                value=""
              />
            </li>
            <li>
              <label>Password : </label>
              <input
                type="password"
                maxLength="20"
                placeholder="Please enter your Password"
                value=""
              />
            </li>
            <li style={{overflow: "hidden"}}>
              <button className="sbtn">Submit</button>
            </li>
          </ul>
        </form>
      </section>
    </div>
  );
}

export default Login;

import React from "react";

// 회원가입 CSS 불러오기
import "../../css/member.scss";

function Member(props) {
  return (
    <div className="outbx">
      <section className="membx">
        <h2>Join Us</h2>
        <form action="process.php" method="post">
          <ul>
            <li>
              <label>ID : </label>
              <input
                type="text"
                maxlength="20"
                placeholder="Please enter your ID"
                value=""
              />
            </li>
            <li>
              <label>Password : </label>
              <input
                type="password"
                maxlength="20"
                placeholder="Please enter your Password"
                value=""
              />
            </li>
            <li>
              <label>Confirm Password : </label>
              <input
                type="password"
                maxlength="20"
                placeholder="Please enter your Confirm Password"
                value=""
              />
            </li>
            <li>
              <label>User Name : </label>
              <input
                type="text"
                maxlength="20"
                placeholder="Please enter your Name"
                value=""
              />
            </li>
            <li>
              <label>Email : </label>
              <input
                type="text"
                maxlength="50"
                placeholder="Please enter your Email"
                value=""
              />
            </li>
            <li style="overflow: hidden;">
              <button className="sbtn">Submit</button>
            </li>
            <li>
              Are you already a Member?<a href="/tom-dc-pj/login">Log In</a>
            </li>
          </ul>
        </form>
      </section>
    </div>
  );
}

export default Member;

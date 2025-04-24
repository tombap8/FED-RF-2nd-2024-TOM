// DC.com - 로그인 페이지 컴포넌트 - Login.tsx

import React, { useContext, useEffect, useState } from "react";
import { db } from "../../js/db/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

// 모듈 CSS 불러오기 : member.scss와 동일
import "../../css/pages/member.scss";

// 전역 컨텍스트 API 사용하기!!
import { dCon } from "../modules/dCon";

function Login() {
  // 컨텍스트 API 사용하기 /////
  const myCon = useContext(dCon);
  console.log('로그인페이지 dCon:', myCon);

  // [ 상태관리변수 ] /////////////
  // [1] 입력요소 상태변수
  // 1. 아이디변수
  const [userId, setUserId] = useState("");
  // 2. 비밀번호변수
  const [pwd, setPwd] = useState("");

  // [2] 에러상태관리 변수
  // -> 에러상태값 초기값은 에러아님(false)
  // 1. 아이디변수
  const [userIdError, setUserIdError] = useState(false);
  // 2. 비밀번호변수
  const [pwdError, setPwdError] = useState(false);

  // [ 아이디관련 메시지 프리셋 ] ////
  const msgId = [
    "This is a required entry", //필수입력
    "ID does not exist", //아이디가 존재하지 않습니다
  ];
  // [ 비밀번호관련 메시지 프리셋 ] ////
  const msgPwd = [
    // 비밀번호
    "This is a required entry", //필수입력
    "Password doesn't match", //비밀번호가 일치하지 않습니다
  ];

  // [3] 에러메시지 상태변수 : 초기값 msgId[0]
  // -> 기본 메시지가 출력됨
  const [idMsg, setIdMsg] = useState(msgId[0]);
  const [pwdMsg, setPwdMsg] = useState(msgPwd[0]);

  // [ 유효성 검사 함수 ] ///////
  // 1. 아이디 유효성 검사 ////////////
  const changeUserId = (e: any) => {
    // 입력된 값읽기
    let val = e.target.value;

    // 1. 빈값 체크 :
    // 1-1.빈값아니면 에러아님(false)
    if (val !== "") setUserIdError(false);
    // 1-2.빈값이면 에러임(true)
    else {
      // (1) 메시지 띄우기(필수입력메시지)
      setIdMsg(msgId[0]);
      // (2) 에러상태값 변경하기
      setUserIdError(true);
    } /////// else ///////////

    // 실제 userId 상태변수값이 업데이트 돼야만
    // 화면에 출력된다!
    setUserId(val);
  }; ////////// changeUserId 함수 ////////////

  // 2. 비밀번호 유효성 검사 ///////////
  const changePwd = (e: any) => {
    // 입력된 값읽기
    let val = e.target.value;

    // 1. 빈값 체크 :
    // 1-1.빈값아니면 에러아님(false)
    if (val !== "") setPwdError(false);
    // 1-2.빈값이면 에러임(true)
    else {
      // (1) 메시지 띄우기(필수입력메시지)
      setPwdMsg(msgPwd[0]);
      // (2) 에러상태값 변경하기
      setPwdError(true);
    } /////// else ///////////

    // 4. 기존입력값 반영하기
    setPwd(val);
  }; ///////// changePwd 함수 //////////

  // [ 전체 유효성검사 체크함수 ] ///////////
  const totalValid = () => {
    // 1. 모든 상태변수에 빈값일때 에러상태값 업데이트!
    if (!userId) setUserIdError(true);
    if (!pwd) setPwdError(true);

    // 2. 통과시 true, 불통과시 false 리턴처리
    // 통과조건 : 빈값아님 + 에러후크변수가 모두 false
    if (userId && pwd && !userIdError && !pwdError) return true;
    // 하나라도 false이면 false를 리턴함!
    else return false;
  }; /////////// totalValid 함수 ///////////

  // [ 서브밋 기능함수 ] ////////////////
  const onSubmit = async (e: any) => {
    // 1. 기본서브밋 막기
    e.preventDefault();

    console.log("최종검사:", totalValid());

    // 2. 유효성검사 전체 통과시
    if (totalValid()) {
      console.log("모두통과! 데이터조회!");

      try {
        // Firebase에서 사용자 정보 조회
        const memRef = collection(db, "mem-data");
        const q = query(memRef, where("uid", "==", userId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          // 아이디가 존재하지 않는 경우
          setIdMsg(msgId[1]);
          setUserIdError(true);
        } else {
          // 아이디가 존재하는 경우
          const userData = querySnapshot.docs[0].data();
          
          // 비밀번호 검사
          if (pwd === userData.pwd) {
            // 로그인 성공 처리
            setUserIdError(false);

            // ****** [ 로그인 후 셋팅작업 ] ****** //
            // 1. 로그인한 회원정보를 세션스에 셋팅!
            sessionStorage.setItem("minfo", JSON.stringify(userData));

            // 2. 컨텍스트 API의 로그인상태 업데이트
            myCon.setLoginSts(userData);

            // 3. 로그인 환영메시지 셋팅함수 호출
            myCon.makeMsg(userData.unm);

            // 4. 로그인 성공 메시지 버튼에 출력하기
            const sBtn = document.querySelector(".sbtn") as HTMLElement;
            sBtn.innerText = "넌 로그인 된거야~!";

            // 5. 라우팅 페이지 이동
            // 1초후 메인 페이지로 이동
            setTimeout(() => {
              myCon.goPage("/");
            }, 1000);
          } else {
            // 비밀번호가 일치하지 않는 경우
            setPwdMsg(msgPwd[1]);
            setPwdError(true);
          }
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred during login. Please try again.");
      }
    } else {
      alert("Change your input!");
    }
  }; /////////// onSubmit 함수 //////////

  // 화면랜더링 구역 /////////
  useEffect(() => {
    // 아이디입력창 포커스
    const userId = document.querySelector("#user-id") as HTMLInputElement;
    userId.focus();
  }, []);

  // 코드 리턴구역 //////////////////////
  return (
    <div className="outbx">
      <section className="membx" style={{ minHeight: "300px" }}>
        <h2>LOG IN</h2>
        <form method="post" action="process.php">
          <ul>
            <li>
              <label>ID : </label>
              <input
                id="user-id"
                type="text"
                maxLength={20}
                placeholder="Please enter your ID"
                value={userId}
                onChange={changeUserId}
              />
              {
                // 에러일 경우 메시지 출력
                // 조건문 && 출력요소
                userIdError && 
                <div className="msg">
                  <small
                    style={{
                      color: "red",
                      fontSize: "10px",
                    }}
                  >
                    {idMsg}
                  </small>
                </div>
              }
            </li>
            <li>
              <label>Password : </label>
              <input
                type="password"
                maxLength={20}
                placeholder="Please enter your password"
                value={pwd}
                onChange={changePwd}
              />
              {
                // 에러일 경우 메시지 출력
                // 조건문 && 출력요소
                pwdError && 
                <div className="msg">
                  <small
                    style={{
                      color: "red",
                      fontSize: "10px",
                    }}
                  >
                    {pwdMsg}
                  </small>
                </div>
              }
            </li>
            <li>
              <button type="submit" className="sbtn" onClick={onSubmit}>
                LOG IN
              </button>
            </li>
          </ul>
        </form>
      </section>
    </div>
  );
}

export default Login;

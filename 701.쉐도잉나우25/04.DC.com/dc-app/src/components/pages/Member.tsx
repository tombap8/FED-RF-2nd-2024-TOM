// DC.com - 회원가입 페이지 컴포넌트 - Member.jsx

import React, { useState } from "react";

import { db } from "../../js/db/firebaseConfig";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";

// 모듈 CSS 불러오기 ///
import "../../css/pages/member.scss";
import { Link, useNavigate } from "react-router-dom";

// 로컬스토리지 생성 JS ////
import { initData } from "../../js/func/mem_fn";

// 제이쿼리 불러오기 ////
import $ from "jquery";

// 다음 우편번호 모듈 불러오기 ///
import AddressInput from "../modules/AddressInput";

function Member() {
  // 라우터이동 객체 생성하기 ///
  const goPage = useNavigate();
  // 사용시: goPage(라우터주소,state변수)

  // [ 상태관리변수 ] /////////////
  // [1] 입력요소 상태변수
  // 1. 아이디변수
  const [userId, setUserId] = useState("");
  // 2. 비밀번호변수
  const [pwd, setPwd] = useState("");
  // 3. 비밀번호확인변수
  const [chkPwd, setChkPwd] = useState("");
  // 4. 사용자이름변수
  const [userName, setUserName] = useState("");
  // 5. 이메일변수
  const [email, setEmail] = useState("");
  // 6. 주소변수
  const [addr, setAddr] = useState("");
  // 7. 우편번호변수
  const [zipcode, setZipcode] = useState("");

  // [2] 에러상태관리 변수
  // -> 에러상태값 초기값은 에러아님(false)
  // 1. 아이디변수
  const [userIdError, setUserIdError] = useState(false);
  // 2. 비밀번호변수
  const [pwdError, setPwdError] = useState(false);
  // 3. 비밀번호확인변수
  const [chkPwdError, setChkPwdError] = useState(false);
  // 4. 사용자이름변수
  const [userNameError, setUserNameError] = useState(false);
  // 5. 이메일변수
  const [emailError, setEmailError] = useState(false);
  // 6. 주소변수
  const [addrError, setAddrError] = useState(false);

  // console.log(">>>>", userIdError);

  // [ 아이디관련 메시지 프리셋 ] ////
  const msgId = [
    // 1. 최소 5글자 이상 입력할것
    "User ID must contain a minimum of 5 characters",
    // 2. 이미 사용중인 아이디임
    "This ID is already in use!",
    // 3. 훌륭한 아이디!
    "That's a great ID!",
  ];

  // [ 기타 메시지 프리셋 ]
  const msgEtc = {
    // 비밀번호
    pwd: "5 to 15 digits in the form of special characters, characters, and numbers",
    // 비밀번호확인
    confPwd: "Password verification does not match",
    // 필수입력
    req: "This is a required entry",
    // 이메일
    email: "Please enter a valid email format",
  }; ///// msgEtc ///////

  // [3] 에러메시지 상태변수 : 초기값 msgId[0]
  // -> 기본 메시지가 출력됨
  const [idMsg, setIdMsg] = useState(msgId[0]);

  // [ 유효성 검사 함수 ] ///////
  // 1. 아이디 유효성 검사 ////////////
  const changeUserId = async (e: any) => {
    // 입력된 값읽기
    let val = e.target.value;

    // 1. 아이디 유효성 검사식(따옴표로 싸지 말것!)
    const valid = /^[A-Za-z0-9+]{5,}$/;
    // 유효성 검사방법: 정규식.test(값)

    // 3. 에러상태 분기하기
    // 3-1. 에러 아닐때 (유효성검사만 통과한 경우)
    if (valid.test(val)) {
      console.log("통과했지만...!");

      // Firebase에서 중복 아이디 검사
      const memRef = collection(db, "mem-data");
      const q = query(memRef, where("uid", "==", val));
      const querySnapshot = await getDocs(q);
      
      // 중복 아이디가 있는지 확인
      const isT = !querySnapshot.empty;
      console.log("중복id있어?", isT);

      // 4. true 일 경우 중복데이터 메시지 표시
      if (isT) {
        // 에러 메시지 업데이트
        setIdMsg(msgId[1]);
        // 에러상태값 업데이트
        setUserIdError(true);
      } ///// if /////
      // 5. false 일 경우 [성공 메시지] 표시
      else {
        // 에러상태값 업데이트 : 에러가 아님!(false)
        setUserIdError(false);
      } ///// else //////
    } /// if /////////////////////////
    // 3-2. 에러일때 : 유효성 검사 에러
    else {
      console.log("에러~!");
      // 에러 메시지 업데이트
      setIdMsg(msgId[0]);
      // 아이디 에러상태 업데이트(true)
      setUserIdError(true);
    } /// else ///

    // 실제 userId 상태변수값이 업데이트 돼야만
    // 화면에 출력된다!
    setUserId(val);
  }; ////////// changeUserId 함수 ////////////

  // 2. 비밀번호 유효성 검사 ///////////
  const changePwd = (e:any) => {
    // 입력된 값읽기
    let val = e.target.value;

    // 1. 비밀번호 유효성 검사식(따옴표로 싸지 말것!)
    const valid = /^.*(?=^.{5,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

    // 2. 입력값 확인 : e.target -> 이벤트가 발생한 요소
    // console.log(val);

    // 3. 에러에 따른 상태값 변경
    if (valid.test(val)) setPwdError(false);
    else setPwdError(true);

    // 4. 기존입력값 반영하기
    setPwd(val);
  }; ///////// changePwd 함수 //////////

  // 3. 비밀번호확인 유효성 검사 ///////////
  const changeChkPwd = (e:any) => {
    // 입력된 값읽기
    let val = e.target.value;

    // 1. 비밀번호 입력내용과 일치여부 확인
    if (pwd === val) setChkPwdError(false);
    else setChkPwdError(true);

    // 2. 기존입력값 반영하기
    setChkPwd(val);
  }; ///////// changeChkPwd 함수 //////////

  // 4. 사용자이름 유효성 검사 ///////////
  const changeUserName = (e:any) => {
    // 입력된 값읽기
    let val = e.target.value;

    // 1. 빈값체크
    if (val !== "") setUserNameError(false);
    else setUserNameError(true);

    // 2. 기존입력값 반영하기
    setUserName(val);
  }; ///////// changeUserName 함수 //////////

  // 5. 이메일 유효성 검사 ///////////
  const changeEmail = (e:any) => {
    // 입력된 값읽기
    let val = e.target.value;

    // 1. 이메일 유효성 검사식(따옴표로 싸지 말것!)
    const valid =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    // 2. 입력값 확인 : e.target -> 이벤트가 발생한 요소
    // console.log(val);

    // 3. 에러에 따른 상태값 변경
    if (valid.test(val)) setEmailError(false);
    else setEmailError(true);

    // 4. 기존입력값 반영하기
    setEmail(val);
  }; ///////// changeEmail 함수 //////////

  // 6. 주소 유효성 검사 ///////////
  const changeAddr = () => {
    // 입력된 값읽기
    // 앞주소(자동입력값)
    let address1 = $(".addr1").val();
    // 뒷주소(직접입력값)
    let address2 = $(".addr2").val();
    // 우편번호(자동입력값)
    let zc = $(".zipcode").val();

    // 2. 빈값체크 : 세 값 모두 빈값이 아니면 에러아님!
    if (address1 !== "" && address2 !== "" && zc !== "") setAddrError(false);
    else setAddrError(true);

    // 3. 기존입력값 반영하기 : 상태변수에 반영함
    // (1) 전체주소값 저장 (앞주소+뒷주소)
    setAddr(address1 + "*" + address2);
    console.log(addr);
    // (2) 우편번호 저장
    setZipcode(zc ? String(zc) : "");
    console.log(zipcode);
  }; ///////// changeUserName 함수 //////////

  // [ 전체 유효성검사 체크함수 ] ///////////
  const totalValid = () => {
    // 1. 모든 상태변수에 빈값일때 에러상태값 업데이트!
    if (!userId) setUserIdError(true);
    if (!pwd) setPwdError(true);
    if (!chkPwd) setChkPwdError(true);
    if (!userName) setUserNameError(true);
    if (!email) setEmailError(true);
    // 주소체크 추가
    if (!addr) setAddrError(true);
    // 우편번호체크 추가
    // -> 주소에러로 등록(우편번호에러값이 따로없음)
    if (!zipcode) setAddrError(true);

    // 2. 통과시 true, 불통과시 false 리턴처리
    // 통과조건 : 빈값아님 + 에러후크변수가 모두 false
    if (
      userId &&
      pwd &&
      chkPwd &&
      userName &&
      email &&
      !userIdError &&
      !pwdError &&
      !chkPwdError &&
      !userNameError &&
      !emailError &&
      // 주소에러항목추가
      !addrError
    )
      return true;
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
      console.log("모두통과! 저장!");

      try {
        // Firebase에 회원정보 저장
        const memRef = collection(db, "mem-data");
        
        // 새로운 데이터 구성하기
        const newData = {
          uid: userId,
          pwd: pwd,
          unm: userName,
          eml: email,
          zcode: zipcode,
          addr: addr,
          // Firebase Timestamp 추가
          createdAt: new Date()
        };

        // Firebase에 데이터 추가
        await addDoc(memRef, newData);

        // 7. 회원가입 환영메시지 + 로그인 페이지 이동
        // 버튼 텍스트에 환영메시지
        const sBtn = document.querySelector(".sbtn") as HTMLButtonElement;
        sBtn.innerText = "Thank you for joining us!";
        // 1초후 페이지 이동 : 라우터 Navigate로 이동함
        setTimeout(() => {
          goPage("/login");
        }, 1000);
      } catch (error) {
        console.error("Error adding document: ", error);
        alert("Registration failed. Please try again.");
      }
    } ///////// if /////////
    // 3. 불통과시 /////
    else {
      console.log($(".msg").eq(0).text());
      alert("Change your input!");
    } //// else ///////////
  }; /////////// onSubmit 함수 //////////

  // 리턴 코드구역 ///////////////
  return (
    <div className="outbx">
      <section className="membx">
        <h2>Join Us</h2>
        <form action="process.php" method="post">
          <ul>
            <li>
              {/* 1. 아이디 */}
              <label>ID : </label>
              <input
                type="text"
                maxLength={20}
                placeholder="Please enter your ID"
                value={userId}
                onChange={changeUserId}
                onBlur={changeUserId}
              />
              {
                // 에러일 경우 메시지 출력
                // 조건문 && 출력요소
                userIdError && (
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
                )
              }
              {
                // 통과시 메시지 출력
                // 조건문 && 출력요소
                // 조건추가 : userId가 입력전일때 안보임처리
                // userId가 입력전엔 false로 리턴됨!
                !userIdError && userId && (
                  <div className="msg">
                    <small
                      style={{
                        color: "green",
                        fontSize: "10px",
                      }}
                    >
                      {msgId[2]}
                    </small>
                  </div>
                )
              }
            </li>
            <li>
              <label>Password : </label>
              <input
                type="password"
                maxLength={20}
                placeholder="Please enter your Password"
                value={pwd}
                onChange={changePwd}
                onBlur={changePwd}
              />
              {
                // 에러일 경우 메시지 출력
                // 조건문 && 출력요소
                pwdError && (
                  <div className="msg">
                    <small
                      style={{
                        color: "red",
                        fontSize: "10px",
                      }}
                    >
                      {msgEtc.pwd}
                    </small>
                  </div>
                )
              }
            </li>
            <li>
              <label>Confirm Password : </label>
              <input
                type="password"
                maxLength={20}
                placeholder="Please enter your Confirm Password"
                value={chkPwd}
                onChange={changeChkPwd}
                onBlur={changeChkPwd}
              />
              {
                // 에러일 경우 메시지 출력
                // 조건문 && 출력요소
                chkPwdError && (
                  <div className="msg">
                    <small
                      style={{
                        color: "red",
                        fontSize: "10px",
                      }}
                    >
                      {msgEtc.confPwd}
                    </small>
                  </div>
                )
              }
            </li>
            <li>
              <label>User Name : </label>
              <input
                type="text"
                maxLength={20}
                placeholder="Please enter your Name"
                value={userName}
                onChange={changeUserName}
                onBlur={changeUserName}
              />
              {
                // 에러일 경우 메시지 출력
                // 조건문 && 출력요소
                userNameError && (
                  <div className="msg">
                    <small
                      style={{
                        color: "red",
                        fontSize: "10px",
                      }}
                    >
                      {msgEtc.req}
                    </small>
                  </div>
                )
              }
            </li>
            <li>
              <label>Address</label>
              {
                /* 다음 우편번호 모듈
                  - 보내줄 값은 내가 정해야함!
                  - 변경체크함수를 프롭스다운시킴!
                */
              }
              <AddressInput changeAddr={changeAddr} zcode={undefined} addr={undefined} />
              {
                // 에러일 경우 메시지 출력
                // 조건문 && 출력요소
                addrError && (
                  <div className="msg">
                    <small
                      style={{
                        color: "red",
                        fontSize: "10px",
                      }}
                    >
                      {msgEtc.req}
                    </small>
                  </div>
                )
              }
            </li>
            <li>
              <label>Email : </label>
              <input
                type="text"
                maxLength={50}
                placeholder="Please enter your Email"
                value={email}
                onChange={changeEmail}
                onBlur={changeEmail}
              />
              {
                // 에러일 경우 메시지 출력
                // 조건문 && 출력요소
                emailError && (
                  <div className="msg">
                    <small
                      style={{
                        color: "red",
                        fontSize: "10px",
                      }}
                    >
                      {msgEtc.email}
                    </small>
                  </div>
                )
              }
            </li>
            <li style={{ overflow: "hidden" }}>
              <button className="sbtn" onClick={onSubmit}>
                Submit
              </button>
            </li>
            <li>
              Are you already a Member?
              <Link to="/login">Log In</Link>
            </li>
          </ul>
        </form>
      </section>
    </div>
  );
}

export default Member;

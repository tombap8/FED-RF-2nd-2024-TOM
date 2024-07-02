// 로그인 페이지 컴포넌트 - Login.jsx
import React from "react";

// CSS 불러오기 (회원가입과 동일)
import "../../css/member.scss";

function Login(props) {
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
  const changeUserId = (e) => {
    // 입력된 값읽기
    let val = e.target.value;

    // 1. 빈값 체크 : 
    // 1-1.빈값아니면 에러아님(false)
    if(val !== "") setUserIdError(false);
    // 1-2.빈값이면 에러임(true)
    else{
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
  const changePwd = (e) => {
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
  const changeChkPwd = (e) => {
    // 입력된 값읽기
    let val = e.target.value;

    // 1. 비밀번호 입력내용과 일치여부 확인
    if (pwd === val) setChkPwdError(false);
    else setChkPwdError(true);

    // 2. 기존입력값 반영하기
    setChkPwd(val);
  }; ///////// changeChkPwd 함수 //////////
  // [ 전체 유효성검사 체크함수 ] ///////////
  const totalValid = () => {
    // 1. 모든 상태변수에 빈값일때 에러상태값 업데이트!
    if (!userId) setUserIdError(true);
    if (!pwd) setPwdError(true);
    if (!chkPwd) setChkPwdError(true);
    if (!userName) setUserNameError(true);
    if (!email) setEmailError(true);

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
      !emailError
    )
      return true;
    // 하나라도 false이면 false를 리턴함!
    else return false;
  }; /////////// totalValid 함수 ///////////

  // [ 서브밋 기능함수 ] ////////////////
  const onSubmit = (e) => {
    // 1. 기본서브밋 막기
    e.preventDefault();

    console.log("최종검사:", totalValid());

    // 2. 유효성검사 전체 통과시
    if (totalValid()) {
      console.log("모두통과! 저장!");

      // [회원정보를 로컬스토리지에 저장하기]

      // 1. 로컬스 체크함수호출(없으면 생성!)
      initData();

      // 2. 로컬스 변수할당
      let memData = localStorage.getItem("mem-data");

      // 3. 로컬스 객체변환
      memData = JSON.parse(memData);

      // 최대수를 위한 배열값 뽑기 (idx항목)
      let temp = memData.map((v) => v.idx);
      // 다음 번호는 항상 최대수+1이다!
      console.log("다음번호:", Math.max(...temp) + 1);

      // 4. 새로운 데이터 구성하기
      let newData = {
        idx: Math.max(...temp) + 1,
        uid: userId,
        pwd: pwd,
        unm: userName,
        eml: email,
      };

      // 5. 데이터 추가하기 : 배열에 데이터 추가 push()
      memData.push(newData);

      // 6. 로컬스에 반영하기 : 문자화해서 넣어야함!
      localStorage.setItem("mem-data", JSON.stringify(memData));
    } ///////// if /////////
    // 3. 불통과시 /////
    else {
      alert("Change your input!");
    } //// else ///////////
  }; /////////// onSubmit 함수 //////////

  // 코드 리턴구역 ////////////////////////
  return (
    <div className="outbx">
      <section className="membx" style={{ minHeight: "300px" }}>
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
            <li style={{ overflow: "hidden" }}>
              <button className="sbtn">Submit</button>
            </li>
          </ul>
        </form>
      </section>
    </div>
  );
}

export default Login;

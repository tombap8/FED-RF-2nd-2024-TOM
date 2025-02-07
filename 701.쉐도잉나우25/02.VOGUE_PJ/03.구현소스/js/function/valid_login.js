// 보그 JS : 로그인 유효성검사 및 기능JS - valid_login.js

export default function validLogin(cbFn) {
  // cbFn : 뷰 메서드를 받아옴!
  console.log("로그인검사~!",cbFn);
  /**************************************** 
        로그인 페이지 유효성 검사
    ****************************************/
  // 검사대상 : #mid, #mpw
  const mid = $("#mid");
  const mpw = $("#mpw");

  // 유효성 검사 기준 : 전송시 아이디,비번 모두 있어야함!

  // 이벤트 대상: #sbtn
  // 이벤트 종류: click
  $("#sbtn").click(function (e) {
    // 기본이동 서브밋 막기!
    e.preventDefault();

    // 공백데이터 처리 함수
    const groSpace = (x) => x.replace(/\s/g, "");

    // 유효성 검사 : 아이디,비번 빈값일 경우 ///////
    if (groSpace(mid.val()) == "" || groSpace(mpw.val()) == "") {
      alert("아이디,비밀번호를 모두 입력해야합니다!");
      // 초기화! + 아이디에 포커스
      mid.val("").focus();
      mpw.val("");
    } ////////// if : 불통과시 ////////
    else {
      // 1. 로컬스 배열 정보 담을 변수
      let temp = [];

      // 2. 회원정보 로컬스 읽어오기
      if (localStorage.getItem("mem-data"))
        temp = JSON.parse(localStorage.getItem("mem-data"));

      console.log(temp);

      // 3. 입력된 아이디 존재 여부
      // 변수 = 배열.find(조건리턴)
      // -> 결과가 undefined면 아이다가 없다는 말임!
      let result = temp.find((v) => {
        // 조건 : 배열의 아이디값 == 입력된 아이디값
        if (v.userid == mid.val()) return true;
      }); ///// find ////

      console.log("결과:", result);

      // 4. 로컬스 조회후 결과는 아래과 같이 나누어짐
      // (1) 아이디가 없음 //////////////////////
      // -> '존재하지 않는 아이디입니다'
      if (!result) {
        // !result는 result변수가 false처리시 들어옴!
        alert("존재하지 않는 아이디입니다");
      } /// if ///

      // (2) 아이디가 있는 경우 //////////////////
      else {
        // (2-1) 아이디가 있으나 비밀번호 틀림
        // -> '비밀번호가 일치하지 않습니다'
        if (result.password != mpw.val()) {
          alert("비밀번호가 일치하지 않습니다");
        } /// if ///

        // (2-2) 로그인 성공 : 첫페이지로 이동(로그인표시)
        // -> '로그인에 성공하였습니다!'
        else {
          // alert("로그인에 성공하였습니다!");
          cbFn(result,"성공한겨!");
        } /// else : 로그인 성공시 ///
      } ///// else : 아이디가 있는 경우 ////
    } /////// else : 아이디,비번 모두입력시 ////////
  }); ////////////// click /////////////////
} /////////// validLogin 함수 ///////////////

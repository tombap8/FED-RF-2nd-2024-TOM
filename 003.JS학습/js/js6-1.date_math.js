// JS6-1.Date객체와 Math객체 JS

// 나의 함수 불러오기
import mFn from "./my_function.js";

// 1. 요구사항: 화면에 시간을 찍으시오
// 2. 대상: .tt
const tt = mFn.qsa(".tt");
console.log(tt);

// 3. 날짜/시간찍기

// 시간날짜함수 최초호출
showTime();
// 시간날짜함수 인터발호출
setInterval(showTime, 1000);

// 시간날짜 함수 ////////
function showTime() {
  // 1. 날짜 내장객체로 날짜객체인스턴스 생성하기
  const today = new Date();

  // 월을 부르는 이름과 매칭하기~!
  let monthName = [
    "하하월",
    "파파월",
    "카카월",
    "토토월",
    "코코푸월",
    "싹스월",
    "칸단월",
    "차즈민월",
    "라우딘월",
    "차호호월",
    "테테월",
    "상그리아월",
  ];

  // 요일을 부르는 이름과 매칭하기~!
  let dayName = ["일", "월", "화", "수", "목", "금", "토"];

  // 2. 년도/월/일/요일찍기
  tt[0].innerText = today.getFullYear();
  // tt[1].innerText = monthName[today.getMonth()];
  tt[1].innerText = today.getMonth() + 1;
  tt[2].innerText = today.getDate();
  tt[3].innerText = dayName[today.getDay()];
  // 월과 요일은 배열순번으로 리턴된다!
  // 왜냐하면 나라마다 월과 요일을 부르는 이름 다르기때문
  // 만약 월을 숫자로 출력하려면 1만 더하면 된다!

  // 3. 시간/분/초찍기
  let H = today.getHours();
  let M = today.getMinutes();
  let S = today.getSeconds();

  // 테스트
  //   H = 18;
  //   M = 2;
  //   S = 3;

  // 12이상이면 오후 아니면 오전
  tt[4].innerText = H >= 12 ? "오후" : "오전";
  // 24시간제로 값이 넘어오기때문에 12를 빼준다!
  H = H > 12 ? H - 12 : H;
  // 시/분/초에서 한자리숫자는 앞에 0 자리수 넣기
  // 0붙이기 리턴함수
  const addZero = (x) => (x < 10 ? "0" + x : x);

  tt[5].innerText = addZero(H);
  tt[6].innerText = addZero(M);
  tt[7].innerText = addZero(S);
} /////////// showTime 함수 /////////////

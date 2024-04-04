// 모듈 연습 메인 JS - main.js

// 공통함수 불러오기
import myFn from "./my_function.js";

// [import 방법1 : 보내준 이름 그대로쓰기]
// import { mTitle, sTitle, personInfo, mvData } from "./text_data.js";

// [import 방법2 : 별칭지어서 쓰기]
// -> 별칭을 지었으면 반드시 별칭으로 사용해야함!
// import {
//   mTitle as mTit,
//   sTitle as sTit,
//   personInfo as pInfo,
//   mvData as mdt,
// } from "./text_data.js";

// [import 방법3 : 한꺼번에 불러오기 - *사용!]
// -> import * as 별칭 from 경로
// -> 별칭 이름으로 한꺼번에 불러온 값을 객체에 담음
// -> 모듈용 전용객체에 저장하여 객체.변수명 으로 사용함
import * as txtData from "./text_data.js";

// 불러온 값확인
// console.log(
//myFn, mTitle, sTitle, personInfo, mvData);
// console.log(myFn, mTit, sTit, pInfo, mdt);
console.log(txtData, txtData.mTitle);

// [export default 로 내보낸 단일 함수 불러오기]
// import makeMessage from "./msg_format.js";
import makeMsg from "./msg_format.js";

console.log(makeMsg);

/**********************************************     
    [ import 형식 ]
    import 전달변수 from 파일경로;

    1. import문법을 쓰려면 호출하는 html script요소에
    type="module" 속성을 반드시 셋팅해야한다!

    2. 반드시 가져올 모듈JS에서 export를 해줘야함!

    3. from 뒤에 경로는 반드시 상대경로일 경우
    같은 위치일 지라도 ./ 표시를 꼭해야함!(없으면 안나옴!) (/,./,../ 표시필수)

    4. 모듈구성은 반드시 서버형식으로 열어야 작동한다!
    (http://...) Live Server로 열기때문에 볼 수 있음!
    -> 로컬파일로 열면 작동안됨!

    [ import의 사용방법 ]
    1. export default인 경우
        -> import 변수 from 경로
        ->>> 변수는 내가 지을 수 있음

    2. export {} 인 경우
        -> import {보내준변수명,...} from 경로

    [ import 시 변수명 변경하기 : 별칭사용하기 ]

    import {전달변수 as 별칭} from 파일경로;
    예) import {mymymy as m} from 파일경로;
    -> 별칭 사용이유:  단순변경요구, 같은이름 변수 피하기

    ____________________________________________

    [ 모듈화를 위한 구성 ]
    1. 데이터 처리하기 위한 JS
    -> text_data.js
    2. 구체적인 데이터 구성처리를 위한 JS
    -> msg_format.js
***************************************************/

// 요구사항 : 각 출력박스에 불러온 메시지 출력하기

// 1. 대상선정 :  출력박스
// (1) 타이틀 출력박스 : .tpart
const titBox = myFn.qs(".tpart");
// (2) 내용 출력박스 : #demo
const contBox = myFn.qs("#demo");
// (3) 영화정보 출력박스 : .mvpart
const mvBox = myFn.qs(".mvpart");

console.log("대상:", titBox, contBox, mvBox);

// 2. 변경적용하기
// (1)  타이틀 출력하기 : 큰제목 + 작은제목
titBox.innerHTML = `
    <h2>${txtData.mTitle}</h2>
    <h3>${txtData.sTitle}</h3>
`;

// (2) 내용 넣기 : 이름과 나이를 소개하는 메시지 넣기
contBox.innerHTML = makeMsg("공유", 46);
contBox.innerHTML += makeMsg("톰행크스", 60);
contBox.innerHTML += makeMsg("졸리", 49);

// 이름과 나이가 셋팅된 personInfo 배열을 순회하여
// 메시지 함수를 호출해서 메시지를 찍어준다!
// txtData.personInfo.forEach(
//     v=>contBox.innerHTML+=makeMsg(v[0],v[1]));

// 길게 변경 : v[0]은 이름, v[1]은 나이
txtData.personInfo.forEach(function (v) {
  contBox.innerHTML += makeMsg(v[0], v[1]);
});



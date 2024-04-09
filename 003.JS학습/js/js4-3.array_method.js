// 배열의 메서드 활용 JS

// 나의 함수 호출
import mFn from './my_function.js';

// 0. 기본정보 셋팅 //////////////////
 // (1) 배열변수 선언과 할당
 const fruit = ["배", "사과", "용과", "딸기"];

 // (2) 과일명과 배경이미지명을 매칭함 -> 객체
 const frObj = {
     배: "fruits_01",
     사과: "fruits_02",
     용과: "fruits_14",
     딸기: "fruits_09",
     두리안: "fruits_17",
     바나나: "fruits_15",
     수박: "fruits_12",
     파인애플: "fruits_13",
     망고: "fruits_24",
     오렌지: "fruits_03",
     체리: "fruits_05",
     멜론: "fruits_11",
     블루베리: "fruits_20",
     레몬: "fruits_04",
     산딸기: "fruits_25.png",
 }; ////////// frObj 객체 /////


// 1. 요구사항 : 
// 배열에 과일정보를 담아서 '과일주세요'버튼 클릭시
// 과일 이미지요소를 화면에 출력해준다!
// 배열구성을 수정, 삭제 등 배열 메서드로 변경할 수 있게 한다!

// 2. 대상선정 : 

// 2-1. 이벤트 대상 : .mbtn (기능버튼들)
const mbtn = mFn.qsa('.mbtn');

// 2-2. 변경 대상 : .showit (배열정보출력) / .cont (과일출력박스)
const showit = mFn.qs('.showit');
const cont = mFn.qs('.cont');

// 2-3. 전체과일콤보박스 : #sel
const sel = mFn.qs('#sel');

// 2-4. 선택과일콤보박스(anum=array number) : #anum
const aNum = mFn.qs('#anum');

// 2-5. 지울개수입력창 : #delnum
const delNum = mFn.qs('#delnum');

// console.log('대상:',mbtn,showit,cont,sel,aNum,delNum);

// 3. 초기화 작업 : 처음배열 출력 / 콤보박스 바인딩

// 3-1. 처음 배열 출력
showit.innerText = fruit.join('♥');
// 배열.join(구분자) : 배열값 사이에 구분자를 넣은 문자열값 변환

// 3-2. 전체과일 콤보박스 바인딩
// 대상: #sel -> sel변수
// 데이터 : frObj 객체 -> 객체의 키를 배열로 변환함!
// -> Object.keys(객체) : 객체의 키(속성명)로 이루어진 배열
// 참고)
// -> Object.values(객체) : 객체의 값(value)로 이루어진 배열

const arrFruits = Object.keys(frObj);
console.log('변환전 객체:',frObj);
console.log('변환후 키배열:',arrFruits);
console.log('변환후 값배열:',Object.values(frObj));
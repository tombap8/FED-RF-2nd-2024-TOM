// 배열의 메서드 활용 JS

// 나의 함수 호출
import mFn from "./my_function.js";

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
  산딸기: "fruits_25",
}; ////////// frObj 객체 /////

// 1. 요구사항 :
// 배열에 과일정보를 담아서 '과일주세요'버튼 클릭시
// 과일 이미지요소를 화면에 출력해준다!
// 배열구성을 수정, 삭제 등 배열 메서드로 변경할 수 있게 한다!

// 2. 대상선정 :

// 2-1. 이벤트 대상 : .mbtn (기능버튼들)
const mbtn = mFn.qsa(".mbtn");

// 2-2. 변경 대상 : .showit (배열정보출력) / .cont (과일출력박스)
const showit = mFn.qs(".showit");
const cont = mFn.qs(".cont");

// 2-3. 전체과일콤보박스 : #sel
const sel = mFn.qs("#sel");

// 2-4. 선택과일콤보박스(anum=array number) : #anum
const aNum = mFn.qs("#anum");

// 2-5. 지울개수입력창 : #delnum
const delNum = mFn.qs("#delnum");

// console.log('대상:',mbtn,showit,cont,sel,aNum,delNum);

// 3. 초기화 작업 : 처음배열 출력 / 콤보박스 바인딩

// 3-1. 처음 배열 출력 //////////////////
// fruit배열 변경시 다시 출력해야하므로 함수로 만들기
const showArray = () => {
  showit.innerText = fruit.join("♥");
  // 배열.join(구분자) :
  // 배열값 사이에 구분자를 넣은 문자열값 변환
}; /////// showArray 함수 ///////////////

// 처음배열출력함수 최초호출은 아랫쪽에서!!!
showArray();

// 3-2. 전체과일 콤보박스 바인딩 //////////////////
// 대상: #sel -> sel변수
// 데이터 : frObj 객체 -> 객체의 키를 배열로 변환함!
// -> Object.keys(객체) : 객체의 키(속성명)로 이루어진 배열
// 참고)
// -> Object.values(객체) : 객체의 값(value)로 이루어진 배열
// -> 변환목적: 배열 메서드를 사용하기 위함!

const arrFruits = Object.keys(frObj);
// console.log('변환전 객체:',frObj);
// console.log('변환후 키배열:',arrFruits);
// console.log('변환후 값배열:',Object.values(frObj));

// 기존배열값을 태그로 변환하여 다시 배열로 할당하기
// -> 배열.map((v,i,arr)=>리턴값) 메서드
// -> 기존 forEach()메서드와 전달값이 같음!
// -> v 배열값, i 순번, arr 전체배열
// ->>> 기본배열값을 순회하면 변환된 값을 다시 넣어줌!
// ->>> 새로운 배열은 새로운 변수에 할당한다!
// ->>> map에 사용한 원본배열은 보존된다!!!
let newArr = arrFruits.map((v) => `<option>${v}</option>`);

// let newArr =
// arrFruits.map(v=>{return `<option>${v}</option>`});

// -> 화살표함수에서 중괄호를 사용하면 return할 경우
// return 키워드를 써줘야함! 따라서 중괄호생략시 리턴키워드
// 자동생략 문법을 사용하면 간단히 표현할 수 있다!

// console.log('map변환후 배열값:',newArr);

// 배열값을 문자화하여 콤보박스에 태그 넣기
// 그냥 배열을 할당하면 콤마가 사이에 들어감!
// 그러므로 join()메서드로 콤마를 없애서 넣는다!
// 빈 문자값 ''을 넣으면 배열값으로만 구성된
// 태그 문자열이 완성된다!!!
sel.innerHTML = newArr.join("");

// 한번에 쓸 수 도 있다!
// sel.innerHTML = Object.keys(frObj)
// .map(v=>`<option>${v}</option>`).join('');
// -> 오브젝트 키쓰 맵쪼잉~!

// 3-3. 선택과일 콤보박스 데이터 바인딩
// 대상: #anum -> aNum변수
// 데이터: fruit 배열
// 갱신시 계속 재바인딩 되어야 함!(함수화 필요!)
aNum.innerHTML = fruit
  .map((v, i) => `<option value="${i}">${v}</option>`)
  .join("");

// 4. 이벤트 설정하기 ///////////////////
mbtn.forEach((ele) => {
  mFn.addEvt(ele, "click", showFruit);
}); /////////// forEach ///////////////

// 5. 함수 만들기 ///////////////////////
// 기능 : 배열을 조작하여 과일을 화면에 출력!
function showFruit() {
  // 1. 버튼 텍스트 읽기
  let btxt = this.innerText;
  // 호출확인
  console.log(btxt);

  // 2. 버튼별 기능분기하기 /////
  // (1) '과일주세요~!' 버튼 : 하단과일 이미지출력
  if (btxt === "과일주세요~!") {
    // 출력박스에 배열정보로 태그넣기
    // 구조: ul>li
    // 과일배열만큼 돌면서 만들기
    let hcode = `<ul>`;
    fruit.forEach((v) => {
      hcode += `
                <li style="
                background:
                url(./addimg/${frObj[v]}.png) 
                no-repeat center/cover">
                    ${v}
                </li>
            `;
    }); ///// forEach ////////

    hcode += `</ul>`;

    // 출력박스에 태그넣기
    cont.innerHTML = hcode;
  } //// if /////
  // (2) '뒷배열추가요~!' 버튼 : push()
  else if (btxt === "뒷배열추가요~!") {
    // 대상: fruit 배열
    // 읽어올곳 : #sel 박스 -> 값은 value
    fruit.push(sel.value);
  } /// else if //////
  // (4) '뒷배열삭제요~!' 버튼 : pop()
  else if (btxt === "뒷배열삭제요~!") {
    // 대상: fruit 배열
    fruit.pop();
  } /// else if //////
  // (5) '앞배열삭제요~!' 버튼 : shift()
  else if (btxt === "앞배열삭제요~!") {
    // 대상: fruit 배열
    fruit.shift();
  } /// else if //////


  // 공통 실행 코드구역 ///////

  // 배열출력함수 호출!
  showArray();

  // fruit 배열확인
  console.log("fruit배열:", fruit);
} ///////// showFruit 함수 /////////////////

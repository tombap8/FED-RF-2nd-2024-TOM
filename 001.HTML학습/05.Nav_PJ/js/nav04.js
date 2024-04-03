// 네비게이션 유형4 JS - nav04.js
// 세로네비 서브별 드롭다운 세로형

const myFn = {
  // 요소선택함수 ////////
  qs: (x) => document.querySelector(x),
  qsEl: (el, x) => el.querySelector(x),
  qsa: (x) => document.querySelectorAll(x),
  qsaEl: (el, x) => el.querySelectorAll(x),

  // 이벤트셋팅함수
  addEvt: (ele, evt, fn) => ele.addEventListener(evt, fn),
}; /////// domFn 객체 /////////////

// 1. 구현요구사항:
// 상위 메뉴 클릭시 하위 메뉴 나타나기
// 영역을 벗어날때 하위메뉴 닫기

// 2. 대상선정
// 이벤트 대상: .gnb>ul>li
const gnbList = myFn.qsa(".gnb>ul>li");
// 변경 대상: .smenu -> 클릭된 이벤트 대상 하위요소
//   const smenu = myFn.qs('.smenu');

console.log("대상:", gnbList);

// 3. 이벤트 설정하기 //////
gnbList.forEach((ele) => {
  // 1. 클릭시 메뉴 열기 / 기타서브 닫기
  myFn.addEvt(ele, "click", showMenu);
  // 2. 마우스떠날때 메뉴 닫기
  //   myFn.addEvt(ele, "mouseleave", hideMenu);
}); //// forEach /////

// 4. 함수 만들기 ////////////
// 4-1. 서브메뉴 보이기 함수 /////
function showMenu() {
  // 1. 하위의 서브메뉴 가져오기 : 서브없으면 null
  let smenu = myFn.qsEl(this, ".smenu");
  // HTML 컬렉션 수집시 요소가 없으면 null값처리함!
  // null도 데이타형이다! if 문에서 false처리됨!
  // null의 뜻은 '빈값'

  // 호출확인
  console.log("보여줘 서브메뉴!", this, smenu);

  // 2. 조건분기 하기 : 서브가 있는 경우 높이값 만들기
  // 높이값은 하위의 ol요소의 높이값을 읽어와서
  // .smenu의 height 값으로 넣어준다!
  if (smenu) {
    // null이 아니면 true처리됨!
    // .smenu가 null 이 아닌경우만 들어옴
    //2. 서브메뉴 ol요소 높이값 읽어오기
    let hval = myFn.qsEl(smenu, "ol").clientHeight;
    // clientHeight는 요소의 높이값

    console.log("높이값:", hval);

    // 3. 높이값 적용하기
    // 대상: .smenu -> smenu변수
    smenu.style.height = (smenu.clientHeight === 0 ? hval : 0) + "px";
    // (smenu의 높이값이 0이냐? 맞으면 높이값 hval적용
    // 아니면 0값 적용하여 열었다/닫았다를 가능하게함!)
  } //////// if : .smenu있는 경우 ///////////

  // -> 서브메뉴가 없는 상위li가 클릭돼도 모두 닫기 처리!!!
  // 4. 기타 다른 서브메뉴가 열렸다면 모두 닫아준다!
  // gnb 상위 li를 모두 순회한다!
  gnbList.forEach((ele) => {
    // ele - 각li요소
    // isSameNode() 메서드 : 순회중 같은노드(요소)
    // 인지 판별해주는 기능을 가짐(같은면 true)
    // -> 여기서 this키워드는 함수를 호출한 li다!

    // 1. 현재 요소가 같은 요소인지 판별하기
    let isSame = ele.isSameNode(this);
    // console.log('서브닫기체크:',ele,isSame);

    // 2. 같은요소가 아닌 경우만 하위 .smenu를 가져옴
    if (!isSame) {
      // !(Not연산자)로 false일때 true변경
      let smenu = myFn.qsEl(ele, ".smenu");
      if (smenu) {
        // 서브메뉴가 있는 경우
        // 서브메뉴의 높이값이 0이 아닌경우
        if (smenu.clientHeight != 0) {
          console.log("0만들어!");
          smenu.style.height = "0px";
        } /// if ///
      } //// if ////
    } /// if ////
  }); ///// forEach ///////
} ////////// showMenu 함수 ///////////

// 4-2. 서브메뉴 숨기기함수 /////////
function hideMenu() {
  // 1. 하위의 서브메뉴 가져오기 : 서브없으면 null
  let smenu = myFn.qsEl(this, ".smenu");
  // 함수호출확인
  console.log("메뉴숨겨!");

  // 2. 분기하기
  if (smenu) {
    // 서브가 있는 경우 높이값 0
    if (smenu.clientHeight != 0) {
      console.log("0만들어!");
      smenu.style.height = "0px";
    } /// if ///
  } /// if ///
} /////// hideMenu 함수 //////////////

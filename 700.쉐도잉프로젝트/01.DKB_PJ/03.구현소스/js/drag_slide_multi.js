// 드래그 기능 + 슬라이드 기능 합친 JS - drag_slide_multi.js

// DOM 모듈함수
import mFn from "./my_function.js";

/// 배너 셋팅을 위한 함수(노출용) /////
export default function setSlide(clsName) {
  // clsName 변수는
  // 슬라이드 전체박스 클래스명 "banbx"가 들어옴

  // [1] 슬라이드 셋팅하기 ////////////
  // 슬라이드 대상요소 : .banbx
  const banBox = mFn.qsa("." + clsName);
  // // console.log("슬라이드 대상:", banBox);

  // 슬라이드 만큼 모두 호출하기!
  banBox.forEach((ele) => {
    // 하위슬라이드 선택요소(드래그 대상요소인 슬라이드)
    // let subSlide = mFn.qsEl(ele, ".slide");
    // -> slideFn함수에서 하위 .slide를 수집하고 있음!
    // 따로 보낼필요 없음!!!

    // 슬라이드 함수 호출하기
    slideFn(ele);
    // 실제 DOM요소를 보낸다!
  }); /////// forEach ///////////
} ///////////// setSlide 함수 //////////

/****************************************** 
    함수명: slideFn
    기능: 로딩 후 버튼 이벤트 및 기능구현
        + 드래그 이동기능(goDrag함수 합침)
 ******************************************/
function slideFn(selEl) {
  // selEl 선택 슬라이드 부모 요소(.banbx)
  // // console.log("슬라이드 함수 호출확인!");

  // 0.슬라이드 공통변수 /////
  // 0-1. 광클금지상태변수 : 0-허용,1-불허용
  let clickSts = 0;
  // 0-2. 슬라이드 이동시간 : 상수로 설정
  const TIME_SLIDE = 400;
  // 0-3. 슬라이드 기준위치값 :
  let originalValue = selEl.offsetWidth * -2.2;
  // -> 슬라이드 가로크기의 2.2배 음수값

  // 1. 대상선정
  // 1-1. 슬라이드 부모요소 : 전달된 선택요소 -> selEl
  const sldWrap = selEl; // DOM요소를 직접 받음!!!
  // 1-2.변경 대상: 선택요소 하위 .slide
  const slide = mFn.qsEl(sldWrap, ".slide");
  // 1-3.슬라이드 하위 li 요소들
  const sList = mFn.qsaEl(slide,"li");
  // 1-4.슬라이드 li개수
  const SLIDE_LENGTH = sList.length;
  // console.log('슬추가:',sList,SLIDE_LENGTH);
  // 1-5.이벤트 대상: 선택요소 하위 .abtn
  const abtn = mFn.qsaEl(sldWrap, ".abtn");
  // 1-6.블릿박스 대상: 선택요소 하위 .indic li
  // let indic = mFn.qsEl(sldWrap, ".indic");

  // 대상확인
  // console.log("대상:", abtn);

  // 1.4. 슬라이드 개수와 동일한 블릿동적생성
  // 대상: .indic -> indic변수

  // 슬라이드개수
  // let sldCnt = mFn.qsaEl(slide, "li").length;

  // for문으로 블릿li생성(0번만 클래스 on넣기)
  // for (let i = 0; i < sldCnt; i++) {
  //   indic.innerHTML += `
  //           <li ${i == 0 ? 'class="on"' : ""}>
  //             <img src="images/img_nav06/dot1.png" alt="흰색">
  //             <img src="images/img_nav06/dot2.png" alt="회색">
  //           </li>
  //       `;
  // } /////// for문 ////////////

  // 블릿li 재선택할당하기 /////
  // indic = mFn.qsaEl(sldWrap, ".indic li");

  // 1.5. li리스트에 순번속성 만들어 넣기
  // 만드는이유: 블릿변경 등에 현재 슬라이드 순번 필요!
  // 사용자 정의 속성은 반드시 'data-'로시작해야함!(W3C규칙)
  // data-seq 로 순번 속성을 넣을 것임!
  slide
    .querySelectorAll("li")
    .forEach((ele, idx) => ele.setAttribute("data-seq", idx));
  // setAttribute(속성명,속성값) -> 속성셋팅 JS내장메서드

  // 2. 이벤트 설정하기 : 버튼요소들 -> forEach()
  abtn.forEach((ele) => mFn.addEvt(ele, "click", goSlide));

  // [ 슬라이드 초기값 셋팅하기 ] //////////
  // 슬라이드 처음에 left 기본값 넣기
  slide.style.left = "0px"; 
  // 슬라이드 처음 트랜지션 기본값 넣기
  slide.style.transition = "left .3s ease-out";
  // 슬라이드 버튼부모박스에 클래스 right 넣기
  abtn[1].parentElement.classList.add("right");
  // parentElement는 선택요소의 직계부모요소를 선택한다!

  // 3. 함수만들기 ///////////////////////////
  /********************************** 
    함수명: goSlide
    기능: 이동버튼 클릭시 이동분기하기
  **********************************/
  function goSlide() {
    // a요소 기본이동 막기
    event.preventDefault();

    // 광클금지 //////////////
    if (clickSts) return; //나가!
    clickSts = 1; //잠금!
    setTimeout(() => (clickSts = 0), TIME_SLIDE); //해제!

    // 호출확인
    // // console.log("나야나!", this, this.classList.contains("ab2"));

    // classList.contains(클래스명)
    // 선택요소에 해당클래스가 있으면 true

    // console.log('슬left:',slide.style.left);
    // console.log('한개당크기:',sList[0].offsetWidth);
    // 슬라이드가 몇개 나가있는지 알아내기
    // left값 / 한개당 개수
    let outCnt = 
    parseInt(slide.style.left) / sList[0].offsetWidth;
    outCnt = Math.abs(outCnt);
    // console.log('바깥에 나간개수:',outCnt);


    // 1. 오른쪽 버튼 여부 알아내기
    let isRight = this.classList.contains("ab2");

    // 2. 버튼분기하기 '.ab2' 이면 오른쪽버튼
    if (isRight) {
      // 오른쪽버튼
      // 오른쪽에서 들어오는 슬라이드함수 호출!
      outCnt++;
    } ////// if //////////////
    else {
      // 왼쪽버튼
      outCnt--;
    } /////// else //////////////

    // 이동적용하기
    slide.style.left = 
    -(sList[0].offsetWidth * outCnt) + "px";

    // 버튼 표시 분기하기
    // (1) 왼쪽이동 한계값체크(오른쪽버튼만 보임)
    if(outCnt == 0){
      abtn[0].parentElement.classList.add("right");
      abtn[0].parentElement.classList.remove("left");
    }
    // (2) 오른쪽이동 한계값체크(왼쪽버튼만 보임)
    // -> 한계값은 전체 개수 빼기 화면노출개수(4)
    else if(outCnt == SLIDE_LENGTH-4){
      abtn[0].parentElement.classList.add("left");
      abtn[0].parentElement.classList.remove("right");
    }
    // (3) 양쪽끝 한계값 이외에는 버튼모두 보이기
    else{
      abtn[0].parentElement.classList.remove("right","left");
    }


    // 3. 블릿순번 변경 함수 호출
    // chgIndic(isRight); // 방향값을 보냄!

    // 4. 자동넘김 멈춤함수 호출하기
    // clearAuto();

    // 5. 중앙 li에 클래스 on넣기
    // slideSeq값은 오른쪽버튼2,왼쪽버튼3
    // let slideSeq = isRight ? 3 : 2;
    // addOnSlide(slideSeq);
  } ////////// goSlide 함수 /////////

  /********************************** 
    함수명: addOnSlide
    기능: 중앙슬라이드 클래스 on처리
  **********************************/
  function addOnSlide(slideSeq) {
    mFn.qsaEl(slide, "li").forEach((ele, idx) => {
      if (idx === slideSeq) ele.classList.add("on");
      else ele.classList.remove("on");
    }); ///// forEach ///////
  } //////////// addOnSlide 함수 ///////////

  /********************************** 
    함수명: chgIndic
    기능: 블릿순번 변경
  **********************************/
  function chgIndic(isRight) {
    // isRight(0-왼쪽,1-오른쪽)
    // 1. 슬라이드 순번과 일치하는 블릿에 클래스 넣기
    // 대상: .indic li -> indic변수
    // 맨앞 슬라이드 li의 'data-seq' 값 읽어오기
    // isRight값이 true이면 오른쪽버튼이고 순번은 [1]
    // isRight값이 false이면 왼쪽버튼이고 순번은 [0]
    let nowSeq = slide
      .querySelectorAll("li")
      [isRight ? 1 : 0].getAttribute("data-seq");

    // // console.log("현재슬라이드 순번:", nowSeq);

    // 2. 해당순번 블릿li에 클래스 on넣기
    // 블릿전체순회시 해당순번에 on넣고 나머지는 on빼기
    indic.forEach((ele, idx) => {
      if (idx == nowSeq) ele.classList.add("on");
      else ele.classList.remove("on");
    }); ///////// forEach ///////////
  } /////////// chgIndic함수 ////////////
  

  /********************************** 
    함수명: rightSlide
    기능: 왼쪽방향 이동(오른쪽버튼)
  **********************************/
  function rightSlide() {
    // 비었다...
  } //////////// rightSlide 함수 ////////////

  /********************************** 
    함수명: leftSlide
    기능: 오른쪽방향 이동(왼쪽버튼)
  **********************************/
  function leftSlide() {
    // 비었다...
  } //////////// leftSlide 함수 ////////////

  /********************************** 
        자동넘기기 기능구현
        -> 일정시간간격으로 오른쪽버튼 클릭
        -> 사용JS내장함수 : setInterval()
        -> 버튼클릭 실행 메서드: click()
        대상: 오른쪽버튼 - .ab2 -> abtn[1]
    **********************************/
  // 인터발변수
  let autoI;
  // 인터발타이밍함수를 변수에 할당후
  // clearInterval(할당변수) 해야 멈출 수 있다!

  // 타임아웃변수
  let autoT;
  // 타임아웃함수도 마찬가지임!
  // clearTimeout(할당변수) 해야 실행 쓰나미를 막을 수 있다!

  /********************************** 
    함수명: slideAuto
    기능: 인터발호출
  **********************************/
  function slideAuto() {
    autoI = setInterval(() => {
      // 오른쪽이동 슬라이드 함수호출
      rightSlide();
      // 블릿변경함수호출(오른쪽은 1)
      // chgIndic(1);
      // 중앙슬라이드 클래스 on넣기 함수 호출
      addOnSlide(3);
      // -> 오른쪽버튼(왼쪽이동)이므로 3를 보냄!

      // // // console.log('실행!');
      // 오른쪽버튼 클릭이벤트 강제발생!
      // 선택요소.click()
      //  abtn[1].click();
    }, 3000);
  } ///////// slideAuto 함수 //////////////

  // 인터발함수 최초호출!
  // slideAuto();

  /********************************** 
    함수명: clearAuto
    기능: 자동넘김을 멈추기(인터발삭제)
  **********************************/
  function clearAuto() {
    // 자동넘김 지우기
    // clearInterval(인터발할당변수)
    // // console.log("멈춤!!!");

    // 1. 인터발 지우기
    clearInterval(autoI);
    // 2. 타임아웃 지우기(재실행호출 쓰나미 방지)
    clearTimeout(autoT);
    // 3. 일정시간후 다시 인터발호출셋팅하기!!!
    autoT = setTimeout(slideAuto, 5000);
    // 결과적으로 5초후 인터발재실행은 하나만 남는다!
  } //////////// clearAuto 함수 ///////////

  /********************************** 
    함수명: coverDrag
    기능: 슬라이드 이동시 드래그막기
  **********************************/
  function coverDrag() {
    // selEl로 전달된 대상에 클래스 on을 줘서
    // 가상요소로 셋팅된 슬라이드 커버가 나오게함
    selEl.classList.add("on");
    // 슬라이드 기본 이동시간(TIME_SLIDE)후 on제거
    setTimeout(() => {
      selEl.classList.remove("on");
    }, TIME_SLIDE);
  } ////////// coverDrag 함수 /////////

  ////////////////////////////////////////////
  ////////// 드래그 기능 구현 구역 /////////////
  /////////////////////////////////////////////

  // 드래그 적용 대상 및 이벤트 설정하기 ////
  // 1. 대상선정 : 보내준 대상 HTML컬렉션
  const dtg = slide;
  // -> slide는 선택박스 하위 슬라이드
  // const dtg = mFn.qs('.dtg2');

  // 드래그할 대상의 CSS 기본값을 셋팅한다!
  // 필수 셋팅요소는 position:relative / top:0 / left:0
  dtg.style.position = "relative";
  // selEl.style.userSelect = "none";
  // selEl.style.webkitUserDrag = "none";
  // dtg.style.top = "0";
  // 배너가 left값 -220% 기준박스에서 이동함
  // .banbx의 width값 곱하기 -2.2
  // 기준위치값 변수에 할당! -> originalValue변수값 할당!
  let leftVal = originalValue;
  // 왼쪽으로 이동할 기준값(기준위치값*1.1)
  let valFirst = leftVal * 1.1;
  // 오른쪽으로 이동할 기준값(기준위치값*0.9)
  let valSecond = leftVal * 0.9;
  // console.log("기준값:", leftVal);
  // console.log("기준값의 110%:", valFirst);
  // console.log("기준값의 90%:", valSecond);
  // left위치값 최초셋업! -> px단위 꼭 쓸것!!!
  // dtg.style.left = leftVal + "px";

  // 2. 변수 셋팅 ///////////////////////
  // (1) 드래그 상태 변수 만들기
  let dragSts = false;
  // false는 드래그 아님, true는 드래그 상태!

  // (2) 첫번째 위치 포인트 : first x, first y
  let firstX;

  // (3) 마지막 위치 포인트 : last x, last y
  // -> 최초위치 셋팅값으로 프리셋팅!
  let lastX = 0;
  // -> 중첩된 최종위치가 처음에는 계산되지 않았으므로
  // 출발위치인 0값으로 초기값을 넣어준다!
  // 초기값을 안넣으면 최초에 값을 더할때 에러가 발생한다!

  // (4) 움직일때 위치 포인트 : move x, move y
  let moveX;

  // (5) 위치이동 차이 계산 결과변수 : result x, result y
  let resultX;

  //////////////////////////////////
  // 3. 함수 만들기 /////////////////
  // 할당형 함수를 만들경우 이벤트 설정보다 위에서 만들어준다!

  // (1) 드래그 상태 true 로 변경하는 함수
  const dTrue = () => (dragSts = true);

  // (2) 드래그 상태 false 로 변경하는 함수
  const dFalse = () => (dragSts = false);

  // (3) 드래그 상태시 처리함수
  const dMove = (e) => {
    if (dragSts) {      

      // 1. 드래그 상태에서 움질일대 포인터 위치값
      
      // DT용 코드와 Mobile코드를 동시에 셋팅할 수 있다!
      moveX = e.pageX || e.touches[0].screenX;

      // 2. 움직일 위치 결과값
      // 움직일때 위치 포인트 - 첫번째 위치 포인트
      resultX = moveX - firstX;

      // 3. 이동차를 구한 resultX,resultY값을 대상 위치값에 적용
      // 대상 : 드래그 요소 dtg
      dtg.style.left = resultX + lastX + "px";

      // 4. 양쪽끝에서 튕겨서 제자리 보내기
      // (1) 현재 리스트 li 수집하기
      let currList = mFn.qsaEl(dtg,"li");
      // (2) 리스트 길이(개수)
      let listLength = currList.length;
      // (3) 리스트 한개당 크기(li가로크기)
      let oneSize = currList[0].offsetWidth;
      // (4) 마지막위치 한계값 left
      // -> 히든박스width - 전체 슬라이드 width
      // 전체 슬라이드 width = li한개당width * 슬라이드개수
      let limitSize = 
      selEl.offsetWidth - (oneSize * listLength);
      // console.log('마지막한계left:',limitSize);

      // 4-1. 맨앞에서 튕기기 ////////////
      if(parseInt(dtg.style.left)>0){
        // 약간의 시간간격으로 조금 간후 튕겨서 돌아오는 효과
        setTimeout(() => {
          // left 값 0
          dtg.style.left = "0";
          // 마지막 위치값 0
          lastX = 0;
        }, 200);

        // 버튼처리하기(오른쪽버튼만 보임)
        abtn[0].parentElement.classList.remove("left");
        abtn[0].parentElement.classList.add("right");
      } ////// if /////////

      // 4-2. 맨뒤에서 튕기기 ////////////
      else if(parseInt(dtg.style.left)<limitSize){
        // 약간의 시간간격으로 조금 간후 튕겨서 돌아오는 효과
        setTimeout(() => {
          // left 값 0
          dtg.style.left = limitSize + "px";
          // 마지막 위치값 0
          lastX = limitSize;
        }, 200);

        // 버튼처리하기(왼쪽버튼만 보임)
        abtn[0].parentElement.classList.add("left");
        abtn[0].parentElement.classList.remove("right");
      } ////// else if /////////
      // 그밖의 경우는 버튼 모두 보이기
      else{
        abtn[0].parentElement.classList.remove("left","right");
      } ////// else /////////



    } /////// if ////////

    // 드래그 중(dragSts===true)일때는 주먹손(grabbing),
    // 드래그아닐때(dragSts===false) 편손(grab)
    dtg.style.cursor = dragSts ? "grabbing" : "grab";
  }; ///////// dMove 함수 /////////////////

  // (4) 첫번째 위치포인트 셋팅함수 : firstX, firstY 값셋팅
  const firstPoint = (e) => {
    // DT용값과 Mobile값을 동시에 OR문으로 할당함!
    firstX = e.pageX || e.touches[0].screenX;
    // firstX = e.pageX;
    // firstY = e.pageY;
    // // console.log("첫포인트:", firstX);
  }; ///////// firstPoint 함수 //////////

  // (5) 마지막 위치포인트 셋팅함수 : lastX, lastY 값셋팅
  // -> 왜필요하지? 이동후 결과위치를 저장하여 다음 드래그 이동시
  // 그 결과를 중첩하여 반영하기 위해 필요함!!!
  const lastPoint = () => {
    // 이동결과 계산된 최종값을 기존값에 더함(+=)
    lastX += resultX;
    // // console.log("끝포인트:", lastX);
  }; ///////// lastPoint 함수 //////////

  // (6) 슬라이드 드래그 이동구현
  // -> mouseup / touchend 이벤트 발생시 호출함!
  const moveDragSlide = () => {
    // 중앙li순번 방향별 셋팅하기
    let slideSeq = 2; // 왼쪽버튼(오른쪽이동)
    // 만약 오른쪽버튼 왼쪽이동일 경우 순번은 3이된다!
    // 업데이트는 오른쪽일 경우에만 해준다!
    // 기타일 경우는 세번째 순번인 2를 유지한다!

    // 대상의 left값 찍기(px단위를 parseInt()로 없애기!)
    let currentLeft = parseInt(dtg.style.left);
    // console.log("슬라이드left:", currentLeft, "X축순수이동값:", resultX);

    // 대상 슬라이드 이동기준 분기하기
    if (currentLeft < valFirst) {
      // console.log("왼쪽으로 이동!!!");
      // 오른쪽버튼 클릭시 왼쪽이동과 동일!
      // rightSlide() 함수 호출함!
      rightSlide();
      // on넣을 li순번 업데이트
      slideSeq = 3;
    } /// if ///
    else if (currentLeft > valSecond) {
      // console.log("오른쪽으로 이동!!!");
      // 왼쪽버튼 클릭시 오른쪽이동과 동일!
      // leftSlide() 함수 호출함!
      // 슬라이드 이동함수 호출시 드래그시 이동된값이
      // 계산된 -330%값을 보내준다!
      let resVal = selEl.offsetWidth * -3.3 + resultX;
      leftSlide(resVal + "px");
    } /// else if ///
    else {
      // valFirst와 valSecond의 사이범위
      // console.log("제자리!!!");
      slide.style.left = "-220%";
      slide.style.transition = ".3s ease-in-out";
    } /// else ////

    // 드래그 시 더해지는 마지막 위치값 lastX를
    // -220%의 left px 값으로 초기화해준다!(숫자만!)
    lastX = originalValue;
    // -> 이것을 해야 오작동이 없다!!!

    // 중앙 li에 클래스 on넣기
    // slideSeq값은 오른쪽버튼2,왼쪽버튼3
    addOnSlide(slideSeq);

    // 블릿변경함수호출 : 오른쪽이 3 일때 true
    // chgIndic(slideSeq === 3 ? true : false);
  }; ////////// moveDragSlide 함수 /////////////

  // (7) 슬라이드 확정위치 이동함수 ////////
  const fixedPosition = () => {
    // 중간위치일때 배너 위치 수정하기 /////
    // (1) 현재 리스트 li 수집하기
    let currList = mFn.qsaEl(dtg,"li");
    // (2) 리스트 한개당 크기(li가로크기)
    let oneSize = currList[0].offsetWidth;
    // (3) 한개li크기로 현재 left위치크기를 나누어서
    // 소수점 아래결과는 반올림해준다! -> 특정위치로 이동함!
    let divideNum = parseInt(dtg.style.left) / oneSize;
    // console.log('나눈수:',divideNum);
    divideNum = Math.round(divideNum);
    // console.log('나눈수 반올림:',divideNum);
    divideNum = Math.abs(divideNum);
    // console.log('나눈수 반올림후 절대값:',divideNum);

    // 특정위치로 이동하기 : 한개당크기 * 개수
    dtg.style.left = -(oneSize * divideNum) + "px";
    // -> 위치값은 마이너스임!

  }; // fixedPosition 함수 ////////////////


  //////////////////////////////////////
  // 4. 드래그 이벤트 설정하기 //////////

  // (1) 마우스 다운 이벤트 함수연결하기
  mFn.addEvt(dtg, "mousedown", (e) => {

    // 드래그 상태값 true로 변경!
    dTrue();
    // 첫번째 위치포인트 셋팅!
    firstPoint(e);
    // 단독할당되지 않고 내부 함수호출로 연결되어있으므로
    // 이벤트 전달을 토스해줘야 한다!(전달변수 e)

    // 마우스 다운시 주먹손!
    dtg.style.cursor = "grabbing";

  }); ///////// mousedown //////////

  // (2) 마우스 업 이벤트 함수연결하기
  mFn.addEvt(dtg, "mouseup", (e) => {
    // 0. 자동넘김 멈춤함수 호출하기
    // clearAuto();

    // 드래그 상태값 false로 변경!
    dFalse();
    // 마지막 위치포인트 셋팅!
    lastPoint(e);

    // 마우스 업시 편손!
    dtg.style.cursor = "grab";

    // 드래그 슬라이드 이동함수 호출!
    // moveDragSlide();

    // 슬라이드 위치확정 이동함수 호출!
    fixedPosition();

    // // console.log("마우스 업!", lastX);
  }); ///////// mouseup //////////

  // (3) 마우스 무브 이벤트 함수연결하기
  mFn.addEvt(dtg, "mousemove", dMove);
  //////////// mousemove /////////////

  // (4) 마우스가 대상을 벗어나면 드래그상태값 false처리하기
  mFn.addEvt(dtg, "mouseleave", () => {
    
    setTimeout(dFalse, 0);
    
    // 슬라이드 위치확정 이동함수 호출!
    fixedPosition();
    
    // 마우스가 벗어나면 이동판별함수 호출!
    // if(dragSts) moveDragSlide();
  }); ///////// mouseleave //////////

  //////////// 모바일 이벤트 처리 구역 //////////

  // (1) 터치스타트 이벤트 함수연결하기
  mFn.addEvt(dtg, "touchstart", (e) => {

    // 드래그 상태값 true로 변경!
    dTrue();
    // 첫번째 위치포인트 셋팅!
    firstPoint(e);

  }); ///////// touchstart //////////

  // (2) 터치엔드 이벤트 함수연결하기
  mFn.addEvt(dtg, "touchend", () => {
    // 0. 자동넘김 멈춤함수 호출하기
    // clearAuto();

    // 드래그 상태값 false로 변경!
    dFalse();
    // 마지막 위치포인트 셋팅!
    lastPoint();

    // 드래그 슬라이드 이동함수 호출!
    // moveDragSlide();

    // // console.log("터치엔드!", dragSts);
  }); ///////// touchend //////////

  // (3) 터치무브 이벤트 함수연결하기
  mFn.addEvt(dtg, "touchmove", dMove);
  //////////// touchmove /////////////
  
  // (4) 컨트롤 마우스 엔터처리 삭제함!

  // (5) 브라우저 크기 리사이즈시 동적 변경값 업데이트함수
  mFn.addEvt(window, "resize", () => {
    // 1. 기준위치값 left 업데이트
    originalValue = selEl.offsetWidth * -2.2;
    // 2. 기준위치값으로 실제 슬라이드 CSS left값 변경하기
    slide.style.left = originalValue + "px";
    // 3. 초기left값 셋팅
    leftVal = originalValue;
    // 4. 왼쪽으로 이동할 기준값(기준위치값*1.1)
    valFirst = leftVal * 1.1;
    // 5. 오른쪽으로 이동할 기준값(기준위치값*0.9)
    valSecond = leftVal * 0.9;
  }); ////////////// resize함수 //////////////////


  // 해당 슬라이드 박스 (selEl) 휠이벤트 
  // 기본기능막기 + 버블링막기
  mFn.addEvt(selEl, "wheel", (e) => {
    console.log(111);
    e.preventDefault();
    e.stopPropagation();
  }); ///////// wheel //////////

} /////////////// slideFn 함수 ///////////////
/////////////////////////////////////////////

// 05. 드래그 기본 JS - drag.js

// 나의 함수 불러오기
import mFn from './my_function.js';


/*************************************** 
    [ 드래그 기능 구현을 위한 이벤트 ]
    1. 딸 -> 마우스 포인터 누름 -> mousedown

    2. 각 -> 마우스 포인터 올라옴 -> mouseup

    3. 질질 -> 마우스 움직일때 -> mousemove
    -> 드래그 상태는 "딸"상태에서 "질질"하는것!
    
    mousedown 할때 드래그 상태변수값을 true로 변경
    mouseup 할때 드래그 상태변수값을 false으로 변경
    _______________________________________

    [ 드래그 기능구현 원리 ]

    1. 마우스 포인터 위치에 따른 변화 수치를
    계산하여 요소의 top,left 위치값으로 반영한다!

    2. 프로세스
    (1) mousedown 이벤트에서는 시작위치값 저장
    -> 모바일 이벤트 : touchstart
    (2) mousemove 이벤트에서는 움직인위치와 시작위치 차이저장
    -> 모바일 이벤트 : touchmove
    (3) mousemove에서 차이값을 타겟요소의 left,top값에 반영
    (4) mouseup 이벤트에서는 다음 이동을 위한 마지막위치 저장
    -> 모바일 이벤트 : touchend
    (5) mousemove 이벤트에서 마지막위치로 부터의 이동을 계산함


***************************************/

// 드래그 적용 대상 및 이벤트 설정하기 ////
// 1. 대상선정 : .dtg2
const dtg = mFn.qs('.dtg2');

// 2. 변수 셋팅 ///////////////////////
// (1) 드래그 상태 변수 만들기
let dragSts = false;
// false는 드래그 아님, true는 드래그 상태!
// (2) 첫번째 위치 포인트 : first x, first y
let firstX, firstY;
// (3) 마지막 위치 포인트 : last x, last y
let lastX = 0, lastY = 0;
// -> 마지막 위치로 부터 처음 계산이 이루어지므로 초기값 0
// (4) 움직일때 위치 포인트 : move x, move y
let moveX, moveY;
// (5) 위치이동 차이 계산 결과변수 : result x, result y
let resultX, resultY;

//////////////////////////////////
// 3. 함수 만들기 /////////////////
// 할당형 함수를 만들경우 이벤트 설정보다 위에서 만들어준다!

// (1) 드래그 상태 true 로 변경하는 함수
const dTrue = () => dragSts = true;

// (2) 드래그 상태 false 로 변경하는 함수
const dFalse = () => dragSts = false;

// (3) 드래그 상태시 처리함수 
const dMove = (e) => { // e - 이벤트 객체 전달변수
    // 드래그 상태는 dragSts값이 true인 경우에만 허용!
    if(dragSts){
        // console.log('드래그중~!');

        // 1. 드래그 상태에서 움질일대 포인터 위치값
        // - 브라우저용 포인터 위치는 pageX, pageY를 사용!
        moveX = e.pageX;
        moveY = e.pageY;

        // 2. 움직일 위치 결과값
        // 움직일때 위치 포인트 - 첫번째 위치 포인트
        // moveX - firstX
        // moveY - firstY
        resultX = moveX - firstX;
        resultY = moveY - firstY;
        // -> 순수하게 움직인 거리를 계산함!


        // 값확인
        console.log(`moveX: ${moveX}, moveY: ${moveY}`);
        console.log(`resultX: ${resultX}, resultY: ${resultY}`);


    } //// if ////////
}; ///////// dMove 함수 /////////////////

// (4) 첫번째 위치포인트 셋팅함수 : firstX, firstY 값셋팅
const firstPoint = e => {
    firstX = e.pageX;
    firstY = e.pageY;
    console.log('첫포인트:',firstX,' | ',firstY);
}; ///////// firstPoint 함수 //////////

// (5) 마지막 위치포인트 셋팅함수 : lastX, lastY 값셋팅
const lastPoint = e => {
    lastX = e.pageX;
    lastY = e.pageY;
    console.log('끝포인트:',lastX,' | ',lastY);
}; ///////// lastPoint 함수 //////////



// 4. 드래그 이벤트 설정하기 //////////
// (1) 마우스 다운 이벤트 함수연결하기
mFn.addEvt(dtg,'mousedown',(e) => {
    // 드래그 상태값 true로 변경!
    dTrue();
    // 첫번째 위치포인트 셋팅!
    firstPoint(e);
    // 단독할당되지 않고 내부 함수호출로 연결되어있으므로
    // 이벤트 전달을 토스해줘야 한다!(전달변수 e)

    console.log('마우스 다운!',dragSts);
}); ///////// mousedown //////////

// (2) 마우스 업 이벤트 함수연결하기
mFn.addEvt(dtg,'mouseup',(e) => {
    // 드래그 상태값 false로 변경!
    dFalse();
    // 마지막 위치포인트 셋팅!
    lastPoint(e);

    console.log('마우스 업!',dragSts);
}) ///////// mouseup //////////

// (3) 마우스 무브 이벤트 함수연결하기
mFn.addEvt(dtg,'mousemove',dMove); 
//////////// mousemove /////////////

// (4) 마우스가 대상을 벗어나면 드래그상태값 false처리하기
mFn.addEvt(dtg,'mouseleave',()=>{
    // 드래그 상태값 false로 변경!
    dFalse();
    console.log('마우스나감!',dragSts);
}); ///////// mouseleave //////////



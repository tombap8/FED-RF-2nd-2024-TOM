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

// 2. 드래그 상태 변수 만들기
let dragSts = false;
// false는 드래그 아님, true는 드래그 상태!

// 3. 드래그 이벤트 설정하기
// (1) 마우스 다운 이벤트 함수연결하기
mFn.addEvt(dtg,'mousedown',() => {
    // 드래그 상태값 true로 변경!
    dragSts = true;
    console.log('마우스 다운!',dragSts);
}); ///////// mousedown //////////

// (2) 마우스 업 이벤트 함수연결하기
mFn.addEvt(dtg,'mouseup',() => {
    // 드래그 상태값 false로 변경!
    dragSts = false;
    console.log('마우스 업!',dragSts);
}) ///////// mouseup //////////

// (3) 마우스 무브 이벤트 함수연결하기
mFn.addEvt(dtg,'mousemove',()=>{
    // 드래그 상태는 dragSts값이 true인 경우에만 허용!
    if(dragSts){
        console.log('드래그중~!');
    } //// if ////////
}); ///////// mousemove //////////

// (4) 마우스가 대상을 벗어나면 드래그상태값 false처리하기
mFn.addEvt(dtg,'mouseleave',()=>{
    // 드래그 상태값 false로 변경!
    dragSts = false;
    console.log('마우스나감!',dragSts);
}); ///////// mouseleave //////////



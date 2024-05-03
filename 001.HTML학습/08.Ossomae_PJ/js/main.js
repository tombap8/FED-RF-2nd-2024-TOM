// 옷소매 갤러리 JS - main.js

import mFn from "./my_function.js";

/*********************************************************** 
    1. 기능정의: 
        버튼 클릭시 갤러리박스를 잘라서 앞/뒤로 이동함

    1-1. 오른쪽버튼 클릭시 - 맨앞div 맨뒤로 이동
        -> 갤러리부모박스.appendChild(맨앞자식div)

    1-2. 왼쪽버튼 클릭시 - 맨뒤div 맨앞으로 이동
        -> 갤러리부모박스.insertBefore(맨뒤자식div,맨앞자식div)
 ***********************************************************/

    // 1. 대상선정 

    // 1-1. 이벤트 대상: .abtn (이동버튼들)
    const abtn = mFn.qsa(".abtn");

    // 1-2. 변경대상: .gbx (갤러리 부모박스)
    const gbx = mFn.qs(".gbx");

    // console.log(abtn,gbx);

    // 2. 이벤트 설정하기 //////////
    abtn.forEach(ele=>{
        mFn.addEvt(ele,"click",changeSlide);
    }); /// forEach ////

    // 3. 변수설정하기 ////////
    // 광클금지 변수(true면 금지, false는 허용)
    let stopClick = false;
    // 애니시간(잠금시간)
    const TIME_SLIDE = 400;

    // 4. 함수만들기 ////////////
    // 갤러리 이동하기 함수
    function changeSlide(){

        // 1. 버튼 구분하기
        let isR = this.classList.contains("rb");
        // classList.contains(클래스명) 
        // -> 해당클래스명이면 true

        console.log("나야나~!",isR);

    } ////////changeSlide 함수 //////////////
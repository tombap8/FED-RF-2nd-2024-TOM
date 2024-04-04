// 공통함수 JS - my_function.js

// 객체를 내보내기 : 변수선언과 이름없이 바로 직접 내보냄!
// const myFn = 
// -> 선언과 할당후 export default하려면 하단에서 해야함!
export default {
    // 요소선택함수 ////////
    qs: (x) => document.querySelector(x),
    qsEl: (el, x) => el.querySelector(x),
    qsa: (x) => document.querySelectorAll(x),
    qsaEl: (el, x) => el.querySelectorAll(x),
  
    // 이벤트셋팅함수
    addEvt: (ele, evt, fn) => ele.addEventListener(evt, fn),
  
    // 바운딩위치값함수
    getBCR: (ele) => ele.getBoundingClientRect().top,
  
    // 옵셋탑값 반환함수
    getOT: (ele) => ele.offsetTop,
  };
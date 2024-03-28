// DKB PJ 메인 JS - main.js //////////////

// 모듈로 호출된 JS에서는 다른 외부JS를 import로 호출가능!
// import하려는 파일에서 반드시 함수,변수 등을 export해야함!
import slideFn from "./slide.js";

console.log('모듈로 메인JS호출!!!', 
document.querySelector('.top-menu'));

// slideFn 슬라이드 기능함수 호출!
slideFn();
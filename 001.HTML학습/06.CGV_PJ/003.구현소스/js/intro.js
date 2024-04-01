// CGV PJ 인트로 페이지 JS - intro.js

// 요구사항 : 비디오 플레이가 끝나면 첫페이지인
// main.html로 자동이동하기

// 대상: #myvid
const myvid = document.querySelector('#myvid');

// 이벤트: timeupdate -> 동영상재생중 발생이벤트
myvid.addEventListener('timeupdate',()=>{
    // 1. 동영상 멈춤여부 알아내기 : 
    // -> 비디오요소.paused => 멈춤상태면 true, 아니면 false
    let isStop = myvid.paused;
    // 호출확인
    console.log('재생중!',isStop);

}); ///////// timeupdate 이벤트 함수 //////////
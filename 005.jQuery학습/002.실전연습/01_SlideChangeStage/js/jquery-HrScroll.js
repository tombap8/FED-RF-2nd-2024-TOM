// 가로 방향 스크롤 구현 JS

// 1. 대상요소 :  html,body
const scTarget = $("html,body");

// 2. 스크롤 이벤트 설정 및 기능구현하기
// 제이쿼리에서 전체 스크롤/휠 이벤트 작성시
// 대상은 항상 html,body 로 두개 모두 잡아준다!
// 참고로 document나 window는 사용안됨!
// 이벤트 메서드: on(이벤트명,함수)

// 스크롤 위치값변수
let scPos = 0;

let winW = $(window).width();
let pgCnt = $(".page").length;

// 최대한계값 : (전체이동박스크기) - 화면가로크기
let maxLimit = (winW*pgCnt) - winW; 

console.log(
    "window크기:",winW,
    "/페이지수:",pgCnt,
    "/최대한계값:",maxLimit);

scTarget.on("wheel",(e)=>{
    // 스크롤이동을 위한 제이쿼리 속성
    // 1. scrollTop : 세로스크롤바위치
    // 2. scrollLeft : 가로스크롤바위치

    // 휠방향 알아내기(전체이벤트객체로 부터 얻어옴)
    let delta = event.wheelDelta;
    
    if(delta<0) scPos += 200;
    else scPos -= 200;

    // 한계값 체크
    // (1) 최소한계 : 0
    if(scPos <= 0) scPos = 0;
    // (2) 최대한계 : 전체이동박스크기-화면가로크기
    if(scPos >= maxLimit) scPos = maxLimit;

    // scPos = scPost + 200;
    console.log("스위:",scPos,delta);


    // animate({CSS설정},시간,이징,함수)
    // stop() 메서드 : 큐에 쌓인 애니메이션을 지운다!
    // 중간에 쌓인 애니를 지우고 최종애니만 실행한다!
    scTarget.stop().animate({
        scrollLeft: scPos+"px"},500)

}); //////////// wheel 이벤트 구역 //////////
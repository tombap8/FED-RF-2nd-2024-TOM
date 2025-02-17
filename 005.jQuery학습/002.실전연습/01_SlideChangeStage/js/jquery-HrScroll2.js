// 제이쿼리로 구현한 가로방향 스크롤 JS : 
// jquery-HrScroll2.js

// 전체 마우스 휠 이벤트를 정지시킴!
// overflow:hidden 설정을 html,body에 했으므로
// 스크롤이 되지 않는다!
// (휠 이벤트는 발생하지만 작동은 하지 않는다!)

// 휠 이동수치변수
let wNum = 0;

// 화면크기
let winW = $(window).width();

// 마지막 한계값
let limit = winW*7 - winW;
console.log('이동한계:',limit);

// 이벤트 대상: html,body
// 이벤트 종류: wheel
$('html,body').on('wheel',()=>{
    // 1. 휠방향
    let dir = event.wheelDelta;

    // 2. 방향에 따른 값 증감
    if(dir<0) wNum += 100;
    else wNum -= 100;

    // 3. 한계값 지정
    if(wNum<0) wNum = 0;
    else if(wNum>limit) wNum = limit;

    // wNum = wNum + 100;
    console.log('휠~~~', event.wheelDelta,wNum);


    // 휠방향 : 델타값으로 알아냄! (event.wheelDelta)
    // -> 값증가(오른쪽이동) : 음수값
    // -> 값감소(왼쪽이동) : 양수값

    // 변경대상: html,body 가로스크롤
    // -> scrollLeft 속성사용!
    // 애니메이션 큐에 쌓인 것 처리는 stop() 메서드로!
    // 이전 애니메이션은 지우고 마지막 걸린 애니만 마무리함!

    // 4. 실제 가로스크롤 이동 애니메이션주기
    $('html,body').stop().animate({
        scrollLeft: wNum + 'px'
    },2000,'easeOutQuart');
}); ///////////// wheel 이벤트 함수 //////////

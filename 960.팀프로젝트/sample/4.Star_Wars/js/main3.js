// 스타워즈 메인 페이지 JS - main.js

// 요소 선택함수 ///////////////
const qs =  x => document.querySelector(x);
const qsa =  x => document.querySelectorAll(x);

////////// 로드 구역 //////////

window.addEventListener("DOMContentLoaded",()=>{
    // console.log("complete");

    /***************************************
     
        [ 포스터 메뉴 클릭 시 클래스 주기]

        - 포스터 메뉴 클릭 시 해당 li에 클래스
        "on"을 주고 나머지 li는 "on"을 모두 지
        워서 선택된 li만 일어서있는 css가 적용
        되게 한다.

    ***************************************/
   // 1. 대상 선정: .m_gnb ul>li -> 이벤트 + 변경대상 일치
   const gnb = qsa(".m_gnb ul>li");
   console.log(gnb);
   
   // 2. 클릭이벤트 함수 설정
   // for of문 사용 -> 배열/컬렉션
   for(let x of gnb){ // x = 각 li요소
    x.onclick = ()=>{
        console.log(x);

        // li에 클래스 초기화
        gnb.forEach(ele=>ele.classList.remove("on"));
        // forEach((요소,순번,객체)=>{코드});

        // 클릭된 li에 클래스 "on" 넣기
        x.classList.add("on");
        // classList 객체 사용
        // add() 메서드 사용

    }; // click 함수 ///////////////
   } // for of문 //////////////////
}); // 로드구역 //
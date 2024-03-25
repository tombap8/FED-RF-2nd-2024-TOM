// CGV PJ 메인 페이지 JS - main.js

/*********************************** 
    [ 요구사항분석 ]
    1. 영화포스터 메뉴 클릭시
    해당 예고편을 메인 아이프레임에
    상영되도록 아이디를 매칭하여
    src 속성을 변경해 준다!

    2. 이때 자동재생 옵션을 추가하여
    src 변경시 바로 동영상이 재생되게함!

    3. 영상이 끝나면 다시 처음부터 재생되게
    옵션을 추가해 준다!
***********************************/
// 1. 대상선정
// 1-1. 이벤트 대상 : .poster-menu a
const pMenu = document.querySelectorAll(".poster-menu a");
// 1-2. 변경 대상 : #ifr
const ifr = document.querySelector("#ifr");

console.log("대상:", pMenu, ifr);

// 2. 영화아이디 정보 객체로 구성하기
const movieId = {
  파묘: "rjW9E1BR_30",
  이프온리: "WGFapljXfnU",
  웡카: "Bldf9SWRPFM",
  시민덕희: "Qwhmn6Dimsg",
  소풍: "7VHsScXQyw0",
  "듄:파트2": "4JElrZ1WB40",
};

// 3. 이벤트 설정 및 기능구현
// 포스터 버튼에 forEach()메서드로 순회한다!
pMenu.forEach((ele) => {
  ele.onclick = () => {
    // 1.클릭된 a요소를 구분하기 위해
    // 하위 img 포스터의 alt 속성 읽어오기
    // 속성읽기 내장함수 : getAttribute(속성명)
    let txt = ele.querySelector("img").getAttribute("alt");
    console.log("나클릭!", txt);

    // 2. 아이프레임 src변경하기
    // 속성변경 JS내장함수
    // -> setAttribute(속성명,값)
    // 대상: 아이프레임 (#ifr->ifr변수)
    // 영화아이디값 -> movieId객체
    // 객체호출법 : movieId[영화이름속성명]
    // 영화이름속성명은 txt변수에 할당되어 있음
    // 객체호출코드 : movieId[txt]
    ifr.setAttribute(
      "src",
      `https://www.youtube.com/embed/${movieId[txt]}?autoplay=1`
    );
  }; /// click함수 ////
}); //// forEach /////

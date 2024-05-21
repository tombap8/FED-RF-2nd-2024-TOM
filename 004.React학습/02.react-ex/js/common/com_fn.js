// 공통 처리 JS - com_fn.js

// 초이스 인트로 애니 실행함수
const choiceIntroAni = () => {
  // 타이틀 애니 ////
  $(".tit span")
    .css({ display: "inline-block" })
    .animate({ scale: "200%" }, 1000)
    .animate({ scale: "100%" }, 1000);

  // 초이스 메인 이미지 애니 ///
  $(".img-box img").delay(700).fadeTo(1000, 1);
  // 소제목 애니
  $(".stit").delay(1500).fadeTo(1000, 1);

  // fadeTo(시간,투명도) -> opacity만 조절하는 애니메서드
}; /////// choiceIntroAni //////////

// 로고애니 실행함수
const logoAni = () => {
  // 로고 최초한번만 애니하기
  $("#logo")
    .animate({ scale: "200%", rotate: "360deg" }, 1000)
    .animate({ scale: "100%", rotate: "0deg" }, 1000);
}; /////// logoAni //////////

// 셋팅초기화 함수 ////
const initFn = () => {
  // 메인이미지 + 소제목 투명하게 초기화
  $(".img-box img, .stit").css({ opacity: 0 });
  // 스크롤 맨위로 이동하기
  window.scrollTo(0, 0);
}; ////////// initFn //////////

// 내보내기
export { choiceIntroAni, logoAni, initFn };

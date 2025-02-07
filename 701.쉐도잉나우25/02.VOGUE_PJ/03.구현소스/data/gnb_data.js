// 상단영역 공통 데이터 - gnb_data.js

// (1) GNB 메뉴 데이터
const gnbMenu = {
  FASHION: [
    "전체",
    "패션 트렌드",
    "패션 아이템",
    "셀러브리티 스타일",
    "패션 화보",
    "패션 뉴스",
    "워치&주얼리",
  ],
  BEAUTY: ["전체", "뷰티 트렌드", "뷰티 아이템", "웰니스", "뷰티 화보"],
  LIFESTYLE: ["전체", "여행", "푸드", "리빙", "뷰 포인트"],
  CULTURE: ["전체", "엔터테인먼트", "아트", "셀럽 뉴스"],
  VIDEO: [],
};

// (2) 요약 메뉴 데이터
const sumMenu = ["KOREA", "구독하기", "≡"];

// (3) 추가가 메뉴 데이터 :
// 키는 메뉴, 값은 배열로 폰트어썸 클래스(0), 라우터경로(1)
const addMenu = {
  로그인: ["fa-solid fa-right-to-bracket", "/login"],
  로그아웃: ["fa-solid fa-right-from-bracket", "/logout"],
  회원가입: ["fa-solid fa-user", "/join"],
  장바구니: ["fa-solid fa-cart-shopping", "/cart"],
};

// 내보내기 //////////
export { gnbMenu, sumMenu, addMenu };

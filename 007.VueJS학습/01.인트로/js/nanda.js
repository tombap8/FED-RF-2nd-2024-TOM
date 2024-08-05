// 스타일 난다 사이트 구성 JS /////

// 1. 뷰JS 인스턴스 생성하기 //////
const vm = new Vue({
    // 1. 대상선정
    el: "#vue-app",
    // 대상은 꼭 아이디일 필요는 없다!
    // 클래스를 사용하면 첫번째 만나는 요소를 대상으로 함

    // 2. 데이터 설정하기
    data: {
        // 2-1. 샵명 데이터
        bigTit: "Style NANDA",
        // 2-2. 로고 태그정보
        logo: `<img src="./images/logo_3ce.png" alt="nanda logo">`,
    },

}); /////// Vue ///////////////////
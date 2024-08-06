// 스타일 난다 사이트 구성 JS /////

/*************************************** 
 * [ 뷰JS 라이프 사이클 속성 사용하기 ]
 * -> 뷰인스턴스 생성자 메서드 객체 셋팅시 사용!
 * -> new Vue({created(){},mounted(){},})
 * 
 * 1. 뷰인스턴스 초기화 완료단계 : created
 * -> 이 단계활용법 : 데이터 셋팅을 많이한다!
 * -> 사용법 :
 * created: function(){코드}
 * created: ()=>{코드}
 * created(){코드}
 * 
 * 2. 뷰랜더링 완료단계 : mounted
 * -> 이 단계활용법 : JS, 제이쿼리 등 DOM에 그려진 후
 *  코딩해야하는 부분을 여기에 연결한다!
 * -> 사용법 :
 * mounted: function(){코드}
 * mounted: ()=>{코드}
 * mounted(){코드}

***************************************/

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
        logo: `<img 
        src="./images/logo_3ce.png" 
        alt="nanda logo">`,
        // 2-3. 배너 데이터
        content: `
            나는 날고 싶어~!
            <h2>오늘도 당신은 날고 싶다~!</h2>
            <img src="./images/sub_banner_e.jpg" alt="banner">
        `,
        // 2-4. 상품정보 배열
        // 데이터를 클래스를 통해 생성하자!
        itemData: [],
        // -> 배열 리터럴로 선언과 할당!

        // ((예시데이터 셋팅))
        // itemData:[
        //     {
        //         idx:1,
        //         name:"vans와우",
        //         img:"vans_1.jpg"
        //     },
        //     {
        //         idx:2,
        //         name:"vans올레이",
        //         img:"vans_2.jpg"
        //     },
        //     {
        //         idx:3,
        //         name:"vans코코넛",
        //         img:"vans_3.jpg"
        //     },
        //     {
        //         idx:4,
        //         name:"vans마크로",
        //         img:"vans_4.jpg"
        //     },
        // ],
    },

}); /////// Vue ///////////////////

// 상품정보 생성을 위한 클래스 //////
// 클래스는 객체 템플릿이다!
// 따라서 클래스 생성자함수를 호출하면
// 객체 인스턴스가 생성된다!
// 인스턴스는 메모리상에 실제 객체가 생성됨을 의미!
class GetList {
    // 생성자 메서드
    constructor(idx,name,img,price){
        // idx - 일련번호, name - 상품명
        // img - 이미지이름, price - 상품가격
        this.idx = idx;
        this.name = name;
        this.img = img;
        this.price = price;
        // this는 GetList 인스턴스 자신을 의미한다!
    }
} //////// GetList 클래스 ///////////
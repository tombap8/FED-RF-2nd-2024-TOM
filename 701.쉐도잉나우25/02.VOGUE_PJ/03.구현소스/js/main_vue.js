// 보그 PJ 메인페이지 뷰적용 JS - main_vue.js
// 라우터 불러오기 /////
import router from "./router.js";

/******************************* 
    메인 뷰 인스턴스 생성하기 
********************************/
new Vue({
    // 1. 대상설정
    el: '#vogue-app',
    // 1-1. 라우터 설정
    router,
    // 2. 데이터설정
    data:{},
    // 3. 메서드설정
    methods:{},
    // 4. 라이프사이클 메서드
    // 4-1. created() : 데이터생성관련코드 작성
    created(){},

    // 4-2. mounted() : DOM관련코드 작성
    mounted(){
        // this.$router.push('/');
    },
});
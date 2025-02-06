// 보그 PJ 메인페이지 뷰적용 JS - main_vue.js

// 라우터 인스턴스 생성 및 라우터경로 셋팅 파일 불러오기
import router from "./router.js";
import store from "./vuex_store.js";

/******************************* 
    메인 뷰 인스턴스 생성하기 
********************************/
new Vue({
    // 1. 대상설정
    el: '#vogue-app',
    // 1.5. 라우터등록!
    router,
    // 1.6. 스토어등록!
    store,
    // 2. 데이터설정
    data:{},
    // 3. 메서드설정
    methods:{},
    // 4. 라이프사이클 메서드
    // 4-1. created() : 데이터생성관련코드 작성
    created(){},

    // 4-2. mounted() : DOM관련코드 작성
    mounted(){
        // 만약 첫페이지가 다른 경로면
        // DOM로딩후 구역에서 라우터를 강제로 호출함!
        // this.$router.push('/');
    },
});
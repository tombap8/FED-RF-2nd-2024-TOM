// 보그 PJ 메인페이지 뷰적용 JS - main_vue.js

// 라우터 인스턴스 생성 및 라우터경로 셋팅 파일 불러오기
import router from "./router.js";
// 뷰엑스 스토어 인스턴스 생성 및 전역변수 셋팅 파일 불러오기
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
    methods:{
        // 최초 로그인 확인하기
        // 로그인 상태라면 세션스토리지값을 읽어옴
        // 왜? 로컬스가 아닌 세션스인가?
        // 로그인 상태는 브라우저가 떠 있을동안만 필요!
        initSet(){
            let temp;
            // 세션스 'login-user'가 있으면 처리!
            if(sessionStorage.getItem('login-user')){
                // 세션스값 객체변환
               temp = JSON.parse(sessionStorage.getItem('login-user'));
               // 뮤테이션 로그인 셋 메서드 호출
               store.commit('setLogin',temp);
            }
        },
    },
    // 4. 라이프사이클 메서드
    // 4-1. created() : 데이터생성관련코드 작성
    created(){
        // 최초 로그인 상태 셋팅메서드 호출
        this.initSet();
    },

    // 4-2. mounted() : DOM관련코드 작성
    mounted(){
        // 만약 첫페이지가 다른 경로면
        // DOM로딩후 구역에서 라우터를 강제로 호출함!
        // this.$router.push('/');
    },
});
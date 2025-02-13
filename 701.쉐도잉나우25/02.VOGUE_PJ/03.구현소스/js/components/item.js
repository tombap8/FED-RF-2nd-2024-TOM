// 보그 JS 서브페이지 아이템 컴포넌트 - item.js

// GNB 메뉴 데이터 불러오기
import { gnbMenu } from "../../data/gnb_data.js";
import store from "../vuex_store.js";

export const ItemComp =  
Vue.component("item-comp",{
    // 1. 템플릿
    template: `
    <main>
    <header class="item-top-area">
        <h2 class="item-tit">
            {{$route.query.id}}
        </h2>
        <nav class="lnb">
            <ul>
                <li v-for="v in this.menuSet">
                    <a href="#">{{v}}</a>
                </li>
            </ul>
        </nav>
    </header>
    
    <!-- Today’s Stories 스타일 리스트 -->
    <today-area-comp v-if="this.$store.state.dataName=='beauty'" list-tit="" data-name="beauty"></today-area-comp>
    <today-area-comp v-else list-tit="" data-name="today"></today-area-comp>

    </main>
    `,
    // 2. 리턴함수 데이터
    data(){
        return{ 
            menuSet: gnbMenu[this.$route.query.id],
            dataName: this.$route.query.id.toLowerCase(),
        };
    },
    // 3. 메서드
    methods: {},
    // 4. 데이터셋업파트
    created(){
        // 처음 인스턴스 생성시 실행구역
        // 라우터 전달 파라미터 받기
        // this.$route.query.셋팅속성명
        console.log(this.$route.query.id);
        // -> 만약 값을 숨겨서 전달하려면 params사용!
        // this.$route.params.셋팅속성명
        if(this.$route.query.id)
            store.commit('setDataName',this.$route.query.id.toLowerCase());
    },
    // 5. 업데이트시 실행구역
    updated(){
        console.log('아이템, 업데이트!',store.state.dataName);
        // 서브메뉴 변수 업데이트하기
        this.menuSet = 
        gnbMenu[this.$route.query.id];

        if(this.$route.query.id)
        store.commit('setDataName',this.$route.query.id.toLowerCase());
    },
    // 6. DOM 셋업파트
    mounted(){
        // CSS 변경하기 ///
        $("#css-set").attr("href", "./css/item.css");
    },
});
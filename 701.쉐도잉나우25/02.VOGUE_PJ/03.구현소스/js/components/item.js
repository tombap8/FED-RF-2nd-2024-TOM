// 보그 JS 서브페이지 아이템 컴포넌트 - item.js

// GNB 메뉴 데이터 불러오기
import { gnbMenu } from "../../data/gnb_data.js";

export const ItemComp =  
Vue.component("item-comp",{
    // 1. 템플릿
    template: `
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
    `,
    // 2. 리턴함수 데이터
    data(){
        return{ 
            menuSet: gnbMenu[this.$route.query.id],
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
    },
    // 5. 업데이트시 실행구역
    updated(){
        console.log('아이템, 업데이트!');
        // 서브메뉴 변수 업데이트하기
        this.menuSet = 
        gnbMenu[this.$route.query.id]
    },
    // 6. DOM 셋업파트
    mounted(){
        // CSS 변경하기 ///
        $("#css-set").attr("href", "./css/item.css");
    },
});
// 보그 JS 서브페이지 아이템 컴포넌트 - item.js

// GNB 메뉴 데이터 불러오기
import { gnbMenu } from "../../data/gnb_data.js";

export const ItemComp =  
Vue.component("item-comp",{
    // 1. 템플릿
    template: `
    <header class="item-top-area">
        <h2 class="item-tit" @click="mm">
        {{$store.state.itemTit}}
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
        // 구조분해 할당으로 컴포넌트 지역변수로 만들기
        return{ 
            menuSet:gnbMenu[this.setCategory()],
            catName:this.setCategory(),
        };
    },
    // 3. 메서드
    methods: {
        mm(){
            console.log(this.menuSet);
        },
        setCategory(){
            return this.$route.query.id
        },
    },
    // 4. 데이터셋업파트
    created(){
        console.log(this.$route.query.id);
    },
    // 5. DOM 셋업파트
    mounted(){
        // CSS 변경하기 ///
        $("#css-set").attr("href", "./css/item.css");
    },
});
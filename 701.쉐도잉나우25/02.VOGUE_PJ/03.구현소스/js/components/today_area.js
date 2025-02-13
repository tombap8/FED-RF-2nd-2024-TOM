// 보그 JS 투데이 컴포넌트 - today_area.js

// 1. 아이템 데이터 불러오기
import itemData from '../../data/item_data.json' with{type:'json'};
import store from '../vuex_store.js';

// console.log(itemData);

// 2. 투데이 영역 구현하기 ///////

export const TodayAreaComp = Vue.component("today-area-comp", {
  // 1. 템플릿
  template: `
     <div id="today-area">
        <section class="inbox today-area">
          <h2 class="sub-tit">{{this.listTit}}</h2>
          <div class="post-list-today">
            <ul>
                <li v-for="v in this.mm(
                this.$store.state.dataName=='fashion'?
                'fashion-page':this.$store.state.dataName
                )">
                    <figure>
                        <img 
                        :src="v.imgSrc" 
                        :alt="v.mainCat">
                        <figcaption>
                        <p class="category">{{v.catName}}</p>
                        <h3 class="s-tit">{{v.title}}</h3>
                        <p class="date">{{v.dateWriter}}</p>
                        </figcaption>
                    </figure>
                </li>
            </ul>
          </div>
        </section>
      </div>
    `,
  // 2. 리턴함수 데이터
  data() {
    return {
      // 투데이 영역 정보 데이터
      todayInfo: [],
    };
  },
  props:['list-tit','data-name'],
  // 3. 메서드
  methods: {
    mm(tt){
      return itemData
      .filter((v) => {
        if (v.mainCat == tt) return true;
      })
      // 2-2. 투데이 영역 데이터 정렬하기 : idx 오름차순
      // sort((a,b)=>a.idx==b.idx?0:a.idx<b.idx?-1:1)
      .sort((a, b) => (a.idx == b.idx ? 0 : a.idx < b.idx ? -1 : 1));
    }
  },
  // 4. 데이터셋업파트
  created() {
    // 2-1. 투데이 영역용 데이터수집하기
    // filter() 메서드는 조건이 맞을때 true리턴!
    // -> 결과: 필터링된 배열값
    const todayData = itemData
      .filter((v) => {
        if (v.mainCat == store.state.dataName) return true;
      })
      // 2-2. 투데이 영역 데이터 정렬하기 : idx 오름차순
      // sort((a,b)=>a.idx==b.idx?0:a.idx<b.idx?-1:1)
      .sort((a, b) => (a.idx == b.idx ? 0 : a.idx < b.idx ? -1 : 1));

    // console.log('today데이터:',todayData);

    // 데이터 변수 셋팅하기
    this.todayInfo = todayData;

  },
  // 5. DOM 셋업파트
  mounted() {},
});

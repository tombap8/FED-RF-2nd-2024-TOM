// 보그 PJ 투데이영역 JS - today_area.js

// 1. 아이템 데이터 불러오기
import itemData from '../../data/item_data.json' with{type:'json'};

console.log(itemData);

// 2. 패션 영역 구현하기 ///////

// 2-1. 패션 영역용 데이터수집하기
// filter() 메서드는 조건이 맞을때 true리턴!
// -> 결과: 필터링된 배열값
const fashionData = itemData.filter(v=>{
    if(v.mainCat=='fashion')return true
})
// 2-2. 패션 영역 데이터 정렬하기 : idx 오름차순
// sort((a,b)=>a.idx==b.idx?0:a.idx<b.idx?-1:1)
.sort((a,b)=>a.idx==b.idx?0:a.idx<b.idx?-1:1)


console.log('fashion데이터:',fashionData);


export const TodayAreaComp = Vue.component("today-area-comp", {
    // 1-1. 템플릿코드설정 /////
    template: `
    <div id="today-area">
        <section class="inbox today-area">
          <h2 class="sub-tit">Today’s Stories</h2>
          <div class="post-list-today">
            <ul>
                <li v-for="v in todayData">
                    <figure>
                        <img :src="v.imgSrc" :alt="v.mainCat">
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
    // 1-2. 데이터 셋업 리턴 메서드 /////
    data() {
      return {
        // (1) 투데이영역 정보 데이터(투데이영역정보 제이슨 할당)
        todayData: fashionData,
        // -> 일반적으로 원본 제이슨 데이터를 컴포넌트용 변수에
        // 별도로 할당하여 사용한다!
      };
    },
    // 컴포넌트 라이프 사이클 메서드 구역 ///
    // mounted 메서드 : DOM로딩후 실행구역!
    // -> 일반 DOM코딩 JS는 여기서 호출한다!!!
    mounted() {
      
    }, /// mounted ///////
  });
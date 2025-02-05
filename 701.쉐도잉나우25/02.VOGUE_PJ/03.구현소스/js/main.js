// 보그 PJ 메인페이지 JS - main.js

// 1. 아이템 데이터 불러오기
import itemData from '../data/item_data.json' with{type:'json'};

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

// 2-3. 패션 영역 셋팅 ///
document.querySelector(".post-list").innerHTML = `
    <ul>
        ${fashionData
          .map(
            (v) => `                
                <li>
                <figure>
                    <img src="${v.imgSrc}" alt="${v.mainCat}">
                    <figcaption>
                    <p class="category">${v.catName}</p>
                    <h3 class="s-tit">${v.title}</h3>
                    <p class="date">${v.dateWriter}</p>
                    </figcaption>
                </figure>
                </li>
            `
          )
          .join("")}
    </ul>
`;

// 3. 투데이 영역 구현하기 ///////

// 3-1. 투데이 영역용 데이터수집하기
// filter() 메서드는 조건이 맞을때 true리턴!
// -> 결과: 필터링된 배열값
const todayData = itemData.filter(v=>{
    if(v.mainCat=='today')return true
})
// 3-2. 투데이 영역 데이터 정렬하기 : idx 오름차순
// sort((a,b)=>a.idx==b.idx?0:a.idx<b.idx?-1:1)
.sort((a,b)=>a.idx==b.idx?0:a.idx<b.idx?-1:1)


console.log('today데이터:',todayData);

// 3-3. 투데이 영역 셋팅 ///
document.querySelector(".post-list-today").innerHTML = `
    <ul>
        ${todayData
          .map(
            (v) => `                
                <li>
                <figure>
                    <img src="${v.imgSrc}" alt="${v.mainCat}">
                    <figcaption>
                    <p class="category">${v.catName}</p>
                    <h3 class="s-tit">${v.title}</h3>
                    <p class="date">${v.dateWriter}</p>
                    </figcaption>
                </figure>
                </li>
            `
          )
          .join("")}
    </ul>
`;

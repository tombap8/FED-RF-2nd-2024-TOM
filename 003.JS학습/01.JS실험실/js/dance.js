// 09. 중간스크롤가로이동 JS - dance.js

// 나의 함수 불러오기
import mFn from './my_function.js';

// [1] 태그 셋팅하기 /////////////////

// 1. 3번 스테이지에 ul>li 구조 이미지 넣기
// 대상: .slidePg (스티키박스)
const slidePg = mFn.qs('.slidePg');

// 2. 코드변수에 태그 만들어 넣기
let hcode = "<ul>";
for(let i = 1 ; i<= 7;i++){
    hcode += `
        <li>
            <img 
            src="./images/dance/${i}.jpg" 
            alt="dance image" />
        </li>
    `;
} //////// for ///////

hcode += "</ul>";

// 3. 코드출력하기
slidePg.innerHTML = hcode;

///////////////////////////////////////

// [2] 3번째 영역에 도달한 경우 ul박스 가로방향 이동하기

// 1. 대상선정하기 /////////
// 이벤트 대상: window
// 이벤트 종류: scroll
// 위치기준대상: .tpg -> 스티키를 싸고 있는 부모박스
const tpg = mFn.qs('.tpg');
// 움직일 대상 : .slidePg>ul
const target = mFn.qs('.slidePg>ul');

// console.log(tpg,target);

// 2. 이벤트 설정하기 /////////
mFn.addEvt(window,'scroll',moveSlide);

// 3. 함수 만들기 /////////
function moveSlide(){
    // 1. 스티키 부모박스 바운딩top값
    let bTop = mFn.getBCR(tpg);
    console.log('바운딩top:',bTop);

    // 2. 이동할 타겟박스 left값으로 
    // 부모 바운딩top값 넣기
    // (1) 바운딩 top값이 0초과일때 처음위치 재설정하기
    if(bTop > 0){
        target.style.left = '0px';
    }
    // (2) 바운딩 top값이 0이하 -3000이상일때 
    // 부모 바운딩top값으로 위치이동하기
    else if(bTop <= 0 && bTop >= -3000){
        target.style.left = bTop + 'px';
    }
    // (3) 마지막 한계 이후엔 한계값으로 셋팅
    else{
        target.style.left = '-3000px';
    }

} /////////// moveSlide 함수 /////////////



// 08. 재귀호출 JS - call_myself.js

import mFn from './my_function.js';

// 초기셋팅하기
// 대상: .gbox
const gbox = mFn.qs(".gbox");

// 코드변수
let hcode = "<ul>";

// for문으로 코드 만들기 : ul>li>img
for(let i=1; i<=7; i++) {
    hcode += `
        <li>
            <img 
            src="./images/auto_scroll/m${i}.jpg" 
            alt="갤러리이미지">
        </li>
    `;
} ///// for /////

hcode += "</ul>";

// 대상에 코드넣기
gbox.innerHTML = hcode;

//// 갤러리 박스를 왼쪽으로 계속 움직이게하는
// 재귀호출함수 만들기 ///////

// 움직일 대상: .gbox ul
let target = mFn.qsEl(gbox,'ul');

// 기준값 업데이트 함수
const updateCriteria = () => window.innerWidth/4;
// 기준값 
let criteria = updateCriteria();
// 리사이즈시 업데이트
mFn.addEvt(window,"resize",
()=>{
    criteria = updateCriteria();
    console.log('기준값업데이트:',criteria);
});

console.log('기준값:',criteria);

// 현재 translate 값
let currVal = 0;


function moveGallery(){
    // 현재값 1씩감소
    target.style.translate = --currVal+"px";

    // 하나 크기만큼 나가면 맨앞li 맨뒤로 이동!
    // appendChild(맨앞li)

    // 하나 크기만큼 나가면 currVal값 초기화!
    
    // 재귀호출!(타임아웃함수로 호출함!)
    setTimeout(moveGallery,10);

} ///////// moveGallery 함수 /////////////


setTimeout(moveGallery,2000);


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
// 기준값 (윈도우 가로폭의 1/4)->왜? li하나크기
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

    // 하나 크기만큼 나가면 처리!
    // 기준값을 마이너스로 하고 소수점 아래는 버림
    // Math.floor()소수점 아래 내림(버림)함수
    if(currVal == Math.floor(-criteria)){
        // 1.맨앞li 맨뒤로 이동!
        // appendChild(맨앞li)
        target.appendChild(
            mFn.qsaEl(target,"li")[0]);

        // 2. translate값 초기화
        target.style.translate = "0px";

        // 3. 하나 크기만큼 나가면 currVal값 초기화!
        currVal = 0;
    } /////////// if /////////////////

    
    // 재귀호출!(타임아웃함수로 호출함!)
    setTimeout(moveGallery,10);

} ///////// moveGallery 함수 /////////////


setTimeout(moveGallery,2000);


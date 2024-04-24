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

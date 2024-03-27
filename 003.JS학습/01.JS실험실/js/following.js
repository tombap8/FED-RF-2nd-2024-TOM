// 따라다니는 원 JS - following.js

// 1. 초기셋팅하기 : html 넣기
// 대상: .cont-box
const contBox = 
document.querySelector('.cont-box');

// html코드 변수
let hcode='';

// for문 돌려서 50개 div>img 넣기
for(let i=1; i<=50; i++){
    hcode += `
    <div>
        <img src="../images/dress/${i}.jpg" alt="dress">
        <a href="#" class="link">이것은 너의 드레스야!</a>
    </div>
    `;
} //////// for ///////////

// 코드넣기
contBox.innerHTML = hcode;
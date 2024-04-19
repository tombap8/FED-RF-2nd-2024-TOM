// 카테고리 링크시스템 JS - linksys.js

// 로딩구역 ///////////////////////////////////////
window.addEventListener("DOMContentLoaded", linkFn);

function linkFn() {

    // 1. 링크 대상 선정 :
    // 모바일
    const menuListM = document.querySelectorAll(".hiddenMenuWrapper ul li");
    // PC
    const menuList = document.querySelectorAll(".menuList ul li a");
    // logo -> 모바일, pc버전 a요소 2개
    const logo = document.querySelectorAll("h1 > a");

    // 2-1. 카테고리 링크 설정

    /*************************************** 
        함수명: link
        기능: 카테고리 링크시스템 연결
    ***************************************/
    function link(obj) {
        obj.forEach((ele)=>{
            // console.log("호출완료");
            ele.onclick = () => {
                //변수
                atxt = ele.innerText;
                switch(atxt) {
                    case "COMPANY" :  location.href = "company.html"; break;
                    case "BRAND" :  location.href = "brand.html"; break;
                    case "PRODUCT" :  location.href = "product.html"; break;
                    case "MEDIA" :  location.href = "media.html"; break;
                    case "SNS" :  location.href = "SNS.html"; break;
                    case "NEWS" :  location.href = "news.html"; break;
                } /////// switch case //////////
            }; //////////////
        });
    } ////////// link 변수 ////////////

    // 링크함수호출
    link(menuList);
    link(menuListM);


    // 2-2. 로고 클릭시 메인페이지 이동
    for (let x of logo) {
        x.onclick = (e) => {
            e.preventDefault();
            location.href = "main_page.html";
        }; //////// click ///////////
    } //////// for문 ///////////////////////
    
} //////////////////// linkFn ///////////////////
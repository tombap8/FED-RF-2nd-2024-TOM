// 수성 JS - mercury.js

window.addEventListener("DOMContentLoaded", loadFn);

function loadFn() {
    // console.log("로딩 테스트");

    /*******************************
    자동으로 이미지 바꾸기 
    이미지 번호는 02 03 04 05 08 10 12 총 7개 -> 반복 시킨다. 
    *******************************/
    let iseq = 0;
    const inum = ["02", "03", "04", "05", "08", "10", "12"];
    // const mrcy = document.querySelector(".mercury03");
    const mrcy = document.getElementsByClassName("mercury03")[0];
    // const mrcy = document.getElementById("mrcy_js");
    console.log(mrcy);

    setInterval(() => {
        iseq++;
        if (iseq === inum.length) iseq = 0;
        // mrcy.style.cssText = `height: 50vh; background-image: url(./subimg/Mercury/Mercury${inum[iseq]}.jpg);background-repeat: no-repeat;background-position: center;background-size: cover;background-attachment: fixed;`;
        mrcy.style.backgroundImage = `url(./subimg/Mercury${inum[iseq]}.jpg)`;
    }, 3000);
} ////////// loadFn 함수 //////////

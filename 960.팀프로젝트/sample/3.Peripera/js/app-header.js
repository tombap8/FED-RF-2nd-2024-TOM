// 아래는 모바일 쿼리일때 버거 버튼 (메뉴 생성 기능)

const burgerBtn = document.querySelector(".burgerBtn");
const crossBtn = document.querySelector(".crossBtn");


const hiddenMenuWrapper = document.querySelector(".hiddenMenuWrapper");

burgerBtn.addEventListener("click", function(){
    hiddenMenuWrapper.classList.add("showMenu");
    burgerBtn.classList.add("displayOff");
    crossBtn.classList.add("displayOn");
})

crossBtn.addEventListener("click", function(){
    hiddenMenuWrapper.classList.remove("showMenu");
    burgerBtn.classList.remove("displayOff");
    crossBtn.classList.remove("displayOn");
})





// 아래는 모바일 쿼리일때 검색바 버튼 (검색바 생성 기능)

const searBtn = document.querySelector(".searchBtn");

const serachWrapperForMobile = document.querySelector(".serachWrapperForMobile");

const serachBarCloseBtn = document.querySelector(".serachBarCloseBtn")


searBtn.addEventListener("click", function(){
    serachWrapperForMobile.classList.add("showFlex");
    
})

serachBarCloseBtn.addEventListener("click", function(){
    serachWrapperForMobile.classList.remove("showFlex");
})


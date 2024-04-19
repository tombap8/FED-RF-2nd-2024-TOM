/* ***** MEDIA - 로고 클릭시 메인페이지 이동 ***** */ 

window.addEventListener("DOMContentLoaded",linkFn);

function linkFn(){
  // console.log("링크 로딩완료!");

  // 로고 대상 선정
  const logo = document.querySelectorAll(".logo a");
  // console.log(logo);

  for(let x of logo)
    x.onclick = (e) => {
        e.preventDefault();
        location.href = "main_page.html";
    };
}

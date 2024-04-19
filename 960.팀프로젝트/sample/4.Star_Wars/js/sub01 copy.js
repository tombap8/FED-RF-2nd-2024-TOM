// 팀프로젝트 스타워즈 JS - sub01.js

window.addEventListener("DOMContentLoaded", () => {
  console.log("로딩완료!");


  // 새로고침시 맨위로 보내기 ///////
  // scrollTo(가로,세로) -> 스크롤위치이동 내장함수
  // 브라우저가 스크롤 위치 캐싱을 적용한 후 위로 이동
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100); // 0.1초정도는 줘야효과있음!

  // 메인 상단 변수 ///////////
  const tsec = document.querySelector(".tsec");
  const tsecI = document.querySelector(".tsecI");
  const tsecT = document.querySelector(".tsecT");
  const mytxt = `*Star Wars: The Phantom Menace (Episode I)*Rating: PG*Runtime: 2 hr 16min*Release Date: May 19, 1999*Genre:*Action, Adventure, Fantasy, Science Fiction
  `;
  // 메인 중반 변수 //////////
  const msecL = document.querySelector(".msecL");
  const msect = document.querySelector(".msecT");
  const msecT = document.querySelectorAll(".msecT li");
  // console.log(msecT);

  // 메인 하단 변수 /////////
  // 슬라이드 박스
  const slide = document.querySelector(".slide");
  const blogo = document.querySelector(".blogo");
  const slidebx = document.querySelector(".slidebx");
  // 메인 최하단 박스 /////////
  const b_sec1 = document.querySelector(".b_sec1");
  const b_sec2 = document.querySelector(".b_sec2");
  const b_sec1pos = b_sec1.offsetTop;

  // 화면 높이값의 2/3 구하기
  const hv = (window.innerHeight / 3) * 2;
  const winH = window.innerHeight;
  const winW = window.innerWidth;
  // console.log(winH);
  // const docH = document.body.clientHeight;
  const retVal = (ele) => ele.getBoundingClientRect().top;

  // 메인 상단 타임아웃함수
  const showIt = () => {
    setTimeout(() => {
      tsecI.style.opacity = "1";
      tsecI.style.transition = ".5s ease-in-out";
    }, 1000); ////////// 이미지 타임아웃

    let hcode = "";
    let idx = 0;

    for (let x of mytxt) {
      if (x === " ") hcode += "&nbsp";
      else if (x === "*") hcode += `<div></div>`;
      else hcode += `<span style="transition-delay:${idx * 0.03}s">${x}</span>`;
      idx++;

      setTimeout(() => {
        tsecT.classList.add("on");
      }, 1000); /// 텍스트 타임아웃
      tsecT.innerHTML = hcode;
    } ////// for of //////
  }; /////////// showIt 함수 ///////////
  showIt();

  window.addEventListener("scroll", () => {
    // 스크롤시 스크롤 위치값 찍기
    let scrl = window.scrollY;

    // console.log(scrl);

    if (scrl > 200) {
      tsec.style.opacity = "0";
    } else if (scrl < 200) {
      tsec.style.opacity = "1";
    } else {
      tsec.style.transition = "1s";
      // scrl.remove();
    } /////// 상단이미지 보이기 if문 ////////

    if (scrl < hv && scrl > 0) {
      msecL.classList.add("on");
    } ///// 중간 로고 보이기 if문 ////////

    for (let i = 0; i < msecT.length; i++) {
      const li = msecT[i];
      const liTop = retVal(li);

      if (liTop < (winH / 5) * 4) {
        li.style.opacity = "1";
      } else {
        li.style.opacity = "0";
      }

      if (liTop <= 350) {
        li.style.opacity = "0";
      }
    } /////// 중간 텍스트 보이기 for문 /////////

    // 하단로고 스크롤
    // const blogoT = retVal(blogo);
    if(scrl > 3320){
      blogo.classList.add("on");
      blogo.style.transition = ".8s ease-in-out";
    } /////// 하단로고 클래스 "on" 더하기 if 문
    else{
      blogo.classList.remove("on");
      blogo.style.transition = "none";
    } /////// 하단로고 클래스 "on" 빼기 if 문
    console.log(scrl);
    // if(scrl > 5000){
      
    //   blogo.classList.remove("on");
    //   blogo.style.transition = "none";
    // }
    if (scrl > b_sec1pos){
      blogo.classList.remove("on");
      blogo.style.transition = "none";
  }


    // 하단 슬라이드 박스 사라지기
    if(scrl > 3800){
      slidebx.style.opacity = "0";
      slidebx.style.transition = "0.5s ease-in-out"
    }
    else{
      slidebx.style.opacity = "1";
      slidebx.style.transition = "0.5s ease-in-out"
    } ////////// 슬라이드박스 나타나기 / 사라지기


    // 최하단 박스 나타났다 등장액션
    const bsec1_Top = retVal(b_sec1);

      if (bsec1_Top < (winH / 5) * 4) {
        b_sec1.style.opacity = "1";
        b_sec1.style.transition = "1s";
      } else {
        b_sec1.style.opacity = "0";
        b_sec1.style.transition = "1s";
      }

      if (scrl >= 4550) {
        b_sec1.style.opacity = "0";
        b_sec1.style.transition = "1s";
      }

    const bsec2_Top = retVal(b_sec2);
      
      if (bsec2_Top < (winH / 5)*4){
        b_sec2.style.opacity = "1";
        b_sec2.style.transition = "1s";
      } else {
        b_sec2.style.opacity = "0";
        b_sec2.style.transition = "1s";
      }

  }); /////////// 스크롤 함수 ////////////

  


  /***************************************************** 
    버튼 / 슬라이드 함수영역
  *****************************************************/
  let slide_img = "<ul>";
  for (let x = 1; x < 7; x++) {
    slide_img += `
    <li>
    <img src="img/slide0${x}.jpeg" alt="슬라이드 이미지">
    </li>
    `;
  } //////// for문 ///////
    slide_img += "</ul>";
    
    slide.innerHTML = slide_img;
    
    
    // 버튼 변수
    const abtn = document.querySelectorAll(".abtn");
    // console.log(abtn);
    


    // 광클금지 변수 
    let prot = 0;
    // 슬라이드 함수 ////////////////////////
    const goSlide = (seq) => {

      // 광클금지 설정하기 //
      if(prot) return;
      prot = 1;
      setTimeout(()=>{
        prot = 0;
      },400);

      let slide = document.querySelector(".slide>ul");
      // 슬라이드의 li 변수
      let clist = slide.querySelectorAll("li");
      // console.log(clist);

      // 슬라이드 방향 분기
      if(seq){
        slide.style.left = "-100%";
        slide.style.transition = "left .4s ease-in-out";

        // 슬라이드 이동후 0.4초
        setTimeout(()=>{
          slide.appendChild(clist[0]);
          slide.style.left = "0";
          slide.style.transition = "none";
        },400); ///// 오른쪽 버튼 타임아웃 /////
      } //////// 오른쪽 버튼 if문 ////////////
      else {
        slide.insertBefore(clist[clist.length-1],clist[0]);
        slide.style.left = "-100%";
        slide.style.transition = "none";

        // 슬라이드 이동후 0초
        setTimeout(()=>{
          slide.style.left = "0";
          slide.style.transition = "left .4s ease-in-out";
        },0); ///////// 타임아웃 ///////////
      } /////////// 왼쪽버튼 else문 /////////////

    } ///////// goSlide 함수 ///////////

    abtn.forEach((ele,idx)=>{
      ele.onclick = () => {
        // a요소 기본이동막기
        event.preventDefault();
        // 인터발지우기함수 호출!
        clearAuto();
        // 슬라이드 함수 호출
        goSlide(idx);
      }; ///////// click ///////////
    }); ///////// forEach ///////////

    // 인터발함수 지우기 변수
    let autoI;
    // 타임아웃함수 지우기 변수
    let autoT;

    function autoSlide(){
      autoI = setInterval(()=>goSlide(1),3000);
    } ///////// autoSlide함수 자동넘기기! ///////

    autoSlide();


    function clearAuto(){
      // 인터발함수 지우기
      clearInterval(autoI);
      // 타임아웃함수 지우기
      clearTimeout(autoT);
      // 클릭후 인터발 재실행을 위한 타임아웃함수 설정
      autoT = setTimeout(autoSlide,5000);
    } ///////// clearAuto함수 ////////////

    /**************************************** 
      따라다니는 마우스 포인터 .lightS
    ****************************************/
    let mover = document.querySelector(".lightS");
    // console.log(mover);
    // 무버크기의 절반 계산하기
    let gap = mover.clientWidth / 2;
    // console.log("무버",gap);

    // mousemove 가 body위에서 움직일때 발생
    document.body.onmousemove = function(){
      // 무버가 포인터 가운데 안오게하기
      let posx = event.clientX-gap;
      let posy = event.clientY-gap;
      // console.log(posx,posy);

      // 무버에서 위치값 이동 셋팅
      mover.style.top = posy + "px";
      mover.style.left = posx + "px";
    }; ///////// mousemove 함수 //////////////

    // body영역 바깥으로 나가면 사라지고 들어오면 나타남 //
    document.body.onmouseenter = () => {
      // 들어오면 나타남
      mover.style.display = "block";
    }; ///// mouseenter /////
    
    document.body.onmouseleave = () => {
      // 나가면 사라짐
      mover.style.display = "none";
    }; ///// mouseleave /////
    if(winW < 500){
      console.log(winW);
      mover.style.display = "none";
    }

    
    
  }); ///////// 로드구역 /////////////////////////////
  
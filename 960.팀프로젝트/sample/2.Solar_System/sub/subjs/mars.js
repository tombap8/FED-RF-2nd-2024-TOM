/* 화성 JS */

// 로드 ///////////
window.addEventListener("DOMContentLoaded", setMars);

// 화성 로딩 - setMars ///
function setMars() {
  console.log("로딩완료!");
  
  // 새로고침 시 맨위로
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100); // .1초 정도는 줘야 효과있음
  


  //___________________________화성메인________________________________


  // 1. 대상선정
  const md_h3 = document.querySelector(".model h3");
  const imodel = document.querySelector(".imodel");
  const copyFt = document.querySelectorAll(".copyFt");
  const mars_copy3 = document.querySelectorAll(".mars_copy3 h2")
  const m_dis = document.querySelectorAll(".m_dis h3")
  const Mars3d = document.querySelectorAll(".Mars3d")
  const title = document.querySelector(".title_m h1")
  //____________________________________________________

  
    
  
  
  //// 타이틀 나타냈다가 사라짐 /////////////
  setTimeout(()=>{
    title.style.opacity = "1";
    title.style.fontSize = "25vw";
  },3000);
  setTimeout(()=>{
    title.style.opacity = "0";
  },6000);

  // 2. 이벤트설정 (스크롤)
  /************************************************ 
  함수 : scFn
  기능 : 나타나는효과
  변수 : 화면높이값,글자요소,iframe,글자색상
  ************************************************/

  // window.scrollTo()
  window.addEventListener("scroll", () => {
    // 스크롤 높이값
    let scHere = window.scrollY;

    // 효과함수 ///////////////
    function scFn(scVal, Val_mars, ifr, plus, ftC) {
      // 스크롤 위치값 변수
      // 스크롤 위치값이 1300넘어가면 효과줌
      if (scHere >= scVal && ifr) {
        appr(ifr);
      }
      // else if 주면 아래 조건 안먹음
      if (scHere >= scVal + plus && Val_mars) appr(Val_mars);
      
      // 3. 함수설정(appr)
      function appr(ele) {
        // 글씨 나타남
        ele.style.opacity = 1;
        // 글씨 위로 올라옴
        ele.style.top = 0 + "px";
        // 약간의 시간 후 색상 변경
        setTimeout(() => {
          ele.style.color = ftC;
        }, 800);
      } ////////////// appr ///////////////
    } //////////////// scFn //////////////////
    // 스크롤 높이값 확인
    // console.log(scHere);

    // const pg2_img1 = document.querySelector(".pg2_img1>img");
    // window.addEventListener("click",()=>{
    //   pg2_img1.style.transform = "scale(1.2)";
    // });
    
    // 미디어 쿼리
    const wW_mars = window.innerWidth;
    // console.log("hi",wW_mars);
    
    // 가로 1600 이상일 때 scFn 호출
    if (wW_mars > 1600) {
      // 2페이지
      scFn(1300, md_h3, imodel, 500, "#fff");

      const obj = [Mars3d,mars_copy3];
      for(let x of obj){
        // console.log(x);
        x.forEach((ele)=>{
          // console.log("mars_copy3",ele);
          scFn(5100,false,ele, 500, "#333");
        })
      }
      // 기사내용
      m_dis.forEach((ele)=>{
        scFn(5300,false,ele, 500, "#444");
      });
    }////////////////////// 1600이상 ///////////////////

    else if (wW_mars >= 1100 && wW_mars < 1600) {
      scFn(800, md_h3, imodel, 130, "#fff");

      const obj = [Mars3d,mars_copy3];
      for(let x of obj){
        // console.log(x);
        x.forEach((ele)=>{
          // console.log("mars_copy3",ele);
          scFn(5200,false,ele,50,"#333");
        })
      }
      // 기사내용
      m_dis.forEach((ele)=>{
        scFn(5400,false,ele,50,"#444");
      });
    } //////////////////// 1100이상 ///////////////////////
    
    else if (wW_mars >= 850 && wW_mars < 1100) {
      scFn(350, md_h3, imodel, 220, "#fff");

      const obj = [Mars3d,mars_copy3];
      for(let x of obj){
        // console.log(x);
        x.forEach((ele)=>{
          // console.log("mars_copy3",ele);
          scFn(4300,false,ele, 50,"#333");
        })
      }
      // 기사내용
      m_dis.forEach((ele)=>{
        scFn(4500,false,ele,50,"#444");
      });
    } //////////////////// 850이상 ///////////////////////

    else if (wW_mars >= 600 && wW_mars < 850) {
      scFn(400, md_h3, imodel, 170, "#fff");

      const obj = [Mars3d,mars_copy3];
      for(let x of obj){
        // console.log(x);
        x.forEach((ele)=>{
          // console.log("mars_copy3",ele);
          scFn(3600,false,ele, 50,"#333");
        })
      }
      // 기사내용
      m_dis.forEach((ele)=>{
        scFn(3800,false,ele,50,"#444");
      });
    } //////////////////// 600이상 ///////////////////////
    else {
      scFn(250, md_h3, imodel, 150, "#fff");

      const obj = [Mars3d,mars_copy3];
      for(let x of obj){
        // console.log(x);
        x.forEach((ele)=>{
          // console.log("mars_copy3",ele);
          scFn(3300,false,ele, 50,"#333");
        })
      }
      // 기사내용
      m_dis.forEach((ele)=>{
        scFn(3450,false,ele,50,"#444");
      });
    } //////////////////// 600이상 ///////////////////////

    
    
  }); /////////// scroll ///////////////
  //   // 미디어쿼리
  // window.addEventListener("resize", () => {
  // const nWidth = window.innerWidth;
  // if (matchMedia("screen and (max-width: 600px)").matches) {
  //   console.log("mobile");
  // } ////////// 600px ///////////
  // else if (matchMedia("screen and (max-width: 900px)").matches) {
  //   console.log("tablet");
  // } ////////// 900px ///////////
  // else if (matchMedia("screen and (max-width: 1100px)").matches) {
  //   console.log("desktop");
  // } ////////// 1100px ///////////
  // else if (matchMedia("screen and (max-width: 1600px)").matches) {
  //   console.log("desktop2");
  // } /////////////// resize //////////////

  // 객체로 html 채우기 ///////////////////////////////////////////
  const mars_data = {
    "Curiosity" : {
        "제목" : "Curiosity",
        "기사" : "NASA’s Curiosity Mars rover set out to answer a big question when it landed on the Red Planet more than 10 years ago: Could Mars have supported ancient life? Scientists have discovered the answer is yes, and they have been working to learn more about the planet’s past habitable environment."
    },
    "Maven":{
        "제목":"Maven",
        "기사":"NASA’s MAVEN mission explores the atmosphere of Mars to better study a phenomenon observed at Earth, known as Sporadic-E Layers.Learn more in this comic book-style animated video."
    },
    "Rover":{
        "제목":"Rover",
        "기사":"Take a look at the view from inside Gale crater as NASA’s Curiosity Mars Rover explores a changing landscape."
    },
    "Odyssey":{
        "제목":"Odyssey",
        "기사":"2001 Mars Odyssey is a robotic spacecraft orbiting the planet Mars. The project was developed by NASA, and contracted out to Lockheed Martin, with an expected cost for the entire mission of US$297 million."
    },
  };

  ///////////////////////// 객체 ///////////////////////////////////
  ///////////// mars 3pg //////////////
  const data_Mars = mars_data;
  const p_arr = ["Curiosity","Maven","Rover","Odyssey"];
  // console.log(mars_data["Maven"]["기사"]);
  // 기사제목 띄우기
    mars_copy3.forEach((ele,idx)=>{
    ele.innerHTML = p_arr[idx];
  });
  // 기사내용 띄우기
    m_dis.forEach((ele,idx)=>{
    ele.innerText = mars_data[p_arr[idx]]["기사"];
  });


  
  // ________________________ 2pg ______________________________



  
} ////////// setMars ////////////

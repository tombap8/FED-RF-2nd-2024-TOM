// 서브페이지 js

window.addEventListener("DOMContentLoaded", loadFn);

function loadFn() {
    // 새로고침 시 맨 위로
    setTimeout(()=>{
        window.scrollTo(0,0);
    }, 100)

    // 1. 대상선정
    // 캐릭터박스
    const chaList = document.querySelector(".mcha_list ul");
    const chaDatabx = document.querySelector(".mcha_data");
    // 비디오박스
    const vidCont = document.querySelector(".mvideo_cont");
    const vidList = vidCont.querySelector("ul");
    const vidDatabx = document.querySelector(".mvid_data");
    // 갤러리박스
    const gallStBx = document.querySelector(".gall_story ul");
    const gallBhBx = document.querySelector(".gall_behind ul");

    /*
        함수이름 : characList
        기능 
        1. 캐릭터 리스트에 cdata에 있는 캐릭터 객체 정보 담기
        3. 열린 캐릭터 정보 박스의 닫기 버튼 누르면 박스 없어짐
    */
    function characList () {
        let hcode = "";
        // for in문으로 캐릭터 리스트 넣기
        for(let x in cdata) {
            let data = cdata[x];
            // console.log(data);
            hcode += `
            <li>
                <div class="mcha_wrap">
                    <div>
                        <img src="./subimg/character/${data.imglink}" alt="${x}">
                    </div>
                    <div class="mcha_beam">
                        <span></span>
                        <span></span>
                    </div>
                    <h4>${data.name}</h4>
                    </div>
                    </li>`
        } // for in
        chaList.innerHTML = hcode;
        const chaData = chaList.querySelectorAll("li");
        chaData.forEach((ele)=>{
            // console.log(ldata.name);
            ele.onclick = () => {
                let ltxt = ele.querySelector("img").alt
                let ldata = cdata[ltxt];
                chaDatabx.innerHTML = `
                <div class="mcha_cont">
                        <div class="mcha_contwrap">
                            <div class="mcha_cont_img">
                                <img src="./subimg/character/${ldata.imglink}" alt="${ldata}">
                            </div>
                            <div class="mcha_cont_txt">
                                <h4>${ldata.name}</h4>
                                <div class="mcha_beam">
                                    <span></span>
                                    <span></span>
                                </div>
                                <p>${ldata.desc}</p>
                            </div>
                        </div>
                        <button class="cbtn">×</button>
                    </div>
                `;
                // console.log(cbtn);
                 
                // 버튼 클릭 시 캐릭터 소개 박스 제거
                let chaCont = chaDatabx.querySelector(".mcha_cont");
                let cbtn = chaCont.querySelector(".cbtn");
                
                cbtn.addEventListener("click", ()=>closeBx(chaCont));        
            } // click
        }) // forEach
    } /// characList 힘수
    
    //닫기 기능 박스
    const closeBx = (ele) => {
        console.log("닫혀라!");
        ele.remove()
    }
    // 호출
    characList();

    // 페이지 넘기기 함수
    const pageSlide = (ele, lf) => {
        ele.style.left = (lf * -100)+"%"
    }
    /*
        함수이름 : videoList
        기능 
        1. 비디오에 vdata에 있는 비디오 객체 정보 담기
        3. 열린 비디오 박스의 닫기 버튼 누르면 박스 없어짐
    */
    function videoList () {
        let hcode = "";
        // for in문으로 캐릭터 리스트 넣기
        for(let x in vdata) {
            let data = vdata[x];
            // console.log(data);
            hcode += `
            <li>
                <div class="mvideo_imgbx">
                    <img src="./subimg/video/${data.imglink}" alt="${x}">
                    <div>
                        <span>
                            <span class="fa-solid fa-play"></span>
                        </span>
                        <span>${data.videotime}</span>
                    </div>
                </div>
                <div class="mvideo_txtbx">
                    <div class="mcha_beam">
                        <span></span>
                        <span></span>
                    </div>
                    <h4>${data.titname}</h4>
                </div>
            </li>`
        } // for in
        vidList.innerHTML = hcode;

        // 대상선정 : li
        const vidData = vidList.querySelectorAll("li");
        
        // 키운트변수
        let vidIndex = 0;
        // console.log(vidLiCnt);

        // 버튼 클릭 시 다음 비디오 목록으로 넘어가기        
        const vbtn = document.querySelectorAll(".vlist_btn");
        // 클래스 온오프 함수
        const nextBtnOff = () =>{
            vbtn[0].classList.add("btn_off");
            vbtn[1].classList.remove("btn_off");
        }

        const prevBtnOff = () => {
            vbtn[1].classList.add("btn_off");
            vbtn[0].classList.remove("btn_off");
        }

        let timer;

        let wWidth = window.innerWidth;
        console.log("전역", wWidth)
        
        // 브라우저 크기변화 감지
        window.addEventListener('resize', function(){
            wWidth = window.innerWidth;
            vidSlide();
            vidList.setAttribute("style","");
            // clearTimeout(timer);
            // timer = setTimeout(()=>{
            //     wWidth = window.innerWidth;
            //     console.log("지역", wWidth);
            //     vidFn();
            // }, 300)
        })

        // 페이지 사이즈 반응에 따른 버튼 함수
        function vidFn() {
            // 1200px 이상일 때
            if(wWidth > 1200) {
                // console.log("ㅎㅇㅎㅇ", wWidth);
                // vidSlide();
                if(vidIndex > 0) {
                    nextBtnOff();
                }
                if(vidIndex-1 < 0) {
                    prevBtnOff();
                }
            }
            // 1200px이하, 850px이상일때
            else if(wWidth <= 1200 && wWidth > 850) {
                if(vidIndex === 0) {
                    vbtn[0].classList.remove("btn_off");
                } else if(vidIndex === 1) {
                    vbtn[1].classList.remove("btn_off")
                } else if(vidIndex === 2) {
                    vbtn[0].classList.add("btn_off");
                }      
                if(vidIndex-1 < 0) {
                    vbtn[1].classList.add("btn_off");
                } 
                
            }
            // 850px 이하일때
            else if(wWidth <= 850) {
                if(vidIndex > 0) {
                    vbtn[1].classList.remove("btn_off")
                }
                if(vidIndex === 5) {
                    vbtn[0].classList.add("btn_off");
                } else if(vidIndex === 4) {
                    vbtn[0].classList.remove("btn_off");
                } 
                if(vidIndex-1 < 0) {
                    vbtn[1].classList.add("btn_off");
                }
            }
        }

        vidSlide();
        // 버튼 클릭 함수
        function vidSlide() {
            // >(다음)버튼 클릭 시
            vbtn[0].onclick = () => {
                vidIndex++;
                pageSlide(vidList, vidIndex);
                console.log(vidIndex);
                vidFn();
               
            }
            // <(이전)버튼 클릭 시
            vbtn[1].onclick = () => {
                vidIndex--;
                pageSlide(vidList, vidIndex);
                console.log(vidIndex);
                vidFn();
            }
        
        }
        
        // 비디오 이미지 클릭 시 해당되는 비디오 화면에 출력
        console.log(vidData);
        vidData.forEach((ele) =>{
            ele.onclick = () => {
               let ltxt = ele.querySelector("img").alt
               let ldata = vdata[ltxt];
               //console.log(ldata);
               vidDatabx.innerHTML = `
                <div class="mvid_dtcont">
                    <div class="mvid_contwrap">
                        <iframe src="https://secure.disney.com/embed/${ldata.videolink}?domain=www.starwars.com" allowfullscreen frameborder="0"></iframe>
                    </div>
                    <button class="cbtn">×</button>
                </div>
               `;

                // 버튼 클릭 시 동영상 박스 제거
                let vidCont = vidDatabx.querySelector(".mvid_dtcont");
                let cbtn = vidCont.querySelector(".cbtn");
                
                cbtn.addEventListener("click", ()=>closeBx(vidCont)); 
            } // click
        }) // forEach
    } /// videoList 힘수    

    videoList();

    /*
        함수이름 : gallList
        기능 
        1. 갤러리 이미지 박스에 이미지 출력
        3. 이미지 순서에 해당하는 번호 출력(ex. 1 of 25)
        4. 이전 혹은 다음 버튼 클릭 시 페이드 효과로 다음 이미지 출력
    */
   // console.log(gdata.story[0]);
   // console.log(gdata.story.length);
   function gallList(ele, cls, lik) {
    let gnum = 0;
    const gbtn = cls.parentElement.querySelectorAll(".glist_btn");
    // 이미지출력
    const gimgBx = cls.querySelector(".gall_imgbx");
    const gtxtBx = cls.querySelector(".gall_txtbx p");
    const gcntbx = cls.querySelectorAll(".gall_cnt span"); 
    
    // 컨텐츠 넣기 함수
    const gCont = (val) => {
        gimgBx.innerHTML = `<img src="./subimg/gallery/${lik}/${val+1}.jpeg" alt="${lik}">`;
        gtxtBx.innerText = `${ele[val]}`;
        gcntbx[0].innerText = val+1;
    }

    // 초기값 세팅
    if(gnum===0) {
        gCont(0);
        gcntbx[1].innerText = ele.length;
    }

    // 이미지 및 텍스트 넘어가기 함수
    const goImg = (seq) => {
        if(seq) {
            // console.log("다음!",gnum);
            gnum++
            if(gnum>ele.length-1) {
                gnum = 0;
            }
            gCont(gnum);
        }
        else {
            // console.log("이전!",gnum);
            gnum--
            if(gnum<0) {
                gnum = ele.length-1;
            }
            gCont(gnum);
        }
    }
    
    gbtn.forEach((bb, idx)=>{
        bb.onclick = () =>{
            // console.log("gd", idx);
            goImg(idx);
        }
    })
    
   }
   gallList(gdata.story, gallStBx, "story");
   gallList(gdata.behind, gallBhBx, "behind");


   // 스크롤 등장액션
   // 대상선정 .setit
   const setit = document.querySelectorAll(".setit");
   
   
   function scrollShow() {
       // 화면높이값의 4/5구하기
       const hv = window.innerHeight/5*4;
       // 윈도우 높이값
       const winH = window.innerHeight;
    
       // 전체 문서 높이값
       const docH = document.body.clientHeight;
       console.log("문서전체높이", docH); 
    
       // 스크롤한계값
       const scLimit = docH - winH
       console.log("스크롤한계값", scLimit); 
    
       // 등장액션 대상 위치값 리턴함수
       const retVal = ele => ele.getBoundingClientRect().top;

       // 클래스 넣기 함수
       const showIt = x => { // x는 등장요소
           // 대상요소의 현재 스크롤 위치
           let xval = retVal(x)
           // 화면 높이값의 절반값에 왔을때 첫번째 박스 등장
           // hv변수 -> 화면 높이값의 절반값
           if(xval < hv && xval > 0) {
               x.classList.add("on");
           }
       };       

       window.addEventListener("scroll", ()=> {
        for(let x of setit) showIt(x);
       })
   }
    
   scrollShow();
   

} // 로드함수
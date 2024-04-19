
window.addEventListener("DOMContentLoaded",setBan);
/*************** 배열데이터 ***************/
const arr = [
    ["ZzMkc0W42nA","v0yilQVQ8Ew","1nswG0Bfaoc","UHbYQU_YHdQ","i2RiRx5K-Uk","xl55n1oO1sY"], //시즌1
    ["tdHx3ZYyQnc","DPl2F_EeHL0","j8FnlHz6NhI","IH5b_78vgdA","_iYUIlEqdZU","QMFRPMi1sbE"], //시즌2
    ["gllOGckFl4g","fh3jQ0hIGf0","V3lispzqU-g","DHL2KplwXHE","SDaLgm4pjN4","eWZYdSIo3k4"], //시즌3
    ];

const title = [
    ['Real Gone (From "Cars"/Soundtrack Version)','Life is a Highway (From "Cars"/Soundtrack Version)','Our Town (From "Cars"/Soundtrack Version)','Sh-Boom (『カーズ』より)',
    'Goodbye (From "Cars"/Score)','Behind the Clouds (From "Cars"/Soundtrack Version)'],
    ['You Might Think (From "Cars 2"/Soundtrack Version)','Collision of Worlds (From "Cars 2"/Soundtrack Version)',"Nobody's Fool (From 'Cars 2'/Soundtrack Version)",
    'Going To The Backup Plan (From "Cars 2"/Score)','The Other Shoot (From "Cars 2"/Score)','The Radiator Springs Gran Prix (From "Cars 2"/Score)'],
    ["Storm's Winning Streak (From '\Cars 3\'/Score)","Fireball Beach (From '\Cars 3\'/Score)","Smokey Starts Training",
    "Drip Pan (From '\Cars 3\'/Score)","McQueen's Wild Ride (From '\Cars 3\'/Score)","Temple of Rust-eze (From '\Cars 3\'/Score)"],
    ];

const singer = [
["Sheryl Crow","Rascal Flatts","James Taylor","Chords","Randy Newman","Brad Paisley"],
["Weezer","Robbie Williams, Brad Paisley","Michael Giacchino","Michael Giacchino","Michael Giacchino","Michael Giacchino"],
["Randy Newman","Randy Newman","Randy Newman","Randy Newman","Randy Newman","Randy Newman"],
];


// movslide함수 구역 // 
function setBan(){
    
    /*************** 전역변수 ***************/
    const posterWrap = document.querySelector(".posterWrap");
    let bannerWrap = document.querySelectorAll(".poster");
    const videos = document.querySelectorAll(".trackVideo");
    const soundTitle = document.querySelectorAll(".track div>dd:nth-child(1)");
    const soundSinger = document.querySelectorAll(".track div>dd:nth-child(2)");
    var video_gubun = '';  
    let slide2 = document.querySelector(".posterWrap").children;

    

    /*************** 이미지클릭시 음원트랙 변경 ***************/
    bannerWrap.forEach((ele,idx)=>{
            ele.innerHTML =`<img src="../image/c${idx+1}_teaser_poster.jpg" alt="포스터${idx+1}이미지">`;

        ele.addEventListener("click", ()=> {
            // 시즌1
            if(ele.dataset.video_gubun==3 || ele.dataset.video_gubun==6){
                videos.forEach((ele2,idx)=>{
                    ele2.innerHTML = `<iframe src="https://www.youtube.com/embed/${arr[2][idx]}"></iframe>`
                    soundTitle.forEach((ele2,idx)=>{
                        ele2.innerText = title[2][idx];
                    });
                    soundSinger.forEach((ele2,idx)=>{
                        ele2.innerText = singer[2][idx];
                    });
                }); // videos forEach 
            // }); // CLICK AREA
            } // IF문

            // 시즌2
            if(ele.dataset.video_gubun==1 || ele.dataset.video_gubun==4){
                videos.forEach((ele2,idx)=>{
                    ele2.innerHTML = `<iframe src="https://www.youtube.com/embed/${arr[0][idx]}"></iframe>`
                    soundTitle.forEach((ele2,idx)=>{
                        ele2.innerText = title[0][idx];
                    });
                    soundSinger.forEach((ele2,idx)=>{
                        ele2.innerText = singer[0][idx];
                    });
                }); // videos forEach 
            // }); // CLICK AREA
            } // IF문

            // 시즌3
            if(ele.dataset.video_gubun==2 || ele.dataset.video_gubun==5){
                videos.forEach((ele2,idx)=>{
                    ele2.innerHTML = `<iframe src="https://www.youtube.com/embed/${arr[1][idx]}"></iframe>`
                    soundTitle.forEach((ele2,idx)=>{
                        ele2.innerText = title[1][idx];
                    });
                    soundSinger.forEach((ele2,idx)=>{
                        ele2.innerText = singer[1][idx];
                    });
                }); // videos forEach 
            }  // IF문
        }); // CLICK AREA

    }); // bannerWrap forEach 


    /*************** 새로고침시 화면 초기화 ***************/
    const btns = document.querySelectorAll(".arrow_nav");
    let slide = document.querySelectorAll(".poster");

    function init(e){
        videos.forEach((ele,seq)=>{
            var aa = '';
            ele.innerHTML = `<iframe src="https://www.youtube.com/embed/${arr[1][seq]}"></iframe>`
            for(var iia=0; iia< slide2.length; iia++){
            if(iia == 3) {
                 aa = ele;
                 soundTitle.forEach((ele,idx)=>{
                    ele.innerText = title[1][idx];
                });
                soundSinger.forEach((ele,idx)=>{
                    ele.innerText = singer[1][idx];
                });
            } // IF문
        };  // FOR문
    }); //forEach문 
        
    } // init함수
    
    /*************** 화살표버튼 클릭시 슬라이드 롤링 ***************/
    btns.forEach((ele,idx)=>{
        ele.onclick =()=>{
            
        let slide = document.querySelectorAll(".poster");
    
        if(idx === 0){
            posterWrap.style.left = "85%";
        setTimeout(() => {
            posterWrap.prepend(slide[5]);
            posterWrap.style.left = "50%";

            get_video_gubun();
            for(var ix=0; ix<videos.length; ix++) {
                videos[ix].innerHTML = `<iframe src="https://www.youtube.com/embed/${arr[video_gubun-1][ix]}"></iframe>`
                soundTitle[ix].innerText = title[video_gubun-1][ix];
                soundSinger[ix].innerText = singer[video_gubun-1][ix];
            }
        }, 0); // setTimeout 함수
   } // IF문


        if(idx === 1){
           posterWrap.style.left = "16%";
            setTimeout(() => {
                posterWrap.appendChild(slide[0]);
                posterWrap.style.left = "50%";

                get_video_gubun();

                for(var ix=0; ix<videos.length; ix++) {
                    videos[ix].innerHTML = `<iframe src="https://www.youtube.com/embed/${arr[video_gubun-1][ix]}"></iframe>`
                    soundTitle[ix].innerText = title[(video_gubun-1)][ix];
                    soundSinger[ix].innerText = singer[(video_gubun-1)][ix];
                }
            }, 0); // setTimeout 함수
        } // IF문
        
    }; // CLICK AREA
}); // btns forEach 문 


init();

function get_video_gubun() {
    for(var aa in slide2) {
        if(aa == 3) {
            video_gubun = slide2[aa].dataset.video_gubun;
        }
    }
}

} // ROADING AREA // 
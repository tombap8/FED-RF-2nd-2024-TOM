
window.addEventListener("DOMContentLoaded", loadFn);

/****************************************** 
    함수명: loadFn
    기능: 로딩 후 버튼 이벤트 및 기능구현
******************************************/

function loadFn(){
    console.log("로딩완료!");


    /* 
        jupiter 코드 
        기능 : 
        1. 1페이지의 슬라이드구역 
            -> 화살표를 누르면 슬라이드의 left값을 이동

        2. 1페이지의 MORE 버튼을 누르면 2페이지로 부드럽게 이동
        
        3. 2페이지의 각 서브제목을 누르면
        누른 서브제목의 글씨와 크기를 바꾸고
        서브제목에 맞는 내용을 출력( 클래스 show를 줘 보이게만듬)
        기본상태는 overview 이다.

        4. 2페이지의 갤러리는 li형태와 grid형태가 있고 
        li버튼을 누르면 li형식의 데이터를 출력하고
        grid버튼을 누르면 grid 형식의 데이터를 출력해준다.
        데이터는 객체를 이용해 출력해준다.
    */

        // 1. 1페이지 슬라이드구역 - 닫히는 슬라이드
        
        // 페이지1 버튼
        const page1_btns = document.querySelectorAll('.btns')
        // 페이지1 ol슬라이드
        const page1_slide = document.querySelector('.slidebx ol')
        // 페이지1 페이지 리스트개수 파악용
        const page1_slide_li = document.querySelectorAll('.slidebx ol li').length;
        // 페이지리스트개수 변수
        let qwe = 0;

        const page1sg = seq => {
            if(prott) return ;
            prott = 1;
            setTimeout(()=>{prott=0;},400)
            // 오른쪽버튼을 누르면
            if(seq){
                qwe++;
                page1_slide.style.transition = '.2s'
            }
            // 왼쪽버튼을 누르면
            else{
                qwe--;
                page1_slide.style.transition = '.2s'
            }
        // 눌러서 왼쪽 끝으로 간다면
        if(qwe===-1){
            qwe = qwe=0;
            // // 900이하 미디어쿼리
            // if(window.innerWidth<900){
            // }
            // // 1200이하 미디어쿼리
            // if(window.innerWidth<1200){

            // }
        } 
            
        // 눌러서 오른쪽 끝까지 간다면
        else if(qwe=== page1_slide_li-2){
            qwe= qwe-1;
            // 900이하 미디어쿼리
            // if(window.innerWidth<900){
            // }
            // 1200이하 미디어쿼리
            // if(window.innerWidth<1200){
            //     qwe === page1_slide_li-1;
            // }

        }
        page1_slide.style.left=(qwe*-300)+"px";

        }
        // else if(qwe=== page1_slide_li-2) qwe= qwe-1;
        // page1_slide.style.left=(qwe*-33)+"%";
        // }

        page1_btns.forEach((ele,idx)=>{
            ele.onclick=()=>{
                event.preventDefault();
                page1sg(idx);
            }
        });

        // 2. more버튼을 누르면page2로 이동 - 완료
        document.querySelector('.p1more').onclick= ()=>{
            event.preventDefault();
           location.href="#page2"
        }

        // 3. 페이지2의 각 소제목을 누르면
        // 각소제목에 글씨색을 기본색으로 바꿔주고 다른 소제목에 클래스를 지워주고 
        // 클릭한 소제목에 클래스를준고 글씨색을 바꿔줌 - 완료
        // 이벤트대상 : .p2top li
        const p2topli = document.querySelectorAll('.p2top li');
        // 변경대상 : .page2 article
        const p2article = document.querySelectorAll('.page2 article')

        /* 
            함수명 showarticle
            기능 p2topli를 클릭하면 소제목에 클래스 넣어 보여주기
        */
        function showarticle (seq) {
            // 메뉴초기화
            for(let x of p2article){
                x.classList.remove('show');
            }
            p2article[seq].classList.add('show');

            for(let x of p2topli){
                x.classList.remove('black');
            }
            p2topli[seq].classList.add('black')
        }
        // 최초실행
        showarticle(0);
        // 실행코드
        p2topli.forEach((ele,idx)=>{
            ele.onclick= ()=>{
                event.preventDefault();
                showarticle(idx);
            }
        })

        // 페이지2의 moreinfo누르면 알림창
        const p3minfo = document.querySelector('.minfo')
        p3minfo.onclick = ()=>{
            event.preventDefault();
            alert('준비중입니다.')
        }

        // 페이지2의 갤러리 list와 grid
        // 이벤트 대상
        const p2gallery_a = document.querySelectorAll('.p2_5_top a');
        
        p2gallery_a.forEach((ele)=>{
            ele.onclick = () => {
                event.preventDefault();
            }
        })


        
        // 출력대상 : 
        // (1) .p2_5_cont_list
        const p25licontbx = document.querySelector('.p2_5_cont_list');
         // (2)  p2_5_gridbx
         const gridcontbx = document.querySelector('.p2_5_gridbx');

        /* 
            함수명 : p2g_list 
            기능 : 페이지2 갤러리에 배열 데이터를 출력
        */    
        function p2g_list() {
            // console.log(p2g_linfo["제목"][3])
            let hcode = "<ul>";
            for(let i = 0; i<10; i++){
                hcode += `
                <li>
                <div class="p2_5_li_imgbx">
                    <a href="#">
                        <img src="./subimg/${p2g_linfo["이미지"][i]}.jpg" alt="jupiter image">
                    </a>
                </div>
                <div class="p2_5_li_txtbx">
                    <div>
                        <a href="#">${p2g_linfo["제목"][i]}</a>
                    </div>
                    <div>
                        <p>${p2g_linfo["내용"][i]}</p>
                    </div>
                </div>
            </li>
                `;
            }//for문////
            hcode += "</ul>"
            // console.log(hcode)
            p25licontbx.innerHTML = hcode;
            p25licontbx.classList.add('show');
        }//p2g_list 함수 ////

        // 최초 list 형식이니 실행
        p2g_list();

        /* 
            함수명 : p2g_grid
            기능 : 페이지2 갤러리에 그리드 형식으로 출력
        */
        function p2g_grid() {
            
            let hcode = `<ul>`
            for(let i = 0; i<10; i++){
                hcode += `
                <li>
                    <div>
                    <img src="./subimg/${p2g_linfo["이미지"][i]}.jpg" alt="jupiter image">
                    </div>
                    <div>
                        <a href="#">${p2g_linfo["제목"][i]}</a>
                    </div>
                </li>
                `;
            } // for문 ////
            hcode += `</ul>`;
            gridcontbx.innerHTML = hcode;
            gridcontbx.classList.add('show');
        }//p2ggrid   함수 ////

        // list 나 gird누르면 그에맞는 형식으로 출력되어 보이기
        // 이벤트대상 .p2gallerries_look
        const p5glook = document.querySelectorAll('.p2gallerries_look');
        p5glook.forEach((ele,idx)=>{
            ele.onclick = () => {
                if(idx === 0 ){
                    gridcontbx.classList.remove('show');
                    p2g_list();

                }
                else {
                    p25licontbx.classList.remove('show');
                    p2g_grid();
                }

            }; //click ////
        })//forEach ////

       


} ////////////////// loadFn 함수 //////////////

 //////////////// loadFn 함수 ///////////////
/////////////////////////////////////////////
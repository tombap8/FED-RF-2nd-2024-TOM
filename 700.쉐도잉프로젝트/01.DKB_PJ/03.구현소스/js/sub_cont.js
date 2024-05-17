// 메인 페이지에서 서브 컨텐츠 띄우는 구현코드 ////

// 데이터 셋팅 불러오기 //////
import * as dkbData from "../data/dkb_data.js";

// console.log(dkbData);

export default function showSubBox() {
  // console.log("나를 부르면 서브가 보여~!");

  // 1. 서브 컨텐츠 보이기 기능 구현 ///
  // (1) 대상 선정
  // (1-1)이벤트 대상 :
  // 미리보기 : .preview-box li
  // 현장포토 : .live-box li
  // 대표포스터 : .poster-box li
  // 최신동영상 : .clip-box li
  const subViewBox = $(`
        .preview-box li,
        .live-box li,
        .poster-box li,
        .clip-box li
    `);

  // (1-2) 변경대상 : .sub-cont
  const subContBox = $(".sub-cont");

  // 전체 휠 이벤트 막기때문에 서브 컨텐츠박스도
  // 휠이 되지 않는다! 따라서 휠이벤트 버블링막기
  // 해야한다! -> stopPropagation()
  subContBox.on("wheel",e=>e.stopPropagation());

  // console.log(subViewBox);

  // 2. 이벤트 설정 및 함수구현하기 ////
  subViewBox.click(function () {
    // let confPrt =
    // $(this).parent().parent().is(".preview-box");
    // parent() 바로위 상위요소로 이동
    // 두번 위로 이동해서 li위 ul위 div
    // 그 div박스의 클래스가 preview-box인가?
    // is(클래스명) 메서드로 알아봄

    // [ 데이터명을 data-db에 넣고 읽어오기 ]
    // 사용하고자 하는 데이터 이름을 ul태그의
    // data-db 속성에 담아 놓고 이것을 읽어온다!
    let db = $(this).parent().attr("data-db");
    // $(this).parent()는 li 바로위의 부모인 ul이다!
    // attr('data-db') 속성값 읽어오기!

    // JS문법에서는 아래와 같음!
    // this.parentElement.parentElement
    // .classList.contains(클래스명)

    console.log("나야나!", this, db, dkbData[db]);

    // if (confPrt) {
    // 1. 키속성값 읽어오기
    let idx = $(this).attr("data-idx");
    // attr(속성명) -> 속성값 읽어오기 메서드
    // attr(속성명,속성값) -> 속성값 넣기 메서드
    console.log("idx:", idx);

    // [ 배열순회 메서드 비교 : forEach / find ]
    // forEach() 는 모두 순회한다!
    // find() 는 조건에 맞을때 return true하면
    // 해당 배열값이 변수에 할당된다!
    // 만약 일치하는 데이터가 없으면 undefined됨!

    // dkbData.previewData.forEach(v=>{

    // dkbData[db] -> 해당데이터 매칭하기!
    let selData = dkbData[db].find((v) => {
      if (v.idx == idx) {
        // console.log("찾았다!",v);
        return true;
      }
      console.log("돌아!");
    });

    console.log("검색결과:", selData);

    // 이미지의 개수를 반영한 배열을 임의로 만들고
    // 필요한 경우 이 배열로 map()을 돌려서 코드를 생성한다!
    // 우선 빈배열을 만든다!
    let iarr = [];
    // 현장포토일때 사용
    if (db == "liveData") {
      for (let i = 0; i < selData.imgName[1]; i++) iarr[i] = "";

      console.log("이미지map을 위한 배열:", iarr);
    } /// if ///


    // 서브박스에 내용 넣기
    // 제이쿼리는 innerHTML 할당대신
    // html() 메서드를 사용한다!
    subContBox
      .html(
        // 1.미리보기 출력
        db == "previewData"
          ? `
            <button class="cbtn">×</button>
            <div class="sub-inbox inbox">
                <h1>${selData.title}</h1>
                <div class="sub-item scbar">
                    ${selData.story}
                </div>
            </div>
          `
          : // 2.현장포토 출력
          db == "liveData"
          ? `
          <button class="cbtn">×</button>
            <div class="sub-inbox inbox">
                <h1>현장포토 : ${selData.title}</h1>
                <div class="sub-item scbar">
                ${iarr
                  .map(
                    (v, i) => `
                <img 
                  src="./images/live_photo/${selData.imgName[0]}/${i + 1}.jpg" 
                  alt="${selData.title}" />
                `
                  )
                  .join("")}
                </div>
            </div>
          `
          : // 3.대표 포스터 출력
          db == "posterData"
          ? `
          <button class="cbtn">×</button>
            <div class="sub-inbox inbox">
                <h1>대표 포스터 : ${selData.title}</h1>
                <div class="sub-item scbar">
                    <img 
                      src="./images/poster_img/${selData.imgName}_big.jpg" 
                      alt="${selData.title}" />
                </div>
            </div>
          `
          : // 4.최신 동영상 출력
          db == "clipData"
          ? `
          <button class="cbtn">×</button>
            <div class="sub-inbox inbox">
                <h1>클립영상 : ${selData.title}</h1>
                <div class="sub-item scbar">
                  <iframe src="https://www.youtube.com/embed/${selData.mvid}?autoplay=1" allow="autoplay"></iframe>
                  <h2>${selData.subtit}</h2>
                </div>
            </div>
          `
          : // 5.위의 해당사항이 없을 경우
            `
          <button class="cbtn">×</button>
          <div class="sub-inbox inbox">
              <h1>DB정보확인필요!</h1>
          </div>
          `
      )
      .show();
    // show() 는 display를 보여주는 메서드
    // hide() 는 display를 숨기는 메서드
    // toggle() 는 display를 토글하는 메서드

    // 닫기버튼 이벤트 설정하기 : 숨기기, 내용지우기
    $(".cbtn").click(() => {
      subContBox.hide().html('');
    });
    // } /// if /////
  });
} /////////// showSubBox 함수 ///////////////

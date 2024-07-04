// Pilot PJ 전체메뉴 컴포넌트

// 컨텍스트 API호출
import { useContext } from "react";
import { pCon } from "./pCon";

export function TotalMenu() {
  // 컨텍스트 사용하기
  const myCon = useContext(pCon);

  // 서브페이지 이동함수 ///
  const goSub = (e) => {
    // 1.기본이동막기
    e.preventDefault();
    // 2.이동할 서브 페이지명 : a요소의 글자를 소문자로!
    let pgName = e.target.innerText.toLowerCase();
    console.log("이동할 페이지:", pgName);
    // -> 아이템 리스트 페이지는 중간 공백을 데쉬로 변경
    pgName = pgName.replace(" ","-");
    // 3.서브페이지 이동위해 상태변수업데이트
    myCon.setPgName(pgName);
    // 4.햄버거버튼 클릭이벤트 발생하여 전체메뉴 닫기
    document.querySelector(".ham").click();
  }; ///////// goSub ///////////////

  // 코드 리턴 //////////////////////
  return (
    <>
      <div className="mbox">
        <video
          src={process.env.PUBLIC_URL+"/images/disc2018.mp4"}
          loop="loop"
          muted="muted"
          className="bgm"
        ></video>
        <nav className="mlist">
          <dl>
            <dt>
              <a href="#" onClick={goSub}>
                MEN
              </a>
            </dt>
            <dd>
              <a href="#">T-SHIRT</a>
            </dd>
            <dd>
              <a href="#">JACKET</a>
            </dd>
            <dd>
              <a href="#">TRAINING WARE</a>
            </dd>
            <dd>
              <a href="#">BEACH WARE</a>
            </dd>
          </dl>
          <dl>
            <dt>
              <a href="#" onClick={goSub}>
                WOMEN
              </a>
            </dt>
            <dd>
              <a href="#">T-SHIRT</a>
            </dd>
            <dd>
              <a href="#">JACKET</a>
            </dd>
            <dd>
              <a href="#">TRAINING WARE</a>
            </dd>
            <dd>
              <a href="#">BEACH WARE</a>
            </dd>
          </dl>
          <dl>
            <dt>
              <a href="#" onClick={goSub}>
                STYLE
              </a>
            </dt>
            <dd>
              <a href="#">COLLECTION</a>
            </dd>
            <dd>
              <a href="#">SEASON AD</a>
            </dd>
            <dd>
              <a href="#">STAR &amp; NEWS</a>
            </dd>
            <dd>
              <a href="#">MAIN ITEM</a>
            </dd>
          </dl>
          <dl>
            <dt>
              <a href="#" onClick={goSub}>
                ITEM LIST
              </a>
            </dt>
            <dd></dd>
          </dl>
        </nav>
      </div>
    </>
  );
} ///////// TotalMenu 컴포넌트 //////////

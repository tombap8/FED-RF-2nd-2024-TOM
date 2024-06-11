// 메인영역 컴포넌트 ///////

// 부드러운 스크롤 불러오기
import { scrolled, setPos } from "../../js/smoothScroll24";

// 스크롤 등장 함수 불러오기
import scrollShowFn from "../scroll_show";

import "../../css/scroll_show.css";
export default function MainArea() {
  // 컴포넌트 화면 랜더링직전 로드구역 //////
  React.useLayoutEffect(() => {
    // 스크롤 등장 대상에 클래스 넣기 : .hide-el
    // [제이쿼리용 forEach메서드]
    // each((idx,ele)=>{코드})
    // idx - 순번 / ele - 요소자신
    $(".main-area>section").each((idx, ele) => {
      // 첫번째를 제외한 나머지 모두 클래스 넣기
      if (idx != 0) $(ele).addClass("hide-el");
    }); ///////// each ////////

    // 스크롤 등장함수 호출
    scrollShowFn();

    ////////////////////////////////////////////////////////
    // [ 이벤트의 해제는 removeEventListener()를 사용한다!!! ]
    // 부드러운 스크롤은 "home"에서만 적용함!
    document.addEventListener("wheel", scrolled, { passive: false });

    /////////////////////////////////////////////////////////

    // 슬림적용 대상: #top-area
    const topMenu = document.querySelector("#top-area");
    // 상단이동 버튼 대상 : .tbtn
    const tbtn = document.querySelector(".tbtn");
    // 상단이동기능
    tbtn.onclick = (e) => {
      // 기본이동막기
      e.preventDefault();

      // 상단이동하기 : 부드러운스크롤 위치값 업데이트
      setPos(0);

      // 제이쿼리 애니메이션 상단이동
      $("html,body").animate({ scrollTop: "0" }, 500);

      // 위치값 이동하기 : scrollTo(가로스크롤, 세로스크롤)
      // window.scrollTo(0, 0);
    }; ///// click ///////

    // 슬림메뉴 적용하기 : "home"에서만 적용
    const chkSlim = () => {
      // 스크롤 위치값 구하기
      let scTop = window.scrollY;
      // console.log("슬림적용!!!", scTop);

      // 슬림메뉴 적용
      if (scTop > 200) topMenu.classList.add("on");
      else topMenu.classList.remove("on");

      // 상단이동버튼 적용
      if (scTop > 300) tbtn.classList.add("on");
      else tbtn.classList.remove("on");
    }; //////// chkSlim 함수 /////////

    // 스크롤 이벤트 적용하기 : scroll이벤트
    window.addEventListener("scroll", chkSlim);

    // 부드러운 스크롤 초기값 0
    setPos(0);

    console.log("MainArea시작!");

    // 컴포넌트 소멸시(unmounting) 리턴함수사용!
    // 리턴함수안의 함수나 함수구역이 소멸시 실행됨!
    return () => {
      console.log("MainArea종료!");
      // 이 구역에서 전역적으로 셋팅된 이벤트함수를
      // 삭제 처리하면 된다!
      // window, document, body 이 세가지의 경우는
      // 컴포넌트가 소멸해도 그대로 존재하게 되므로
      // 이벤트를 removeEventListener로 지운다!

      // [0] 부드러운 스크롤 초기값 0
      setPos(0);

      // [1] 부드러운 스크롤 이벤트 삭제
      document.removeEventListener("wheel", scrolled, { passive: false });
      
      // [2] 슬림 스크롤 이벤트 삭제
      window.removeEventListener("scroll", chkSlim);

      // [3] 클래스가 들어가있을 수 있으므로 삭제코드 실행
      topMenu.classList.remove("on");
      tbtn.classList.remove("on");

      // 참고로 이벤트를 개별 셋팅한 요소의 이벤트를 지울경우
      // 속성할당방식의 이벤트는 빈값을 할당해서 지우거나
      // 예) tbtn.onclick = "";
      // 제이쿼리일 경우 off() 메서드로 삭제한다!
      // 예) $(".my").off("click");
      // 이벤트 등록으로 설정한 것은
      // removeEventListener로 삭제
    }; ////// 소멸시 return함수 ///////
  }, []); ////// useLayoutEffect 구역 ////////

  // 코드 리턴구역 ////////////////////////////
  return (
    <div id="main-area">
      <main className="main-area ibx">
        {/* <!-- 컨텐츠1 --> */}
        <section className="pt1">
          <div className="cbx bgi bg1">
            <h2>복싱과 맺은 모델 수주의 이야기</h2>
          </div>
        </section>
        {/* <!-- 컨텐츠2 --> */}
        <section className="pt2">
          <div className="cbx bgi bg2">
            <h2>안현모,홍지민,강주은 써마지 더 리얼 인터뷰</h2>
          </div>
          <div className="cbx bgi bg3">
            <h2>손 번쩍! 잘 때 ‘만세 자세’가 해로운 이유</h2>
          </div>
          <div className="cbx bgi bg4">
            <h2>아미(Ami)와 장폴구드(Jean-Paul Goude)의 컬래버레이션</h2>
          </div>
        </section>
        {/* <!-- 컨텐츠3 --> */}
        <section className="pt1">
          <div className="cbx bgi bg5">
            <h2>
              &lt;퀸스 갬빗&gt; 이후 엄청난 신작을 준비 중인 안야 테일러 조이
            </h2>
          </div>
        </section>
        {/* <!-- 컨텐츠4 --> */}
        <section className="pt2">
          <div className="cbx bgi bg6">
            <h2>마리아 그라치아 치우리의 디올 크루즈 2022 컬렉션 쇼</h2>
          </div>
          <div className="cbx bgi bg7">
            <h2>약, 그렇게 버리면 되돌아옵니다</h2>
          </div>
          <div className="cbx bgi bg8">
            <h2>셀럽들이 하는 여름 주얼리</h2>
          </div>
        </section>
        {/* <!-- 컨텐츠5 --> */}
        <section className="pt1">
          <div className="cbx bgi bg9">
            <h2>김여진이 감행하는 변화에 대하여</h2>
          </div>
        </section>
        {/* <!-- 컨텐츠6 --> */}
        <section className="pt2">
          <div className="cbx bgi bg10">
            <h2>모델 아이린이 선택한 여름 원피스 Best</h2>
          </div>
          <div className="cbx bgi bg11">
            <h2>김여진이 감행하는 변화에 대하여</h2>
          </div>
          <div className="cbx bgi bg12">
            <h2>샛노란 ‘자무 주스’가 뜬다!</h2>
          </div>
        </section>
        {/* <!-- 컨텐츠7 --> */}
        <section className="pt2">
          <div className="cbx bgi bg13">
            <h2>체커보드의 색다른 매력</h2>
          </div>
          <div className="cbx bgi bg14">
            <h2>‘손꾸’의 끝, 핑거 타투와 네일의 조합</h2>
          </div>
          <div className="cbx bgi bg15">
            <h2>지속 가능한 변화를 이끄는 백 브랜드 6</h2>
          </div>
        </section>
      </main>
    </div>
  );
} ///////// MainArea 컴포넌트 ///////////

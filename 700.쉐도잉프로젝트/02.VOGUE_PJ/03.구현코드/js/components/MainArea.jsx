// 메인영역 컴포넌트 ///////

export default function MainArea() {

  React.useLayoutEffect(()=>{
    ////////////////////////////////////////////////////////
    // [ 이벤트의 해제는 removeEventListener()를 사용한다!!! ]
    // 부드러운 스크롤은 "home"에서만 적용함!
    if (menu == "home")
      document.addEventListener("wheel", scrolled, 
    { passive: false });
    // "home"이 아닌경우는 모두 이벤트를 해재한다!
    else document.removeEventListener("wheel", scrolled, 
    { passive: false });
    /////////////////////////////////////////////////////////

    // 슬림적용 대상: #top-area
    const topMenu = document.querySelector("#top-area");
    // 상단이동 버튼 대상 : .tbtn
    const tbtn = document.querySelector(".tbtn");
    // 상단이동기능
    tbtn.onclick = (e)=>{
      // 기본이동막기
      e.preventDefault();
      // 상단이동하기 : 부드러운스크롤 위치값 업데이트
      setPos(0);
      // 위치값 이동하기 : scrollTo(가로스크롤, 세로스크롤)
      window.scrollTo(0, 0);

    }; ///// click ///////

    // 슬림메뉴 적용하기 : "home"에서만 적용
    const chkSlim = () => {    
      console.log("현재메뉴:",menu);  
      // 메뉴 "home"일때만 적용 //////////
      if(menu == "home"){
        // 스크롤 위치값 구하기
        let scTop = window.scrollY;
        console.log("슬림적용!!!", scTop);

        // 슬림메뉴 적용
        if (scTop > 200) topMenu.classList.add("on");
        else topMenu.classList.remove("on");
  
        // 상단이동버튼 적용
        if (scTop > 300) tbtn.classList.add("on");
        else tbtn.classList.remove("on");
      } ///////// 메뉴 "home"일때만 적용 /////
    }; //////// chkSlim 함수 /////////


    // 스크롤 이벤트 적용하기 : scroll이벤트
    // "home"에서만 적용하기
    if (menu == "home") {
      console.log("홈이야~!");
      setPos(0);
      window.addEventListener("scroll", chkSlim);

    }
    else{
      console.log("서브야~!",menu);
      setPos(0);
      window.removeEventListener("scroll", chkSlim);

    } 
  },[]);


  // 코드 리턴구역 /////
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

// 아이템 페이지영역 컴포넌트 ///////

// 아이템 카테고리 데이터 불러오기
import catData from "../data/category";

export default function ItemsArea({catName}) {

  console.log(catData[catName]);


  // 코드 리턴구역 /////
  return (
    <div id="main-area">
      <main className="main-area ibx fashion">
        {/* <!-- 2-1. 카테고리 페이지 상단영역 --> */}
        <header className="cat-top-area">
          {/* <!-- 2-1-1. 서브타이틀 --> */}
          <h2 className="cat-tit">Fashion</h2>
          {/* <!-- 2-1-2. 서브메뉴(LNB:Local Navigation Bar) --> */}
          <nav className="lnb"></nav>
        </header>
        {/* <!-- 2-2. 카테고리 페이지 컨텐츠영역 --> */}
        <div className="cat-cont-area">
          <section className="pt2">
            <div className="cbx bgi bg1-1">
              <h2></h2>
            </div>
            <div className="cbx bgi bg1-2">
              <h2></h2>
            </div>
            <div className="cbx bgi bg1-3">
              <h2></h2>
            </div>
          </section>
          <section className="pt2">
            <div className="cbx bgi bg2-1">
              <h2></h2>
            </div>
            <div className="cbx bgi bg2-2">
              <h2></h2>
            </div>
            <div className="cbx bgi bg2-3">
              <h2></h2>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} ///////// ItemsArea 컴포넌트 ///////////

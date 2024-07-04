// 아이템리스트 컴포넌트 - ItemList.jsx
import React, { useEffect } from "react";

// 상품 데이터 불러오기 : 원본데이터
import itemListData from "../../js/data/item_list";


// 컴포넌트 CSS
import "../../css/item_list.scss";

// 제이쿼리
import $ from "jquery";

function ItemList(props) {

    // 화면랜더링구역 ////////
    useEffect(()=>{
        // 전체 스크롤바 살리기
        $("html,body").css({overflow: "visible"});

    },[]); ////// useEffect ///////

    // 코드리턴구역 //////////////////
  return (
    <main id="cont">
      <h1 className="tit">All ITEMS LIST</h1>
      <section>
        <div id="optbx">
          <label htmlFor="men">남성</label>
          <input type="checkbox" className="chkbx" id="men" defaultChecked />
          <label htmlFor="women">여성</label>
          <input type="checkbox" className="chkbx" id="women" defaultChecked />
          <label htmlFor="style">스타일</label>
          <input type="checkbox" className="chkbx" id="style" defaultChecked />
        </div>
        <div className="grid">
        <div>
            <a href="#">
              [1]
              <img src="./images/goods/men/m1.png" alt="dress" />
              <aside>
                <h2>[남성]카모전판프린트 PQ 티셔츠</h2>
                <h3>99,000원</h3>
              </aside>
            </a>
          </div>
        </div>
      </section>

      {/* 상세 상품정보 박스 */}
      <div
        className="bgbx"
        style={{
          position: "fixed",
          top: "0px",
          paddingTop: "12vh",
          backdropFilter: "blur(8px)",
          height: "100vh",
          zIndex: "9999",
        }}
      >
        <a href="#" className="cbtn">
          <span className="ir">닫기버튼</span>
        </a>
        <div id="imbx">
          <div className="inx">
            <section className="gim/g">
              <img src="./images/goods/men/m1.png" alt="큰 이미지" />
              <div className="small">
                <a href="#">
                  <img src="./images/goods/men/m1.png" alt="썸네일 이미지" />
                  <img src="./images/goods/men/m2.png" alt="썸네일 이미지" />
                  <img src="./images/goods/men/m3.png" alt="썸네일 이미지" />
                  <img src="./images/goods/men/m4.png" alt="썸네일 이미지" />
                  <img src="./images/goods/men/m5.png" alt="썸네일 이미지" />
                  <img src="./images/goods/men/m6.png" alt="썸네일 이미지" />
                </a>
              </div>
            </section>
            <section className="gdesc scbar">
              <h1>HOME &gt; MEN</h1>
              <div>
                <ol>
                  <li>
                    <img src="./images/dx_ico_new-28143800.gif" alt="new버튼" />
                  </li>
                  <li id="gtit">상품명: [남성]카모전판프린트 PQ 티셔츠</li>
                  <li>
                    <img
                      src="./images/icon_type02_social01.gif"
                      alt="페이스북"
                    />
                    <img src="./images/icon_type02_social02.gif" alt="트위터" />
                    <img src="./images/icon_mail02.gif" alt="이메일" />
                    <img src="./images/btn_source_copy.gif" alt="URL복사" />
                  </li>
                  <li>
                    <span>판매가</span>
                    <span id="gprice">99,000원</span>
                  </li>
                  <li>
                    <span>적립금</span>
                    <span>
                      <img src="./images/icon_my_m02.gif" alt="적립금" />
                      4,950(5%적립)
                    </span>
                  </li>
                  <li>
                    <span>무이자할부</span>
                    <span>
                      부분 무이자 할부 혜택
                      <img
                        src="./images/view_btn_nointerest_card.gif"
                        alt="무이자카드보기"
                      />
                    </span>
                  </li>
                  <li>
                    <span>상품코드</span> <span id="gcode">DMTS7K731-MG</span>
                  </li>
                  <li>
                    <span>사이즈</span> <span>95 100 105 110</span>
                  </li>
                  <li>
                    <span>구매수량</span>
                    <span>
                      <input type="text" id="sum" defaultValue="1" />
                      <b className="chg_num">
                        <img src="./images/cnt_up.png" alt="증가" />
                        <img src="./images/cnt_down.png" alt="감소" />
                      </b>
                    </span>
                  </li>
                  <li>
                    <span>컬러</span> <span></span>
                  </li>
                  <li>
                    <span>권장계절</span> <span>여름</span>
                  </li>
                  <li className="tot">
                    <span>총합계</span>
                    <span id="total">99,000원</span>
                  </li>
                </ol>
              </div>
              <div>
                <button className="btn btn1">BUY NOW</button>
                <button className="btn">SHOPPING CART</button>
                <button className="btn">WISH LIST</button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ItemList;

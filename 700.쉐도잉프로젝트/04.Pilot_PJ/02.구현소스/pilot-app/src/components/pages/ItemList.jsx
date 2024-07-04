// 아이템리스트 컴포넌트 - ItemList.jsx
import React from "react";

// 컴포넌트 CSS
import "../../css/item_list.scss";

function ItemList(props) {
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
          <div>
            <a href="#">
              [2]
              <img src="./images/goods/style/m7.png" alt="dress" />
              <aside>
                <h2>[스타일]블럭형 풀집업 래쉬가드</h2>
                <h3>99,000원</h3>
              </aside>
            </a>
          </div>
          <div>
            <a href="#">
              [3]
              <img src="./images/goods/men/m8.png" alt="dress" />
              <aside>
                <h2>[남성]베이직 솔리드 래쉬가드</h2>
                <h3>49,000원</h3>
              </aside>
            </a>
          </div>
          <div>
            <a href="#">
              [4]
              <img src="./images/goods/style/m8.png" alt="dress" />
              <aside>
                <h2>[스타일]베이직 솔리드 래쉬가드</h2>
                <h3>49,000원</h3>
              </aside>
            </a>
          </div>
          <div>
            <a href="#">
              [5]
              <img src="./images/goods/women/m2.png" alt="dress" />
              <aside>
                <h2>[여성]빅로고 컬러 블럭 PQ 티셔츠</h2>
                <h3>89,000원</h3>
              </aside>
            </a>
          </div>
          <div>
            <a href="#">
              [6]
              <img src="./images/goods/men/m9.png" alt="dress" />
              <aside>
                <h2>[남성]남성 루즈핏 슬리브리스</h2>
                <h3>59,000원</h3>
              </aside>
            </a>
          </div>
          <div>
            <a href="#">
              [7]
              <img src="./images/goods/women/m3.png" alt="dress" />
              <aside>
                <h2>[여성]빅로고 컬러 블럭 PQ 티셔츠</h2>
                <h3>89,000원</h3>
              </aside>
            </a>
          </div>
          <div>
            <a href="#">
              [8]
              <img src="./images/goods/style/m1.png" alt="dress" />
              <aside>
                <h2>[스타일]카모전판프린트 PQ 티셔츠</h2>
                <h3>99,000원</h3>
              </aside>
            </a>
          </div>
          <div>
            <a href="#">
              [9]
              <img src="./images/goods/women/m4.png" alt="dress" />
              <aside>
                <h2>[여성]부분 스트라이프 PQ 티셔츠</h2>
                <h3>99,000원</h3>
              </aside>
            </a>
          </div>
          <div>
            <a href="#">
              [10]
              <img src="./images/goods/style/m2.png" alt="dress" />
              <aside>
                <h2>[스타일]빅로고 컬러 블럭 PQ 티셔츠</h2>
                <h3>89,000원</h3>
              </aside>
            </a>
          </div>
          <div>
            <a href="#">
              [11]
              <img src="./images/goods/style/m3.png" alt="dress" />
              <aside>
                <h2>[스타일]빅로고 컬러 블럭 PQ 티셔츠</h2>
                <h3>89,000원</h3>
              </aside>
            </a>
          </div>
          <div>
            <a href="#">
              [12]
              <img src="./images/goods/women/m1.png" alt="dress" />
              <aside>
                <h2>[여성]카모전판프린트 PQ 티셔츠</h2>
                <h3>99,000원</h3>
              </aside>
            </a>
          </div>
          <div>
            <a href="#">
              [13]
              <img src="./images/goods/women/m5.png" alt="dress" />
              <aside>
                <h2>[여성]웰딩포인트 트레이닝 하프팬츠</h2>
                <h3>89,000원</h3>
              </aside>
            </a>
          </div>
          <div>
            <a href="#">
              [14]
              <img src="./images/goods/men/m2.png" alt="dress" />
              <aside>
                <h2>[남성]빅로고 컬러 블럭 PQ 티셔츠</h2>
                <h3>89,000원</h3>
              </aside>
            </a>
          </div>
          <div>
            <a href="#">
              [15]
              <img src="./images/goods/men/m3.png" alt="dress" />
              <aside>
                <h2>[남성]빅로고 컬러 블럭 PQ 티셔츠</h2>
                <h3>89,000원</h3>
              </aside>
            </a>
          </div>
          <div>
            <a href="#">
              [16]
              <img src="./images/goods/women/m6.png" alt="dress" />
              <aside>
                <h2>[여성]블럭형 풀집업 래쉬가드</h2>
                <h3>99,000원</h3>
              </aside>
            </a>
          </div>
          <div>
            <a href="#">
              [17]
              <img src="./images/goods/women/m9.png" alt="dress" />
              <aside>
                <h2>[여성]여성 루즈핏 슬리브리스</h2>
                <h3>59,000원</h3>
              </aside>
            </a>
          </div>
          <div>
            <a href="#">
              [18]
              <img src="./images/goods/men/m4.png" alt="dress" />
              <aside>
                <h2>[남성]부분 스트라이프 PQ 티셔츠</h2>
                <h3>99,000원</h3>
              </aside>
            </a>
          </div>
          <div>
            <a href="#">
              [19]
              <img src="./images/goods/women/m7.png" alt="dress" />
              <aside>
                <h2>[여성]블럭형 풀집업 래쉬가드</h2>
                <h3>99,000원</h3>
              </aside>
            </a>
          </div>
          <div>
            <a href="#">
              [20]
              <img src="./images/goods/women/m8.png" alt="dress" />
              <aside>
                <h2>[여성]베이직 솔리드 래쉬가드</h2>
                <h3>49,000원</h3>
              </aside>
            </a>
          </div>
          <div>
            <a href="#">
              [21]
              <img src="./images/goods/men/m7.png" alt="dress" />
              <aside>
                <h2>[남성]블럭형 풀집업 래쉬가드</h2>
                <h3>99,000원</h3>
              </aside>
            </a>
          </div>
          <div>
            <a href="#">
              [22]
              <img src="./images/goods/style/m4.png" alt="dress" />
              <aside>
                <h2>[스타일]부분 스트라이프 PQ 티셔츠</h2>
                <h3>99,000원</h3>
              </aside>
            </a>
          </div>
          <div>
            <a href="#">
              [23]
              <img src="./images/goods/men/m5.png" alt="dress" />
              <aside>
                <h2>[남성]웰딩포인트 트레이닝 하프팬츠</h2>
                <h3>89,000원</h3>
              </aside>
            </a>
          </div>
          <div>
            <a href="#">
              [24]
              <img src="./images/goods/style/m5.png" alt="dress" />
              <aside>
                <h2>[스타일]웰딩포인트 트레이닝 하프팬츠</h2>
                <h3>89,000원</h3>
              </aside>
            </a>
          </div>
          <div>
            <a href="#">
              [25]
              <img src="./images/goods/men/m6.png" alt="dress" />
              <aside>
                <h2>[남성]블럭형 풀집업 래쉬가드</h2>
                <h3>99,000원</h3>
              </aside>
            </a>
          </div>
          <div>
            <a href="#">
              [26]
              <img src="./images/goods/style/m6.png" alt="dress" />
              <aside>
                <h2>[스타일]블럭형 풀집업 래쉬가드</h2>
                <h3>99,000원</h3>
              </aside>
            </a>
          </div>
          <div>
            <a href="#">
              [27]
              <img src="./images/goods/style/m9.png" alt="dress" />
              <aside>
                <h2>[스타일]루즈핏 슬리브리스</h2>
                <h3>59,000원</h3>
              </aside>
            </a>
          </div>
        </div>
      </section>
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

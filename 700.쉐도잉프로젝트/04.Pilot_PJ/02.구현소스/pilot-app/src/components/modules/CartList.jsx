import React, { useContext } from "react";

// 카트 리스트 CSS
import "../../css/cart_list.scss";
import { pCon } from "./pCon";
import { addComma } from "../../js/func/common_fn";

function CartList(props) {
  // 컨텍스트 사용
  const myCon = useContext(pCon);

  // 로컬스 데이터 가져오기
  const selData = JSON.parse(localStorage.getItem("cart-data"));
  console.log("로컬스:", selData);

  ///// 코드리턴구역 /////////////
  return (
    <section id="cartlist" style={{ right: "0px" }}>
      <a
        href="#"
        className="cbtn cbtn2"
        onClick={(e) => {
          e.preventDefault();
          // 카트 상태값 업데이트
          myCon.setCartSts(false);
        }}
      >
        <span>닫기버튼</span>
      </a>
      <table>
        <caption>
          <h1> 카트 리스트</h1>
        </caption>
        <thead>
          <tr>
            <th>상품</th>
            <th>번호</th>
            <th>상품명</th>
            <th>상품코드</th>
            <th>단가</th>
            <th>수량</th>
            <th>합계</th>
            <th>삭제</th>
          </tr>
        </thead>
        {/* 테이블 메인영역 */}
        <tbody>
          <tr>
            <td colSpan={8}>
              <div
                style={{
                  overflowY: "auto",
                  height: "40vh",
                  width: "100%",
                }}
              >
          {/* 내부용 스크롤되는 테이블 */}
          <table>
            <tbody>
          {/* 카트데이터 연동파트
          ************************** 
            [데이터 구조정의]
            1. num : 카트리스트 순번
            2. idx : 상품고유번호
            3. cat : 카테고리
            4. ginfo : 상품정보
            5. cnt : 상품개수
          **************************          
          */}
            {selData.map((v, i) => (
              <tr key={i}>
                <td>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      `/images/goods/${v.cat}/${v.ginfo[0]}.png`
                    }
                    alt="item"
                  />
                </td>
                <td>{v.num}</td>
                <td>{v.ginfo[1]}</td>
                <td>{v.ginfo[2]} </td>
                <td>{addComma(v.ginfo[3])}원</td>
                <td className="cnt-part">
                  <div>
                    <span>
                      <input
                        type="text"
                        className="item-cnt"
                        readOnly
                        value={v.cnt}
                        onChange={() => {}}
                      />
                      <button className="btn-insert" data-idx="20">
                        반영
                      </button>
                      <b className="btn-cnt">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/images/cnt_up.png"
                          }
                          alt="증가"
                        />
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/images/cnt_down.png"
                          }
                          alt="감소"
                        />
                      </b>
                    </span>
                  </div>
                </td>
                <td>{addComma(v.ginfo[3] * v.cnt)}원</td>
                <td>
                  <button className="cfn" data-idx="20">
                    ×
                  </button>
                </td>
              </tr>
            ))}
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
        {/* 테이블 하단영역 */}
        <tfoot>
          <tr>
            <td colSpan="6">총합계 :</td>
            <td>662,000원</td>
            <td></td>
          </tr>
          <tr>
            <td colSpan="8" className="paging">
              <button>Buy Now</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </section>
  );
}

export default CartList;

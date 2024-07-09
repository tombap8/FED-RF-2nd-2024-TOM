import React, { useContext } from "react";

// 카트 리스트 CSS
import "../../css/cart_list.scss";
import { pCon } from "./pCon";

function CartList(props) {

    // 컨텍스트 사용
    const myCon = useContext(pCon);

    ///// 코드리턴구역 /////////////
  return (
    <section id="cartlist" style={{right: "0px"}}>
      <a href="#" className="cbtn cbtn2"
      onClick={e=>{
        e.preventDefault();
        // 카트 상태값 업데이트
        myCon.setCartSts(false);
      }}>
        <span>닫기버튼</span>
      </a>
      <table>
        <caption>
          <h1> 카트 리스트</h1>
        </caption>
        <tbody>
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
          {/* 카트데이터 연동파트 */}
          <tr>
            <td>
              <img src={process.env.PUBLIC_URL+"/images/goods/women/m8.png"} alt="item" />
            </td>
            <td>6</td>
            <td>[여성]베이직 솔리드 래쉬가드</td>
            <td>DMSW15731-BK </td>
            <td>49,000원</td>
            <td className="cnt-part">
              <div>
                <span>
                  <input type="text" className="item-cnt" readOnly="" defaultValue="1" />
                  <button className="btn-insert" data-idx="20">
                    반영
                  </button>
                  <b className="btn-cnt">
                    <img src={process.env.PUBLIC_URL+"/images/cnt_up.png"} alt="증가" />
                    <img src={process.env.PUBLIC_URL+"/images/cnt_down.png"} alt="감소" />
                  </b>
                </span>
              </div>
            </td>
            <td>49,000원</td>
            <td>
              <button className="cfn" data-idx="20">
                ×
              </button>
            </td>
          </tr>          
          <tr>
            <td colSpan="6">총합계 :</td>
            <td>662,000원</td>
            <td></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="8" className="paging">
              <a href="#">1</a> | <b>2</b>
            </td>
          </tr>
        </tfoot>
      </table>
    </section>
  );
}

export default CartList;

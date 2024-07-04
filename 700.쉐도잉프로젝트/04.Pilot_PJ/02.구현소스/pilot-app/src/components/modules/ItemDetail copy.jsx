import React from "react";
import { addComma } from "../../js/func/common_fn";

function ItemDetail({cat,ginfo,dt,chgFn}) {
    // cat - 카테고리
    // ginfo - 상품정보
    console.log(cat, ginfo);
  return (
    <>
      <a href="#" className="cbtn">
        <span className="ir">닫기버튼</span>
      </a>
      <div id="imbx">
        <div className="inx">
          <section className="gimg">
            <img src={process.env.PUBLIC_URL+`/images/goods/${cat}/${ginfo[0]}.png`} alt="큰 이미지" />
            <div className="small">
              {
                Array(5).fill('').map((v,i)=>{
                  let num = ginfo[0].substr(1)<=i+1?i+5:i+1;
              return <a href="#" key={i}
              onClick={(e)=>{
                // 기본이동막기
                e.preventDefault();
                // 상품상세모듈 전달 상태변수 변경
                let res = dt.find(v=>{if(v.cat==cat&&v.ginfo[0]=="m"+num)return true;})
                chgFn(res.ginfo);
              }}>
                <img src={process.env.PUBLIC_URL
                  +`/images/goods/${cat}/m${num}.png`} alt="썸네일 이미지" />
              </a>}

                )
              }
            </div>
          </section>
          <section className="gdesc scbar">
            <h1>HOME &gt; {cat.toUpperCase()}</h1>
            <div>
              <ol>
                <li>
                  <img src={process.env.PUBLIC_URL+"/images/dx_ico_new-28143800.gif"} alt="new버튼" />
                </li>
                <li id="gtit">상품명: {ginfo[1]}</li>
                <li>
                  <img src={process.env.PUBLIC_URL+"/images/icon_type02_social01.gif"} alt="페이스북" />
                  <img src={process.env.PUBLIC_URL+"/images/icon_type02_social02.gif"} alt="트위터" />
                  <img src={process.env.PUBLIC_URL+"/images/icon_mail02.gif"} alt="이메일" />
                  <img src={process.env.PUBLIC_URL+"/images/btn_source_copy.gif"} alt="URL복사" />
                </li>
                <li>
                  <span>판매가</span>
                  <span id="gprice">{addComma(ginfo[3])}원</span>
                </li>
                <li>
                  <span>적립금</span>
                  <span>
                    <img src={process.env.PUBLIC_URL+"/images/icon_my_m02.gif"} alt="적립금" />
                    4,950(5%적립)
                  </span>
                </li>
                <li>
                  <span>무이자할부</span>
                  <span>
                    부분 무이자 할부 혜택
                    <img
                      src={process.env.PUBLIC_URL+"/images/view_btn_nointerest_card.gif"}
                      alt="무이자카드보기"
                    />
                  </span>
                </li>
                <li>
                  <span>상품코드</span> <span id="gcode">{ginfo[2]}</span>
                </li>
                <li>
                  <span>사이즈</span> <span>95 100 105 110</span>
                </li>
                <li>
                  <span>구매수량</span>
                  <span>
                    <input type="text" id="sum" defaultValue="1" />
                    <b className="chg_num">
                      <img src={process.env.PUBLIC_URL+"/images/cnt_up.png"} alt="증가" />
                      <img src={process.env.PUBLIC_URL+"/images/cnt_down.png"} alt="감소" />
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
                  <span id="total">{addComma(ginfo[3])}원</span>
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
    </>
  );
}

export default ItemDetail;

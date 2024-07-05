import React from "react";
import { addComma } from "../../js/func/common_fn";

import $ from "jquery";

function ItemDetail({ cat, ginfo, dt, setGinfo }) {
  // cat - 카테고리
  // ginfo - 상품정보
  // dt - 상품데이터
  // setGinfo - ginfo값 변경메서드
  console.log(cat, ginfo);

  // [ 배열 생성 테스트 ]
  // 1. 배열변수 = [] -> 배열리터럴
  // -> 생성된 배열을 for문을 돌려서 값을 할당함
  // 2. 배열객체로 만들기
  // -> new Array(개수) -> 개수만큼 배열생성(빈배열)
  // -> new생략하여 인스턴스 생성가능! (정적객체)
  // -> Array(개수) -> 그.러.나... 빈배열은 map() 못돌림!ㅠ.ㅠ
  // 3. 배열에 값을 넣어주는 메서드
  // ->>> 배열.fill(값,시작번호,끝번호)
  // fill(값) : 모든배열 다 같은 값 채우기
  // fill(값,시작번호) : 0부터 시작하는 번호중 특정배열부터 끝까지 채움
  // fill(값,시작번호,끝번호) : 시작번호부터 끝번호까지 채움
  // console.log(Array(10));
  // console.log(Array(10).fill(8));
  // console.log(Array(10).fill(7, 2));
  // console.log(Array(10).fill(7, 2, 5));

  return (
    <>
      <a
        href="#"
        className="cbtn"
        onClick={(e) => {
          // 기본이동막기
          e.preventDefault();
          // 창닫기
          $(".bgbx").hide();
        }}
      >
        <span className="ir">닫기버튼</span>
      </a>
      <div id="imbx">
        <div className="inx">
          <section className="gimg">
            {/* 선택한 상품 큰이미지 */}
            <img
              src={
                process.env.PUBLIC_URL + `/images/goods/${cat}/${ginfo[0]}.png`
              }
              alt="큰 이미지"
            />
            {/* [작은 상품이미지]
            - 본 상품을 제외한 5개의 상품이 나열되고
            클릭시 본 화면에 상품을 변경해 준다!
            단, 같은 카테고리 상품 상위 5개임 
            -> 배열을 임의로 만들고 값도 임의로 넣고
            map을 사용하여 코드를 만들어보자!!!
            */}
            <div className="small">
              {Array(5)
                .fill("")
                .map((v, i) => {
                  return (
                    <a href="#" key={i}
                    onClick={
                      (e)=>{
                        // 기본이동막기
                        e.preventDefault();
                        // 선택 데이터 찾기
                        // -> cat항목값 + ginfo[0]항목
                        let res = dt.find(v=>{
                          if(
                            v.cat==cat&&
                            v.ginfo[0]=="m"+(i+1))
                            return true;
                        }); //// find /////
                        console.log(res);
                        // 상품상세모듈 전달 상태변수 변경
                        setGinfo(res.ginfo);
                      }
                    }>
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          `/images/goods/${cat}/m${i+1}.png`
                        }
                        alt="썸네일 이미지"
                      />
                    </a>
                  );
                })}
            </div>
          </section>
          <section className="gdesc scbar">
            <h1>HOME &gt; {cat.toUpperCase()}</h1>
            <div>
              <ol>
                <li>
                  <img
                    src={
                      process.env.PUBLIC_URL + "/images/dx_ico_new-28143800.gif"
                    }
                    alt="new버튼"
                  />
                </li>
                <li id="gtit">상품명: {ginfo[1]}</li>
                <li>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/images/icon_type02_social01.gif"
                    }
                    alt="페이스북"
                  />
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/images/icon_type02_social02.gif"
                    }
                    alt="트위터"
                  />
                  <img
                    src={process.env.PUBLIC_URL + "/images/icon_mail02.gif"}
                    alt="이메일"
                  />
                  <img
                    src={process.env.PUBLIC_URL + "/images/btn_source_copy.gif"}
                    alt="URL복사"
                  />
                </li>
                <li>
                  <span>판매가</span>
                  <span id="gprice">{addComma(ginfo[3])}원</span>
                </li>
                <li>
                  <span>적립금</span>
                  <span>
                    <img
                      src={process.env.PUBLIC_URL + "/images/icon_my_m02.gif"}
                      alt="적립금"
                    />
                    4,950(5%적립)
                  </span>
                </li>
                <li>
                  <span>무이자할부</span>
                  <span>
                    부분 무이자 할부 혜택
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/images/view_btn_nointerest_card.gif"
                      }
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
                      <img
                        src={process.env.PUBLIC_URL + "/images/cnt_up.png"}
                        alt="증가"
                      />
                      <img
                        src={process.env.PUBLIC_URL + "/images/cnt_down.png"}
                        alt="감소"
                      />
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

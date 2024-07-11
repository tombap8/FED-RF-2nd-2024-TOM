import React, { useContext, useEffect, useRef } from "react";
import { addComma } from "../../js/func/common_fn";

import $ from "jquery";
import { pCon } from "./pCon";

function ItemDetail({ tot, setTot, dt }) {
  // tot - 상품토탈정보
  // setTot - 상품토탈정보 업데이트함수
  // dt - 상품데이터

  // 상품정보 개별 셋업 ////
  // cat - 카테고리
  let cat = tot.cat;
  // ginfo - 상품정보
  let ginfo = tot.ginfo;
  // gIdx - 상품고유번호
  let gIdx = tot.idx;

  console.log(cat, ginfo, gIdx);

  // 전역 카트 사용여부값 업데이트 사용위해 전역 컨텍스트 사용
  const myCon = useContext(pCon);

  // 제이쿼리 이벤트함수에 전달할 ginfo값 참조변수
  const getGinfo = useRef(ginfo);
  // getGinfo참조변수는 새로들어온 ginfo전달값이 달라진 경우
  // 업데이트한다!
  if (getGinfo.current != ginfo) getGinfo.current = ginfo;

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

  // 화면랜더링구역 : 한번만 //////////
  useEffect(() => {
    // [ 수량증감 버튼클릭시 증감기능구현 ]

    // 1. 대상요소 ///////
    // (1) 숫자출력 input
    const sum = $("#sum");
    // (2) 수량증감 이미지버튼
    const numBtn = $(".chg_num img");
    // (3) 총합계 요소
    const total = $("#total");
    // console.log(sum,numBtn);

    // 2. 수량증감 이벤트함수 ///
    numBtn.on("click", (e) => {
      // (1) 이미지순번(구분하려고)
      let seq = $(e.currentTarget).index();
      console.log("버튼순번:", seq, e.target);
      // 0은 증가 / 1은 감소

      // (2) 기존 숫자값 읽기
      let num = Number(sum.val());
      console.log("현재숫자:", num);

      // (3) 증감반영하기(0은 false,1은 true 처리)
      sum.val(seq == 0 ? ++num : num == 1 ? 1 : --num);
      // seq가0이냐?그럼 증가:아니면 (num이 1이냐)
      // 그럼1 아니면 감소 -> num이 1이하면 안되니까!
      // 증감기호가 변수 앞에 있어야 먼저증감하고 할당함!
      console.log("ginfo 전달변수확인:", ginfo);
      console.log("getGinfo 참조변수확인:", getGinfo.current);
      // [ 문제!!! ginfo값으로 읽으면 최초에 셋팅된 값이
      // 그대로 유지된다! 왜? 본 함수는 최초한번만 셋팅되기때문! ]
      // [ 해결책 : 새로들어오는 ginfo값을 참조변수에 넣어서
      // 본 함수에서 그 값을 읽으면 된다! ]

      // (4) 총합계 반영하기
      // 원가격은 컴포넌트 전달변수 ginfo[3] -> 갱신안됨!
      // 원가격은 참조변수 getGinfo 사용 -> 매번 업데이트됨!
      total.text(addComma(getGinfo.current[3] * num) + "원");
    }); //////// click ////////

    // 참고) 제거용 -> numBtn.off("click");
  }, []); /// 현재컴포넌트 처음생성시 한번만 실행구역 ///

  // [ 화면랜더링구역 : 매번 ] ///
  useEffect(() => {
    // 매번 리랜더링 될때마다 수량초기화!
    $("#sum").val(1);
    // 총합계 초기화
    $("#total").text(addComma(ginfo[3]) + "원");
  }); ////////// useEffect //////

  // 코드리턴구역 /////////////
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
          // 창닫을때 초기화하기!  
          // 수량초기화!
          $("#sum").val(1);
          // 총합계 초기화
          $("#total").text(addComma(ginfo[3]) + "원");
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
                  // 한줄리스트와 같은번호면 6번오게함!
                  // 1~5까지니까!
                  let num = ginfo[0].substr(1) == i + 1 ? 6 : i + 1;
                  // 현재상품번호가 1~5중 같은게 있으면 6번
                  // substr(시작순번,개수)->개수없으면 순번부터 전부다가져옴
                  // console.log("검사번호:",ginfo[0].substr(1));
                  // console.log("변경번호:",num);

                  return (
                    <a
                      href="#"
                      key={i}
                      onClick={(e) => {
                        // 기본이동막기
                        e.preventDefault();
                        // 선택 데이터 찾기
                        // -> cat항목값 + ginfo[0]항목
                        let res = dt.find((v) => {
                          if (v.cat == cat && v.ginfo[0] == "m" + num)
                            return true;
                        }); //// find /////
                        console.log(res);
                        // 상품상세모듈 전달 상태변수 변경
                        // find에서 받은값은 객체값
                        // 상품토탈정보로 모든 객체값을 업데이트함
                        setTot(res);
                      }}
                    >
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          `/images/goods/${cat}/m${num}.png`
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
              <button
                className="btn"
                onClick={() => {
                  // [ 로컬스 카트 데이터 넣기 ]
                  // 1. 로컬스 없으면 만들어라!
                  if (!localStorage.getItem("cart-data")) {
                    localStorage.setItem("cart-data", "[]");
                  } //// if /////

                  // 2. 로컬스 읽어와서 파싱하기
                  let locals = localStorage.getItem("cart-data");
                  locals = JSON.parse(locals);

                  // 3. 기존 데이터 중 동일한 데이터 거르기
                  // 파싱된 로컬스 데이터 중 idx항목을 검사하여
                  // gIdx로 넣을 상품 idx와 같은 것이 있으면
                  // 메시지와 함께 리턴처리하여 입력을 막아준다!

                  // [ 방법1 ]
                  // 배열 중복검사시 사용하는 메서드: some()
                  // -> some()은 중복데이터 발생시 true리턴
                  // 시켜서 구분해준다!
                  // let retSts = locals.some(v=>{
                  //   if(v.idx==gIdx) return true;
                  // });

                  // [ 방법2 ]
                  // 배열.includes(비교값)
                  // 주의사항: 배열값이 단일값이어야 비교가된다!
                  // 예) let aa = [11,22,33]
                  // aa.includes(22) -> 있으면 결과 true!

                  // idx값만 모아서 다른 배열만들기
                  let newLocals = locals.map(v=>v.idx);
                  console.log("idx새배열:",newLocals);

                  // 인클루드 비교
                  let retSts = newLocals.includes(gIdx);

                  console.log("중복상태:",retSts);
                  if(retSts){
                    // 메시지 보이기
                    alert("이미 선택하신 상품입니다!");
                    // 함수 나가기
                    return;
                  } ///// if //////

                  // 4.로컬스에 객체 데이터 추가하기
                  locals.push({
                    idx: gIdx,
                    cat: cat,
                    ginfo: ginfo,
                    cnt: $("#sum").val()
                  });
                  /************************** 
                    [데이터 구조정의]
                    1. idx : 상품고유번호
                    2. cat : 카테고리
                    3. ginfo : 상품정보
                    4. cnt : 상품개수
                  **************************/

                  // 로컬스에 문자화하여 입력하기
                  localStorage.setItem(
                    "cart-data", JSON.stringify(locals));

                  // 로컬스 카트데이터 상태값 변경!
                  myCon.setLocalsCart(
                    localStorage.getItem("cart-data"));
                  // 카트리스트 생성 상태값 변경!
                  myCon.setCartSts(true);
                }}
              >
                SHOPPING CART
              </button>
              <button className="btn">WISH LIST</button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default ItemDetail;

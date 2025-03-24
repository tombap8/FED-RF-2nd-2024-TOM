// DC.com 검색 모듈 - Searching.jsx

import React, { useState } from "react";

// 모듈용 CSS 불러오기 ///
import "../../css/modules/searching.scss";

// 폰트어썸 불러오기 ////
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// 캐릭터 데이터 불러오기 : 캐릭터 리스트 데이터
import { catListData } from "../../js/data/swiper_cat";
import SearchingCat from "./SearchingCat";

function Searching({ kword }) {
  // kword - 전달받은 검색어

  console.log("kword:", kword);
  console.log("전체데이터:", catListData);

  // [ 후크 상태관리 변수 셋팅구역 ] ///////
  // [1] 검색어 상태관리변수 : 초기값 - 전달된 검색어
  const [kw, setKw] = useState(kword);
  // [2] 정렬기준 상태관리변수 : 초기값 - 오름차순(asc)
  const [sort, setSort] = useState("asc");
  // [3] 체크박스 체크여부 상태관리변수 : 배열묶음으로 설정!
  const [chk, setChk] = useState([true, true, true]);
  console.log("체크훜배열:", chk);

  // 검색어로 전체 데이터에서 캐릭터 이름항목으로
  // 배열 filter검색 후 결과를 캐릭터 리스트
  // 하위 컴포넌트로 보내준다!

  ///////////////////////////////////////////////////
  // [ ★★★ 원본데이터로 부터 필터링하기 ★★★ ] ////
  const selData = catListData.filter((v) => {
    // 검색어 소문자 변환
    let keyW = kw.toLowerCase();
    // -> ★★★ 검색어를 상태변수로 설정하여
    // 검색어 상태변수가 변경되면 리랜더링된다!

    // 이름 데이터 소문자 변환
    let cName = v.cname.toLowerCase();

    // 해당문자열이 이름데이터에 있으면 수집!
    if (
      // 첫번째 조건 : 검색어 글자존재 여부
      cName.indexOf(keyW) !== -1 &&
      // 두번째 조건 : alignment속성값이 "hero"/"comp"/"villain"
      ((chk[0] ? v.alignment === 'hero' : false) ||
        (chk[1] ? v.alignment === 'comp' : false) ||
        (chk[2] ? v.alignment === 'villain' : false))
        // 조건문 전체 : true && (true || false || false)
        // -> &&문은 모두 true 여야 true
        // -> ||문은 하나만 true여도 true
      
    ) return true;
  }); //// filter //////

  ///////////////////////////////////////////////////
  // [ ★★★ 필터링된 데이터 정렬 적용하기 ★★★ ] ////
  // -> 상태변수 sort를 기준으로 정렬변경적용!!! ///////
  // [1] 오름차순 : asc
  if (sort === "asc") {
    selData.sort((a, b) =>
      a.cname > b.cname ? 1 : a.cname < b.cname ? -1 : 0
    );
  } //// if ////
  // [2] 내림차순 : desc
  else if (sort === "desc") {
    selData.sort((a, b) =>
      a.cname > b.cname ? -1 : a.cname < b.cname ? 1 : 0
    );
  } //// else if ////

  console.log("결과:", selData);

  // 리턴 코드구역 ////////////////////
  return (
    <>
      {/* 전체 검색모듈 코드 */}
      <section className="schbx">
        {/* 1. 옵션선택박스 */}
        <div className="schopt">
          {/* 1-1.검색박스 */}
          <div className="searching">
            {/* 검색버튼 돋보기 아이콘 */}
            <FontAwesomeIcon
              icon={faSearch}
              className="schbtn"
              title="Open search"
            />
            {/* 입력창 */}
            <input
              id="schin"
              type="text"
              placeholder="Filter by Keyword"
              // 기본값으로 전달받은 검색어가 입력된다!
              defaultValue={kword}
              // ★★★ 엔터키를 눌렀을때 검색실행!
              // 검색어 상태변수만 업데이트하면 끝!
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  // 1. 검색어 상태변수값 변경하기
                  setKw(e.target.value);
                  // 2. 처음 검색시 정렬은 기본정렬 오름차순(asc)
                  setSort("asc");
                  // 3. 정렬 선택박스 기본값으로 변경하기
                  document.querySelector("#sel").value = "asc";
                } /// if ///
              }}
            />
          </div>
          {/* 1-2. 체크박스구역 */}
          <div className="chkbx">
            <ul>
              <li>
                {/* 타이틀 */}
                <h2>
                  ALIGNMENT
                  <span className="spbtn">＋</span>
                </h2>
                {/* 체크박스리스트 */}
                <ol>
                  <li>
                    Heroes
                    {/* 숨긴 체크박스 */}
                    <input
                      type="checkbox"
                      id="hero"
                      className="chkhdn"
                      // [ ★ 체크박스 체크속성값을 훜연결!!! ]
                      checked={chk[0]}
                      // [ ★ 체크변경시 change이벤트 발생!!! ]
                      onChange={(e) => {
                        // 체크박스의 checked속성은
                        // 체크시 true, 불체크시 false리턴함!
                        console.log(e.target.checked);
                        // 훜 변수값을 업데이트 해야 변경된다!
                        setChk([e.target.checked, chk[1], chk[2]]);
                        // 첫번째 체크박스 0번째만 반영한다!
                        // 나머지는 그대로 유지!
                      }}
                    />
                    {/* 디자인노출 라벨 */}
                    <label htmlFor="hero" className="chklb"></label>
                  </li>
                  <li>
                    It's Complicated
                    {/* 숨긴 체크박스 */}
                    <input
                      type="checkbox"
                      id="comp"
                      className="chkhdn"
                      // [ ★ 체크박스 체크속성값을 훜연결!!! ]
                      checked={chk[1]}
                      // [ ★ 체크변경시 change이벤트 발생!!! ]
                      onChange={(e) => {
                        // 체크박스의 checked속성은
                        // 체크시 true, 불체크시 false리턴함!
                        console.log(e.target.checked);
                        // 훜 변수값을 업데이트 해야 변경된다!
                        setChk([chk[0], e.target.checked, chk[2]]);
                        // 두번째 체크박스 1번째만 반영한다!
                        // 나머지는 그대로 유지!
                      }}
                    />
                    {/* 디자인노출 라벨 */}
                    <label htmlFor="comp" className="chklb"></label>
                  </li>
                  <li>
                    Villains
                    {/* 숨긴 체크박스 */}
                    <input
                      type="checkbox"
                      id="villain"
                      className="chkhdn"
                      // [ ★ 체크박스 체크속성값을 훜연결!!! ]
                      checked={chk[2]}
                      // [ ★ 체크변경시 change이벤트 발생!!! ]
                      onChange={(e) => {
                        // 체크박스의 checked속성은
                        // 체크시 true, 불체크시 false리턴함!
                        console.log(e.target.checked);
                        // 훜 변수값을 업데이트 해야 변경된다!
                        setChk([chk[0], chk[1], e.target.checked]);
                        // 세번째 체크박스 2번째만 반영한다!
                        // 나머지는 그대로 유지!
                      }}
                    />
                    {/* 디자인노출 라벨 */}
                    <label htmlFor="villain" className="chklb"></label>
                  </li>
                </ol>
              </li>
            </ul>
          </div>
        </div>
        {/* 2. 결과리스트박스 */}
        <div className="listbx">
          {/* 2-1. 결과 타이틀 */}
          <h2 className="restit">BROWSE CHARACTERS</h2>
          {/* 2-2. 정렬선택박스 */}
          <aside className="sortbx">
            <select
              name="sel"
              id="sel"
              className="sel"
              // [ 선택값 변경시 정렬 상태변수값 변경하기! ]
              onChange={(e) => {
                console.log("정렬기준값:", e.target.value);
                // 정렬 상태변수값 변경하기
                setSort(e.target.value);
              }}
            >
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </aside>
          {/* 2-3. 캐릭터 리스트 컴포넌트 : 
            데이터 상태변수 중 첫번째값만 보냄 */}
          <SearchingCat selData={selData} />
        </div>
      </section>
    </>
  );
}

export default Searching;

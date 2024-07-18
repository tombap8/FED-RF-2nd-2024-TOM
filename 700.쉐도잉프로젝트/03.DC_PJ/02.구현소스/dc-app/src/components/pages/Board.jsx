// 오피니언 페이지 컴포넌트 ///
import { Fragment, useContext, useEffect, useRef, useState } from "react";

// 사용자 기본정보 생성 함수
import { initData } from "../func/mem_fn";

// 로컬스토리지 게시판 기본데이터 제이슨 -> 로컬쓰로 대체!!!
// import baseData from "../data/board.json";
// 리액트 웹펙에서 제이슨은 이름을 지어서 불러오면된다!
// 제이슨 파일 처리는 다르므로 확장자는 반드시 씀!

// 제이쿼리
import $ from "jquery";

// 게시판용 CSS
import "../../css/board.scss";
import "../../css/board_file.scss";

// 로컬스토리지 확인 JS
import { initBoardData } from "../func/board_fn";
import { dCon } from "../modules/dCon";

export default function Board() {
  // 컨텍스트 사용하기
  const myCon = useContext(dCon);
  // 전역 로그인 상태 변수 확인(변수할당!)
  const sts = myCon.loginSts;
  // console.log("로그인상태:", sts);

  // 로컬스토리지 게시판 데이터 정보확인! //
  initBoardData();

  // 로컬스 데이터 변수할당하기!
  const baseData = JSON.parse(localStorage.getItem("board-data"));

  // 원본 데이터에 정렬 적용하기 : 내림차순
  baseData.sort((a, b) =>
    Number(a.idx) > Number(b.idx) ? -1 : Number(a.idx) < Number(b.idx) ? 1 : 0
  );

  // [ 상태관리 변수 ] ///
  // [1] 페이지 번호
  const [pageNum, setPageNum] = useState(1);
  // [2] 기능모드
  const [mode, setMode] = useState("L");
  // (1) 리스트 모드(L) : List Mode
  // (2) 글보기 모드(R) : Read Mode
  // (3) 글쓰기 모드(W) : Write Mode
  // (4) 수정 모드(M) : Modify Mode (삭제포함)

  // [ 참조변수 ] ///
  // [1] 전체 개수 - 매번 계산하지 않도록 참조변수로!
  const totalCount = useRef(baseData.length);
  // console.log("전체개수:", totalCount);
  // [2] 선택 데이터 저장
  const selRecord = useRef(null);
  // -> 특정리스트 글 제목 클릭시 데이터 저장함!

  // 페이지당 개수
  const unitSize = 8;

  /********************************************** 
        함수명: bindList
        기능 : 페이지별 리스트를 생성하여 바인딩함
  **********************************************/
  const bindList = () => {
    // console.log(baseData);

    // 1. 전체 원본데이터 선택
    let orgData = baseData;

    // 2. 정렬 적용하기 : 내림차순
    orgData.sort((a, b) =>
      Number(a.idx) > Number(b.idx) ? -1 : Number(a.idx) < Number(b.idx) ? 1 : 0
    );

    // 3. 일부 데이터만 선택
    // 예시로 0번부터 9번까지만 선택
    // 한페이지당 10개라면...
    // 페이지 번호와 연관시켜 본다!
    // 1,2,3,4,...

    // 시작번호 = (페이지번호-1)*단위수
    let sNum = (pageNum - 1) * unitSize;
    // 끝번호 = 페이지번호*단위수
    let eNum = pageNum * unitSize;
    // console.log("첫번호:", sNum, "/끝번호:", eNum);
    // 결과배열
    const selData = [];

    // for문으로 배열 만들기
    for (let i = sNum; i < eNum; i++) {
      // console.log(i);
      // 끝번호가 전체 개수보다 크면 나가라!
      if (i >= totalCount.current) break;
      // 대상배열값 추가
      selData.push(orgData[i]);
    } ///// for //////

    console.log("일부데이터:", selData);
console.log("여기:",selData.length);
if(selData.length == 0) setPageNum(pageNum-1);

    return selData.map((v, i) => (
      <tr key={i}>
        {/* 시작번호를 더하여 페이지별 순번을 변경 */}
        <td>{i + 1 + sNum}</td>
        <td>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              // 읽기모드로 변경!
              setMode("R");
              // 해당 데이터 저장하기
              selRecord.current = v;
            }}
          >
            {v.tit}
          </a>
        </td>
        <td>{v.unm}</td>
        <td>{v.date}</td>
        <td>{v.cnt}</td>
      </tr>
    ));
  }; /////////// bindList 함수 /////////////////

  /****************************************** 
    함수명 : pagingList
    기능 : 게시판 리스트의 페이징 기능 목록
  ******************************************/
  const pagingList = () => {
    // 전체 페이징 개수 : 전체레코드수 / 페이지당개수
    // 유의점: 나머지가 있는지 검사해서 있으면 +1

    // 1. 페이징 개수
    let pagingCount = Math.floor(totalCount.current / unitSize);

    // 나머지가 있으면 다음 페이지가 필요함!
    // 나머지가 0이 아니면 1더하기
    if (totalCount.current % unitSize > 0) {
      pagingCount++;
    }

    // console.log(
    //   "페이징개수:",
    //   pagingCount,
    //   "나머지개수:",
    //   totalCount.current % unitSize
    // );

    // 링크코드 만들기 ///
    const pgCode = [];

    // 1부터 페이지 끝번호까지 돌면서 코드만들기
    for (let i = 1; i <= pagingCount; i++) {
      pgCode.push(
        <Fragment key={i}>
          {
            // 페이징번호와 현재페이지번호 일치시 b요소
            i === pageNum ? (
              <b>{i}</b>
            ) : (
              // 불일치시에 모드 링크코드
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPageNum(i);
                }}
              >
                {i}
              </a>
            )
          }
          {/* 사이에 바넣기 */}
          {i !== pagingCount && " | "}
        </Fragment>
      );
    } ////// for /////

    // 코드리턴
    return pgCode;
  }; ////////// pagingList 함수 //////////////

  // 버튼 클릭시 변경함수 ////////
  const clickButton = (e) => {
    // 버튼글자 읽기
    let btnText = e.target.innerText;
    // console.log(btnText);
    // 버튼별 분기
    switch (btnText) {
      // 글쓰기 모드로 변경
      case "Write":
        setMode("W");
        break;
      // 리스트모드로 변경
      case "List":
        setMode("L");
        break;
      // 서브밋일 경우 함수호출!
      case "Submit":
        submitFn();
        break;
      // 수정일 경우 수정모드로 변경
      case "Modify":
        setMode("M");
        break;
      // 삭제일 경우 삭제함수 호출
      case "Delete":
        deleteFn();
        break;
    }
  }; ////////// clickButton //////////

  // 삭제 처리함수 //////////////
  const deleteFn = () => {
    // 삭제여부확인
    if (window.confirm("Are you sure you want to delete?")) {
      // 1. 해당항목 idx담기
      let currIdx = selRecord.current.idx;
      // 2. some()로 순회하여 해당항목 삭제하기
      // find()와 달리 some()은 결과값을 boolean값으로
      // 리턴하여 처리한다! 이것을 이용하여 코드처리해보자!
      baseData.some((v, i) => {
        if (v.idx == currIdx) {
          // 해당순번 배열값을 삭제하자!
          // 배열삭제는  splice(순번,1)
          baseData.splice(i, 1);

          // 리턴true할 경우 종료!
          return true;
        } ///// if ////
      }); ///// some ///////

      // 3. 로컬스에 업데이트하기 //////
      localStorage.setItem("board-data", JSON.stringify(baseData));

      // 4. 삭제후 리스트 리랜더링시 리스트 불일치로 인한
      // 에러를 방지하기 위하여 전체 개수를 바로 업데이트한다!
      totalCount.current = baseData.length;


      // 4. 리스트로 돌아가기 -> 리랜더링 /////
      // -> 모드변경! "L"
      setMode("L");
      // -> 삭제후 첫페이지로 이동!
      setPageNum(1);
    } ///////// if ///////////////
  }; //////// deleteFn ///////////////

  // 서브밋 처리함수 //////////////
  const submitFn = () => {
    // 제목입력항목
    let title = $(".subject").val().trim();
    // 내용입력항목
    let cont = $(".content").val().trim();
    // trim()으로 앞뒤공백 제거후 검사!

    // 1. 공통 유효성검사
    // 제목,내용 모두 비었으면 리턴!
    if (title == "" || cont == "") {
      alert("Insert title or content!");
      return; // 서브밋없이 함수나가기!
    } ////// if ////

    // 2. 글쓰기 서브밋 (mode=="W")
    if (mode == "W") {
      // 0.현재 로그인 사용자 정보 파싱하기
      let person = JSON.parse(sts);

      // 1. 오늘날짜 생성하기 /////
      let today = new Date();
      // yy-mm-dd 형식으로 구하기
      // 제이슨 날짜형식 : toJSON()
      // ISO 표준형식 : toISOString()
      // 시간까지 나오므로 앞에 10자리만 가져감!
      // 문자열.substr(0,10)

      // 2. 글번호 만들기 /////
      // 전체 데이터중 idx 만 모아서 배열만들기
      let arrIdx = baseData.map((v) => parseInt(v.idx));
      // console.log(arrIdx);
      // 최대값 찾기 : 스프레드 연산자로 배열값만 넣음!
      let maxNum = Math.max(...arrIdx);
      // console.log(maxNum);

      // 3. 입력 데이터 객체형식으로 구성하기 ////
      let data = {
        idx: maxNum + 1,
        tit: title,
        cont: cont,
        att: "",
        date: today.toJSON().substr(0, 10),
        uid: person.uid,
        unm: person.unm,
        cnt: "0",
      };
      // console.log("글쓰기 서브밋:",data);

      // 4. 로컬스에 입력하기 //////
      // (1) 로컬스 파싱
      let locals = localStorage.getItem("board-data");
      locals = JSON.parse(locals);
      // (2) 파싱배열에 push
      locals.push(data);
      // (3) 새배열을 문자화하여 로컬스에 넣기
      localStorage.setItem("board-data", JSON.stringify(locals));

      // 로컬스 확인!
      // console.log(localStorage.getItem("board-data"));

      // 4. 추가후 리스트 리랜더링시 리스트 불일치로 인한
      // 에러를 방지하기 위하여 전체 개수를 바로 업데이트한다!
      // 이때 실제로 업데이트된 locals 배열객체의 개수를 센다!
      totalCount.current = locals.length;

      // 5. 리스트로 돌아가기 -> 리랜더링 /////
      // -> 모드변경! "L"
      setMode("L");
      // -> 추가후 첫페이지로 이동!
      setPageNum(1);
    } /// if ///

    // 3. 수정모드 서브밋 (mode=="M")
    else if (mode == "M") {
      // 1. 오늘날짜 생성하기 /////
      // -> 수정시 수정날짜 항목을 새로 만들고 입력함!
      let today = new Date();
      // yy-mm-dd 형식으로 구하기
      // 제이슨 날짜형식 : toJSON()
      // ISO 표준형식 : toISOString()
      // 시간까지 나오므로 앞에 10자리만 가져감!
      // 문자열.substr(0,10)

      // 2. 현재 데이터 idx값
      let currIdx = selRecord.current.idx;

      // 3. 기존 데이터로 찾아서 변경하기
      // : 로컬스 데이터 -> baseData
      // find()는 특정항목을 찾아서 리턴하여 데이터를 가져
      // 오기도 하지만 업데이트 등 작업도 가능함!
      baseData.find((v) => {
        // console.log(v,selRecord);
        if (v.idx == currIdx) {
          // [ 업데이트 작업하기 ]
          // 기존항목변경 : tit, cont
          // 이미 선택된 selRecord 참조변수의 글번호인 idx로
          // 원본 데이터를 조회하여 기존 데이터를 업데이트함!

          // (1) 글제목 : tit
          v.tit = title;
          // (2) 글내용 : cont
          v.cont = cont;
          // 추가항목
          // (원래는 확정된 DB스키마에 따라 입력해야하지만
          // 우리가 사용하는 로컬스토리지의 확장성에 따라 필요한
          // 항목을 추가하여 넣는다!)
          // (3) 수정일 : mdate
          v.mdate = today.toJSON().substr(0, 10);

          // 해당항목을 만나면 끝남!
          return true;
        } /// if ///
      }); /////// find 메서드 /////////

      // 4. 로컬스에 업데이트하기 //////
      localStorage.setItem("board-data", JSON.stringify(baseData));

      // 로컬스 확인!
      // console.log(localStorage.getItem("board-data"));

      // 5. 리스트로 돌아가기 /////
      // -> 모드변경! "L"
      setMode("L");
    }
  }; ////////// submitFn //////////////


  //// 코드 리턴구역 //////////////
  return (
    <main className="cont">
      <h1 className="tit">OPINION</h1>
      {
        // 1. 리스트 모드일 경우 리스트 출력하기
        mode == "L" && <ListMode bindList={bindList} pagingList={pagingList} />
      }
      {
        // 2. 읽기 모드일 경우 상세보기 출력하기
        mode == "R" && 
        <ReadMode selRecord={selRecord} sts={sts} />
      }
      {
        // 3. 쓰기 모드일 경우 로그인 정보 보내기
        // sts값은 문자열이므로 파싱하여 객체로 보냄
        mode == "W" && <WriteMode sts={JSON.parse(sts)} />
      }
      {
        // 4. 수정 모드일 경우 상세보기 출력하기
        mode == "M" && <ModifyMode selRecord={selRecord} />
      }
      <br />
      {/* 모드별 버튼출력 박스 */}
      <table className="dtbl btngrp">
        <tbody>
          <tr>
            <td>
              {
                // 1. 글쓰기 버튼은 로그인상태이고 "L"이면출력
                mode == "L" && sts && (
                  <button onClick={clickButton}>Write</button>
                )
              }
              {
                // 2. 읽기상태 "R" 일 경우
                <>
                  {mode == "R" && <button onClick={clickButton}>List</button>}

                  {
                    // console.log("비교:",
                    // JSON.parse(sts).uid,
                    // "==?",
                    // selRecord.current.uid)
                  }

                  {
                    // 로그인한 상태이고 글쓴이와 일치할때
                    // 수정보드 이동버튼이 노출됨!
                    // 현재글은 selRecord 참조변수에 저장됨
                    // 글정보 항목중 uid 가 사용자 아이디임!
                    // 로그인 상태정보하위의 sts.uid와 비교함
                    mode == "R" &&
                      sts &&
                      JSON.parse(sts).uid == selRecord.current.uid && (
                        <button onClick={clickButton}>Modify</button>
                      )
                  }
                </>
              }
              {
                // 3. 쓰기상태 "W" 일 경우
                mode == "W" && (
                  <>
                    <button onClick={clickButton}>Submit</button>
                    <button onClick={clickButton}>List</button>
                  </>
                )
              }
              {
                // 4. 수정상태 "M" 일 경우
                mode == "M" && (
                  <>
                    <button onClick={clickButton}>Submit</button>
                    <button onClick={clickButton}>Delete</button>
                    <button onClick={clickButton}>List</button>
                  </>
                )
              }
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
} /////////// Board /////////////////////

/****************************************** 
        리스트 모드 서브 컴포넌트
******************************************/
const ListMode = ({ bindList, pagingList }) => {
  return (
    <>
      <div className="selbx">
        <select name="cta" id="cta" className="cta">
          <option value="tit">Title</option>
          <option value="cont">Contents</option>
          <option value="unm">Writer</option>
        </select>
        <select name="sel" id="sel" className="sel">
          <option value="0">Descending</option>
          <option value="1">Ascending</option>
        </select>
        <input id="stxt" type="text" maxLength="50" />
        <button className="sbtn">Search</button>
      </div>
      <table className="dtbl" id="board">
        <thead>
          <tr>
            <th>Number</th>
            <th>Title</th>
            <th>Writer</th>
            <th>Date</th>
            <th>Hits</th>
          </tr>
        </thead>
        <tbody>{bindList()}</tbody>
        <tfoot>
          <tr>
            <td colSpan="5" className="paging">
              {pagingList()}
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}; //////////// ListMode ///////////////////

/****************************************** 
        읽기 모드 서브 컴포넌트
******************************************/
const ReadMode = ({ selRecord, sts }) => {
  // selRecord - 현재글정보 / sts - 로그인 사용자정보
  // 읽기 모드가 호출되었다는 것은
  // 리스트의 제목이 클릭되었다는 것을 의미!
  // 따라서 현재 레코드 값도 저장되었다는 의미!
  // console.log("전달된 참조변수:", selRecord.current);
  // 전달된 데이터 객체를 변수에 할당
  const data = selRecord.current;

  // [ 조회수 증가하기 ]
  // 규칙1 : 자신의 글은 증가하지 않는다!
  // 규칙2 : 타인의 글은 증가한다!
  // 규칙3 : 로그인한 상태에서 한번만 증가한다!

  // ((조회된 글 저장방법))
  // -> 세션스토리지는 적합! 창을 닫으면 사라지니까!
  // -> 쿠키는 삭제방법이 즉각적이지 못하므로 제외!
  // -> 참조변수는 새로고침하면 초기화 되므로 제외!

  // 1.세션스 없으면 세션스 만들기
  if(!sessionStorage.getItem("bd-rec")){
    sessionStorage.setItem("bd-rec","[]");
  }
  // 2.세션스에 글번호 저장하기

  // (1) 세션스 파싱하여 변수할당
  let rec = JSON.parse(sessionStorage.getItem("bd-rec"));

  // (2) 기존 배열값에 현재글번호 존재여부검사하기
  // 결과가 true이면 조회수를 증가하지 않는다!
  let isRec = rec.includes(data.idx);
  console.log("이미있니?",isRec);

  // (3) 로그인한 사용자의 글이면 isRec값을 true처리
  // sts가 true이면 즉, 로그인한 사용자이면 처리
  if(sts){
    console.log(
      "선택글 아이디:",data.uid,
      "로그인사용자 아이디:",JSON.parse(sts).uid
    );
    // 글쓴이 아이디와 로그인사용자 아이디가 같은가?
    if(data.uid == JSON.parse(sts).uid){
      // 글번호저장과 조회수증가를 하지 않도록 isRec값을
      // true로 변경한다!
      isRec = true;
    } //// if ///

  } /// if ///

  // (4) 배열에 값 추가하기 : 기존값에 없으면 넣기!
  if(!isRec) rec.push(data.idx);

  // (5) 다시 세션스에 저장하기
  sessionStorage.setItem("bd-rec",JSON.stringify(rec));

  // 3. 글번호 증가하기
  // -> 게시판 원본 데이터에 조회수 업데이트하기  
  if(!isRec) {
    // (1) 게시판 로컬스 데이터 파싱
    let bdData = 
    JSON.parse(localStorage.getItem("board-data"));
    
    // (2) 게시판 해당데이터 cnt값 증가
    // 조건: isRec값이 false일때
    bdData.some(v=>{
      if(v.idx == data.idx){
        // 기존값에 1증가하여 넣기
        v.cnt = Number(v.cnt)+1;
        return true;
      } /// if ///
    }); /// some ////

    // (3) 다시 로컬스에 저장하기
    localStorage.setItem(
      "board-data",JSON.stringify(bdData));
  } /// if : (!isRec) ///


  /////// 코드리턴 구역 ///////////
  return (
    <>
      <table className="dtblview readone">
        <caption>OPINION : Read</caption>
        <tbody>
          <tr>
            <td>Name</td>
            <td>
              <input
                type="text"
                className="name"
                size="20"
                readOnly
                value={data.unm}
              />
            </td>
          </tr>
          <tr>
            <td>Title</td>
            <td>
              <input
                type="text"
                className="subject"
                size="60"
                readOnly
                value={data.tit}
              />
            </td>
          </tr>
          <tr>
            <td>Content</td>
            <td>
              <textarea
                className="content"
                cols="60"
                rows="10"
                readOnly
                value={data.cont}
              ></textarea>
            </td>
          </tr>
          <tr>
            <td>Attachment</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}; ///////////// ReadMode //////////////////

/****************************************** 
        쓰기 모드 서브 컴포넌트
******************************************/
const WriteMode = ({ sts }) => {
  // sts - 로그인 상태정보
  // 로그인한 사람만 글쓰기 가능!
  // console.log(sts);

  return (
    <>
      <table className="dtblview readone">
        <caption>OPINION : Write</caption>
        <tbody>
          <tr>
            <td>Name</td>
            <td>
              <input
                type="text"
                className="name"
                size="20"
                readOnly
                // 로그인한 사람이름
                value={sts.unm}
              />
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>
              <input
                type="text"
                className="email"
                size="40"
                readOnly
                // 로그인한 사람이메일
                value={sts.eml}
              />
            </td>
          </tr>
          <tr>
            <td>Title</td>
            <td>
              <input type="text" className="subject" size="60" />
            </td>
          </tr>
          <tr>
            <td>Content</td>
            <td>
              <textarea className="content" cols="60" rows="10"></textarea>
            </td>
          </tr>
          <tr>
            <td>Attachment</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}; ///////////// WriteMode //////////////////

/****************************************** 
        수정 모드 서브 컴포넌트
******************************************/
const ModifyMode = ({ selRecord }) => {
  // 읽기 모드가 호출되었다는 것은
  // 리스트의 제목이 클릭되었다는 것을 의미!
  // 따라서 현재 레코드 값도 저장되었다는 의미!
  // console.log("전달된 참조변수:", selRecord.current);
  // 전달된 데이터 객체를 변수에 할당
  const data = selRecord.current;

  return (
    <>
      <table className="dtblview readone">
        <caption>OPINION : Modify</caption>
        <tbody>
          <tr>
            <td>Name</td>
            <td>
              <input
                type="text"
                className="name"
                size="20"
                readOnly
                value={data.unm}
              />
            </td>
          </tr>
          <tr>
            <td>Title</td>
            <td>
              <input
                type="text"
                className="subject"
                size="60"
                defaultValue={data.tit}
              />
            </td>
          </tr>
          <tr>
            <td>Content</td>
            <td>
              <textarea
                className="content"
                cols="60"
                rows="10"
                defaultValue={data.cont}
              ></textarea>
            </td>
          </tr>
          <tr>
            <td>Attachment</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}; ///////////// ModifyMode //////////////////

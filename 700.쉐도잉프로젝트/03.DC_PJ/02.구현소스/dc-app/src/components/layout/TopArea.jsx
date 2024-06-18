// 상단영역 컴포넌트 ///

// GNB 데이터 불러오기
import { Link, useNavigate } from "react-router-dom";
import { menu } from "../data/gnb";

// 상단영역 CSS 불러오기
import "../../css/top_area.scss";
import Logo from "../modules/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// 제이쿼리
import $ from "jquery";

export default function TopArea() {
  // 이동함수 ////
  const goNav = useNavigate();
  // 사용시 goNav(라우터주소,{전달객체})
  // 전달객체 없으면 비워놓음!
  // 사용법: 반드시 useNavigate()메서드를 변수에 담아
  // 이동할 라우터 주소를 쓰면 이동한다
  // 예) goNav('/news') -> 뉴스페이지이동
  // 예) goNav('news') -> 뉴스페이지이동
  // 예) goNav('/') -> 첫페이지이동
  // 예) goNav('') -> 첫페이지이동
  // 이동주소는 대소문자 구분없음!
  // 슬래쉬 없이 써도 루트로 인식함
  // -> 빈값이면 루트로 이동함!

  // 검색 관련 함수들 ///////////
  // 1. 검색창 보이기함수
  const showSearch = (e)=>{
    // 기본기능막기
    e.preventDefault();
    // 1. 검색창 보이기
    $(".searchingGnb").show();
    // show() - display를 보이게함
    // 2. 입력창에 포커스 보내기
    $("#schinGnb").focus();
  }; ////// showSearch 함수 ///////

  // 2. 검색창에 엔터키 누르면 검색함수 호출
  const enterKey = e => {
    // e.keyCode는 숫자, e.key문자로 리턴함
    // console.log(e.key,e.keyCode);
    if(e.key == "Enter"){
      // 입력창의 입력값 읽어오기 : val()사용
      let txt = $(e.target).val().trim();
      console.log(txt);
      // 빈값이 아니면 검색함수 호출(검색어전달!)
      if(txt!=''){
        // 입력창 비우고 부모박스 닫기
        $(e.target).val("").parent().hide();
        // 검색 보내기
        goSearch(txt);

      } /// if ///
    } //// if ////

  }; ///////// enterKey //////////

  // 3. 검색페이지로 검색어와 함께 이동하기함수
  const goSearch = txt => {
    console.log("나는 검색하러 간다규~!!!");
    // 라우터 이동함수로 이동하기
    // 네비게이트메서드(라우터주소,{state:{보낼객체}})
    goNav("search",{state:{keyword:txt}});
  }; /////////// goSearch //////////////

  //// 코드 리턴구역 //////////////
  return (
    <>
      {/* 1.상단영역 */}
      <header className="top-area">
        {/* 로그인 환영메시지 박스 */}

        {/* 네비게이션 GNB파트 */}
        <nav className="gnb">
          <ul>
            {/* 1. 로고 컴포넌트 */}
            <li>
              <a
                href="#"
                onClick={(e) => {
                  // 기본이동막기
                  e.preventDefault();
                  // 라우터 이동 메서드호출
                  goNav("");
                }}
              >
                <Logo logoStyle="top" />
              </a>
              {/* <Link to="/">
                <Logo logoStyle="top" />
              </Link> */}
            </li>
            {/* 2. GNB메뉴 데이터 배열로 만들기 */}
            {menu.map((v, i) => (
              <li key={i}>
                {
                  // 하위 메뉴가 있으면 일반 a요소에 출력
                  // 없으면 Link 라우팅 출력
                  v.sub ? (
                    <a href="#">{v.txt}</a>
                  ) : (
                    <Link to={v.link}>{v.txt}</Link>
                  )
                }
                {
                  // 서브 메뉴 데이터가 있으면 하위그리기
                  v.sub && (
                    <div className="smenu">
                      <ol>
                        {v.sub.map((v, i) => (
                          <li key={i}>
                            <Link to={v.link}>{v.txt}</Link>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )
                }
              </li>
            ))}
            {/* 3. 검색, 회원가입, 로그인링크 */}
            <li
              style={{
                marginLeft: "auto",
                marginRight: "25px",
              }}
            >
              {/* 검색입력박스 */}
              <div className="searchingGnb">
                {/* 검색버튼 돋보기 아이콘 */}
                <FontAwesomeIcon
                  icon={faSearch}
                  className="schbtnGnb"
                  title="Open search"
                />
                {/* 입력창 */}
                <input
                  type="text"
                  name="schinGnb"
                  id="schinGnb"
                  placeholder="Filter by Keyword"
                  onKeyUp={enterKey}
                />
              </div>
              {/* 검색기능링크 - 클릭시 검색창보이기 */}
              <a href="#" onClick={showSearch}>
                <FontAwesomeIcon icon={faSearch} />
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
} /////////// TopArea /////////////////////

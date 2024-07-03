// 오피니언 페이지 컴포넌트 ///

// 사용자 기본정보 생성 함수
import { initData } from "../func/mem_fn";

// 로컬스토리지 게시판 기본데이터 제이슨
import baseData from "../data/board.json";
// 리액트 웹펙에서 제이슨은 이름을 지어서 불러오면된다!
// 제이슨 파일 처리는 다르므로 확장자는 반드시 씀!

// 제이쿼리
import $ from "jquery";

// 게시판용 CSS
import "../../css/board.scss";
import "../../css/board_file.scss";

export default function Board() {

    /********************************************** 
        함수명: bindList
        기능 : 페이지별 리스트를 생성하여 바인딩함
    **********************************************/
   const bindList = () => {
    // console.log(baseData);

    return baseData.map(v=>
        <tr>
            <td>{v.idx}</td>
            <td>
              <a href="#" data-idx="51">
                {v.cont}
              </a>
            </td>
            <td>{v.unm}</td>
            <td>{v.date}</td>
            <td>{v.cnt}</td>
          </tr>
        )
    

   }; /////////// bindList 함수 /////////////////


  //// 코드 리턴구역 //////////////
  return (
    <main className="cont">
      <h1 className="tit">OPINION</h1>
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
        <tbody>
            {bindList()}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="5" className="paging">
              <b>1</b> | <a href="#">2</a> | <a href="#">3</a> |{" "}
              <a href="#">4</a> | <a href="#">5</a> | <a href="#">6</a> |{" "}
              <a href="#">7</a> | <a href="#">8</a>
            </td>
          </tr>
        </tfoot>
      </table>
      <br />
      <table className="dtbl btngrp">
        <tbody>
          <tr>
            <td>
              <button>
                <a href="#">Write</a>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
} /////////// Board /////////////////////

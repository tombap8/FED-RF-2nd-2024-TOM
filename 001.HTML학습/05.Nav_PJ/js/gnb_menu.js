// GNB 데이터 불러오기
import mdata from "./mdata.js";
console.log(mdata);

export default function makeMenu(target){
    // target - 메뉴 구현 대상박스
    console.log("오마나~!!!",target);

    // 대상요소에 메뉴 태그 넣기
    target.innerHTML = `
    <ul>
    ${
        Object.keys(mdata).map(v=>`        
        <li>
            <a href="#">${v}</a>
            <div class="smenu">
            <aside class="smbx">
                <h2>
                <div class="stit">1차메뉴</div>
                <a href="#">전체보기</a>
                </h2>
                <div class="swrap">
                <!-- 2차메뉴 dl생성 -->
                <dl>
                    <dt>2차메뉴</dt>
                    <!-- 3차메뉴 dd생성 -->
                    <dd><a href="#">3차메뉴</a></dd>
                </dl>
                </div>
            </aside>
            </div>
        </li>
        `).join('')
    }
    </ul>
    `;


} /////////// makeMenu 함수 ////////////////
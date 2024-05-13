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
        // mdata는 객체이므로 객체키만 모아서 배열로 만들고
        // map() 메서드를 순회하여 코드를 반복 생성함!
        // Object.keys(객체).map().join("")
        // -> 오브젝트 키쓰 맵 쪼잉~!!!
        Object.keys(mdata).map(v=>`        
        <li>
            <a href="#">${v}</a>
            <div class="smenu">
                <aside class="smbx">
                    <h2>
                    <div class="stit">${v}</div>
                        <a href="#">전체보기</a>
                    </h2>
                    <div class="swrap">
                    <!-- 2차메뉴 dl생성 -->
                    ${
                        // mdata[키배열값] -> 키배열값은 v
                        // 그런데 이 데이터는 객체이므로
                        // map()을 쓰기위해 또 키배열로 뽑아낸다!
                        // v2키값은 2차메뉴임!
                        Object.keys(mdata[v])
                        .map(v2=>`
                            <dl>
                                <dt>${v2}</dt>
                                <!-- 3차메뉴 dd생성 -->
                                ${
                                    // mdata[v][v2] -> 3차메뉴배열
                                    mdata[v][v2]
                                    .map(v3=>`                                    
                                        <dd>
                                            <a href="#">${v3}</a>
                                        </dd>
                                    `).join('')
                                }
                            </dl>                        
                        `).join('')
                    }
                    </div>
                </aside>
            </div>
        </li>
        `).join('')
    }
    </ul>
    `;


} /////////// makeMenu 함수 ////////////////
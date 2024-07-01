// 공통요소 데이터 객체 - common_data.js

const comData = {
    // 1. 상단영역 코드
    topArea:`    
    <header class="top-area inbox">
        <!-- 1-1.로고/GNB파트 -->
        <div class="cont-box">
        <!-- 1-1-1.로고 -->
        <div class="col-2">
            <h1 class="mlogo">
            <img src="./images/tvnlogo2.png" alt="메인tvN로고" />
            </h1>
        </div>
        <!-- 1-1-2.GNB -->
        <div class="col-10">
            <!-- Top메뉴 -->
            <nav class="top-menu">
            <ul>
                <li>
                <a href="#">로그인</a>
                </li>
                <li>
                <a href="#">회원가입</a>
                </li>
                <li>
                <a href="#">검색</a>
                </li>
            </ul>
            </nav>
            
        </div>
        </div>
        <!-- 모바일 햄버거 버튼 -->
        <button class="ham"></button>
    </header>
    `,
    // 전체메뉴코드
    navArea : `
      <nav class="gnb"></nav>
    `,
    // 2. 하단영역 코드
    footerArea:`    
    <footer class="footer-area inbox">
        <div class="cont-box">
        <!-- 하단링크박스 영역 -->
        <div class="col-8">
            <aside class="info-link">
            <ul>
                <li>
                <a href="#">회사소개</a>
                </li>
                <li>
                <a href="#">광고/제휴문의</a>
                </li>
                <li>
                <a href="#">이용약관</a>
                </li>
                <li>
                <a href="#">개인정보 처리방침</a>
                </li>
                <li>
                <a href="#">청소년보호정책</a>
                </li>
                <li>
                <a href="#">법적고지</a>
                </li>
                <li>
                <a href="#">이메일무단수집거부</a>
                </li>
                <li>
                <a href="#">큐톤표</a>
                </li>
                <li>
                <a href="#">고객센터</a>
                </li>
                <li>
                <a href="#">공지사항</a>
                </li>
            </ul>
            </aside>
        </div>
        <!-- 바로가기 콤보박스 영역 -->
        <div class="combo-area col-4">
            <select name="brand" id="brand">
            <option value="어쩌구">저쩌구</option>
            <option value="어쩌구">저쩌구</option>
            <option value="어쩌구">저쩌구</option>
            </select>
            <select name="corp" id="corp">
            <option value="어쩌구">저쩌구</option>
            </select>
        </div>
        <!-- 하단로고박스 영역 -->
        <div class="col-12">
            <!-- 하단로고 -->
            <h1 class="footer__logo">
            <img src="./images/tvnlogo2.png" alt="" />
            </h1>
        </div>
        <!-- 회사주소박스 영역 -->
        <div class="col-9">
            <address class="corp-info">
            시청자 상담실 (편성 문의 및 시청자 의견) : 080-080-0780 <br />
            (주)씨제이이엔엠?대표이사 : 구창근, 윤상현 사업자정보확인 <br />
            본점 : (06761) 서울시 서초구 과천대로 870-13 사업장 : (03926)
            서울시 마포구 상암산로 66 사업자 등록번호 : 106-81-51510 개인정보
            보호책임자 : 강봉관
            </address>
        </div>
        <!-- SNS박스 영역 -->
        <div class="col-3">
            <aside class="sns-box">
            <ul>
                <li>
                <a href="#" class="fa-brands fa-instagram">
                    <span class="ir"> 인스타그램 </span>
                </a>
                </li>
                <li>
                <a href="#" class="fa-brands fa-facebook">
                    <span class="ir"> 페이스북 </span>
                </a>
                </li>
                <li>
                <a href="#" class="fa-brands fa-twitter">
                    <span class="ir"> 트위터 </span>
                </a>
                </li>
                <li>
                <a href="#" class="fa-brands fa-youtube">
                    <span class="ir"> 유튜브 </span>
                </a>
                </li>
                <li>
                <a href="#" class="fa-solid fa-play">
                    <span class="ir"> 네이버 TV </span>
                </a>
                </li>
            </ul>
            </aside>
        </div>
        </div>
    </footer>

    `,
    // 3. 드라마 파트메뉴 코드
    spartMenu:`        
      <nav class="spart-menu inbox">
        <ul>
            <li class="on">
            <a href="#">메인</a>
            </li>
            <li class="be-sub">
            <a href="#intro-part">프로그램 소개</a>
            <!-- 서브메뉴 -->
            <div class="spart-sub-menu">
                <ol>
                <li>
                    <a href="#intro-part">프로그램 소개</a>
                </li>
                <li>
                    <a href="#">인물 소개</a>
                </li>
                <li>
                    <a href="#">인물 관계도</a>
                </li>
                </ol>
            </div>
            </li>
            <li>
            <a href="#preview-part">미리보기</a>
            </li>
            <li>
            <a href="#clip-area">동영상</a>
            </li>
            <li class="be-sub">
            <a href="#live-photo-area">사진첩</a>
            <!-- 서브메뉴 -->
            <div class="spart-sub-menu">
                <ol>
                <li>
                    <a href="#live-photo-area">현장 포토</a>
                </li>
                <li>
                    <a href="#poster-area">대표 포스터</a>
                </li>
                </ol>
            </div>
            </li>
            <li>
            <a href="#clip-area">OST</a>
            </li>
        </ul>
        </nav>    
    `,
    // 4. 배너영역 코드
    banArea:`    
    <!-- 배너는 중앙속박스 적용안함! -->
    <section class="ban-area">
      <h2 class="temp-tit">2. 배너영역</h2>

      <!-- 이동버튼 -->
      <div class="btn-box">
        <a href="#" class="abtn ab1">이전</a>
        <a href="#" class="abtn ab2">다음</a>
      </div>

      <!-- 블릿박스 -->
      <div class="indic-box">
        <ol class="indic"></ol>
      </div>

      <div class="cont-box">
        <div class="col-12">
          <!-- 슬라이드 박스 -->
          <div class="slide-box">
            <ul class="slider"></ul>
            <!-- 이벤트 커버박스
            이것이 이동버튼 기능역할도 함! -->
            <div class="evt-cover">
              <aside class="ab1"></aside>
              <aside class="ab2"></aside>
            </div>
          </div>
          <!-- 캐릭터 박스 -->
          <div class="cat-box">
            <div class="cat-inbox">
              <!-- 개별캐릭터박스 -->
              <article>
                <!-- 이미지박스 -->
                <div class="imbx">
                  <img src="./images/dc1.png" alt="공유" />
                  <!-- 이름이미지박스 -->
                  <span class="iname">
                    <img src="./images/d011.png" alt="흐린이름" />
                    <img src="./images/d01.png" alt="진한이름" />
                  </span>
                </div>
                <!-- 설명박스 -->
                <div class="descbx scbar">
                  <!-- 타이틀 -->
                  <h3>도깨비(김신), 939세</h3>
                  <!-- 설명글 -->
                  <p>
                    백성들은 그를 신(神)이라고 불렀다. 시뻘건 피를 뒤집어쓴 채
                    푸르게 안광을 빛내며 적들을 베는 그는 문자 그대로의
                    무신(武神)이었으나, 자신이 지키던 주군의 칼날에 죽었다.
                    영웅으로 살다 역적으로 죽어가던 김신에게 천상의 존재는
                    상인지 벌인지 모를 늙지도 죽지도 않는 생을 주었고,
                    그로부터 935년 동안 도깨비로 살았다. 심장에 검을 꽂은
                    채로.
                    <br />
                    “오직 도깨비 신부만이 그 검을 뽑을 것이다.” 지독히
                    낭만적인 저주였다. 그래서 쉬울 줄 알았지만 그가 만난 어떤
                    여자도 검을 발견하지 못한 채 불멸을 살던 어느 날. 자신을
                    도깨비 신부라고 소개하는 열아홉 살 소녀 은탁과 맞닥뜨린다.
                    그에게 도깨비 신부는 고통에서 벗어나 소멸할 수 있는
                    도구였다. 달리 말하면 은탁은 자신을 죽일 수 있는
                    유일무이한 무기였다.
                    <br />
                    죽고 싶게 괴로운 날은 은탁의 환심을 샀다가 아직 죽긴 일러
                    싶은 날은 멀리 했다가 하루에도 열 두 번씩 마음이 오락가락
                    했다. 은탁의 웃음에 그는 몇 번이나 어딘가를 돌아보고 싶은
                    마음에 사로잡혔다. 돌아서 한 번 더 보려는 것이 불멸의
                    삶인가, 너의 얼굴인가. 아, 너의 얼굴인 것 같다
                  </p>
                </div>
              </article>
              <!-- 개별캐릭터박스 -->
              <article>
                <!-- 이미지박스 -->
                <div class="imbx">
                  <img src="./images/dc2.png" alt="김고은" />
                  <!-- 이름이미지박스 -->
                  <span class="iname">
                    <img src="./images/d022.png" alt="흐린이름" />
                    <img src="./images/d02.png" alt="진한이름" />
                  </span>
                </div>
                <!-- 설명박스 -->
                <div class="descbx scbar">
                  <!-- 타이틀 -->
                  <h3>지은탁, 19세</h3>
                  <!-- 설명글 -->
                  <p>
                    대한민국의 평범한 고3 수험생, 이고 싶지만 그녀의 인생은
                    태어날 때부터 평범하지 않았다. 어려서부터 다른 사람들 눈엔
                    보이지 않는 죽은 혼들이 보였고, 때문에 친구들 사이에선 늘
                    외톨이였다. 엄마 없는 하늘 아래 못된 이모와 이모를 꼭 닮은
                    이모 자식들의 모진 구박을 견디며 지낸 지 꼬박 십년. 온갖
                    불행 소스를 다 때려 넣은 잡탕 같은 이 인생이 어이가 없는
                    와중에, 도깨비를 만났다. 그리고 은탁은 도깨비 신부가 될
                    운명이란다.
                    <br />
                    미스터리 호러 가난물이었던 인생에 갑자기 판타지라는 이상한
                    장르가 끼었다. 촛불을 끄면 항상 도깨비가 나타났다.
                    호기심에 불러냈던 게 습관이 되고, 안 보면 보고 싶고,
                    도깨비를 기다리는 일은 아직 오지 않은 좋은 미래를 기다리는
                    것처럼 설렜다. 감정 기복이 심해서 성가실 때도 있지만,
                    가슴에 검이 꽂힌 채로 살면 그렇게 되겠거니 싶어 봐주기로
                    한다. 근데 그 검을 나보고 뽑아달란다. 그 말이 꼭 끝내자는
                    말처럼 아프다.
                  </p>
                </div>
              </article>
              <!-- 개별캐릭터박스 -->
              <article>
                <!-- 이미지박스 -->
                <div class="imbx">
                  <img src="./images/dc3.png" alt="이동욱" />
                  <!-- 이름이미지박스 -->
                  <span class="iname">
                    <img src="./images/d033.png" alt="흐린이름" />
                    <img src="./images/d03.png" alt="진한이름" />
                  </span>
                </div>
                <!-- 설명박스 -->
                <div class="descbx scbar">
                  <!-- 타이틀 -->
                  <h3>저승사자, 30대 후반 추정</h3>
                  <!-- 설명글 -->
                  <p>
                    죽는다는 건, 그와 선약이 생기는 거다. 누구나 그를 보면
                    놀란다. 처음엔 잘생겨서, 그 다음엔 내가 죽었구나 싶어서.
                    생의 마지막 순간에 마중 나오면서까지 저렇게 섹시할 필요가
                    있을까 싶다. 도깨비인 김신과 함께 살면서 하루에 열두 번씩
                    바뀌는 신의 변덕에 인내심이 한계를 느낄 때마다, 전생에 뭔
                    큰 죄를 짓긴 지었구나 싶지만 전생에 무엇이었는지, 인간이긴
                    했는지, 어떻게 저승사자가 됐는지 전혀 모른다.
                    <br />
                    죽음에서 눈을 떠보니 이미 저승사자였다. 저승사자가 되고
                    나선 날을 세는 것을 잊어버렸다. 그가 세어나가는 것은
                    무수한 망자들의 혼뿐.
                    <br />
                    그러던 어느 날, 우연히 마주친 한 여자, 써니에 현기증을
                    느꼈다. 처음 보는 게 분명한데 오래 그리워한 기분이었다.
                    써니의 예측 불가한 행동들은 상상력을 발휘해야 했고, 그의
                    서툰 행동들은 하나같이 오답이었다. 이게 다 연애를
                    드라마로만 배운 탓이다. 그는 헷갈렸다. 이것은 신의
                    계획일까, 실수일까.
                  </p>
                </div>
              </article>
              <!-- 개별캐릭터박스 -->
              <article>
                <!-- 이미지박스 -->
                <div class="imbx">
                  <img src="./images/dc4.png" alt="유인나" />
                  <!-- 이름이미지박스 -->
                  <span class="iname">
                    <img src="./images/d044.png" alt="흐린이름" />
                    <img src="./images/d04.png" alt="진한이름" />
                  </span>
                </div>
                <!-- 설명박스 -->
                <div class="descbx scbar">
                  <!-- 타이틀 -->
                  <h3>써니, 20대 중후반</h3>
                  <!-- 설명글 -->
                  <p>
                    혈혈단신 천애고아. 철없이 사는 여자가 세상 살기 가장
                    편하다는 걸 일찍부터 깨달았다. 남자의 외모는 내면으로
                    들어가는 창이고, 김중배의 다이아몬드는 잡는 게 당연한
                    거고, 진정한 사랑은 통장 잔고에서 느껴진다. 누군가의
                    첫사랑이 되는 게 세상에서 제일 쉬웠던 써니의 나이 곧
                    서른이었다.
                    <br />
                    그 남자, 저승사자를 처음 만난 건 갖고 싶은 반지를 발견했을
                    때였다. 그는 그녀에게 양보하지 않은 최초의 남자였다.
                    첫눈에 반했다고 넘겨짚기엔 너무, 슬픈 눈이었다. 시계며
                    차림새만 대충 훑어도 연봉 1억에 딱 봐도 연애 못해본
                    모태솔로인 줄만 알았는데, 만날수록 이상한 남자다.
                    두문불출하기 일쑤고 직업, 나이, 과거사 그 무엇도 알려주지
                    않는다. 처음엔 그저 잘생긴 호구로 생각했는데, 그 슬펐던
                    눈이 자꾸 눈에 밟힌다. 동정은 특기가 아닌데도.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  
    `,

}; /////////// comData 객체 ////////////////

export default comData;
// 공통요소 데이터 객체 - common_data.js

const comData = {
  // 1. 상단영역 코드
  headerArea: `    
  <header class="header-area inbox">
  <!-- 로고 -->
  <h1 class="logo">
    <a href="#" alt="신한 화구 로고">
      <img src="./img/logo_b.png" alt="로고이미지" />
    </a>
  </h1>

  <!-- 메뉴 -->
  <nav id="gnb"></nav>

  <!-- 기타 -->
  <div class="etc">
    <!-- 검색버튼 -->
    <div class="search">
      <input type="text" id="input-box" class="input-box" />
      <label for="input-box" class="fa-solid fa-magnifying-glass icon"></label>
    </div>

    <!-- 모바일 햄버거 버튼 -->
    <div class="mobile-btn">
      <span class="ir">모바일버튼</span>
      <i class="fa-solid fa-bars icon2"> <span class="ir">햄버거 아이콘</span></i>
      <i class="fa-solid fa-xmark icon3"> <span class="ir">닫기 아이콘</span></i>
    </div>

    <!-- 모바일 사이트맵 -->
    <div class="m-sitemap">
		<ul>
			<li><a href="#">Oil Colors</a></li>
			<li><a href="#">Korean Colors</a></li>
		</ul>
	  </div>
  </div>

  </div>
</header>
  `,
  // 2. 하단영역 코드
  footerArea: `    
  <footer class="footer-area">
  <!-- 하단 1줄 -->
      <div class="bottom1 foot">
        최신 정보 받기
      </div>
      <!-- 하단 2줄 -->
      <div class="bottom2 foot">
        <!-- sns -->
        <div class="sns-area">
          <div class="txt">
            신한화구의 소셜미디어 플랫폼을 팔로우 하세요. 제품, 브랜드, 컬러에 대한 최신 정보를
            <br/>
            공유하고 있으며 DM을 통해 여러분의 문의사항을 신속하게 답변드리고 있습니다.
          </div>
          <div class="sns-icon">
            <i class="fa-brands fa-square-facebook"></i>
            <i class="fa-brands fa-youtube"></i>
            <i class="fa-brands fa-instagram"></i>
            <i class="fa-brands fa-square-twitter"></i>
            <i class="fa-brands fa-product-hunt"></i>
          </div>
        </div>
        <!-- 정보 -->
        <div class="info-area">
          <table>
            <tr>
              <td>About Us</td>
              <td>Import Brands</td>
              <td><span>Contact</span></td>
            </tr>
            <tr>
              <td>Product</td>
              <td>Inspiration</td>
              <td><span>Tel</span> 02-357-2651</td>
            </tr>
            <tr>
              <td>Brand</td>
              <td>Discover</td>
              <td><span>Mail</span> ShinHan@shinhannart.com</td>
            </tr>
          </table>
        </div>
      </div>
      <!-- 하단 4줄 -->
      <div class="bottom4 foot">
        <img src="./img/logo_w.png" alt="하단 로고">
        <span>ⓒ Copyright 2024 ShinHan Art Materials Inc. All Rights Reserved.</span>
        <span>
          <ul>
            <li>이용약관</li>
            &nbsp;|&nbsp; 
            <li>개인정보 처리방침</li>
            &nbsp;|&nbsp; 
            <li>저작권 안내</li>
          </ul>
        </span>
      </div>
  </footer>
  `,
}; /////////// comData 객체 ////////////////

// 내보내기
export default comData;

// 캐릭터모듈 스와이퍼 플러그인 컴포넌트

import React, { useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// 제이쿼리 불러오기
import $ from "jquery";

// Import Swiper styles : 모듈용 기본 CSS파일 로딩!
import "swiper/css";
import "swiper/css/navigation";

// 스와이퍼 비디오 모듈 CSS : 내가 작성한 CSS
import "./css/swiper_cat.scss";

// 데이터 불러오기
import { catListData } from "../data/swiper_cat";

// import required modules
// 사용할 스와이퍼 모듈을 불러온다
// (여기서는 네비게이션 - 양쪽이동버튼)
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

export function SwiperCat() {
  // 선택데이터 변수할당
  const selData = catListData;

  // 코드 리턴구역 /////////////
  return (
    <>
      <Swiper
        // slidesPerView={4}
        spaceBetween={20}
        navigation={true}
        /* 사용할 모듈을 여기에 적용시킨다 */
        modules={[Navigation]}
        // 스와이퍼 사이즈별 슬라이드수 변경!
        breakpoints={{
          200: {
            slidesPerView: 3,
          },
          700: {
            slidesPerView: 4,
          },
          1000: {
            slidesPerView: 5,
          },
          1200: {
            slidesPerView: 7,
          },
        }}
        className="mySwiper2"
      >
        {selData.map(
          (v, i) =>
            /* idx 고유번호가 7번이하만 출력
          idx가 문자형숫자 이므로 비교를 위해
          숫자형변환해줌! Number(변수) */
            Number(v.idx) <= 7 && (
              <SwiperSlide key={i}>
                <Link 
                to="/detail"
                /* state로 3가지 값을 넘겨준다! */
                state={{
                  cname: v.cname, // 캐릭터이름
                  cdesc: v.cdesc, // 캐릭터설명
                  facts: v.facts // 캐릭터상세
                }}
                >
                  <section className="sw-inbox2">
                    {/* 캐릭터이미지영역 */}
                    <div className="cat-img2">
                      <img 
                      src={process.env.PUBLIC_URL+v.tmsrc} 
                      alt={v.cname} />
                    </div>
                    {/* 캐릭터타이틀영역 */}
                    <div className="cat-tit2">
                      <h3>{v.cname}</h3>
                    </div>
                  </section>
                </Link>
              </SwiperSlide>
            )
        )}
      </Swiper>
    </>
  );
} /////////// SwiperCat 컴포넌트 ///////////

// 스와이퍼 플러그인 컴포넌트

import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles : 모듈용 기본 CSS파일 로딩!
import "swiper/css";
import "swiper/css/navigation";

// 스와이퍼 비디오 모듈 CSS : 내가 작성한 CSS
import "./css/swiper_vid.scss";

// 데이터 불러오기
import { swVidData } from "../data/swiper_vid";

// import required modules
// 사용할 스와이퍼 모듈을 불러온다
// (여기서는 네비게이션 - 양쪽이동버튼)
import { Navigation } from "swiper/modules";

export function SwiperVid({ catName }) {
  // catName - 카테고리명

  // 선택데이터 변수할당
  const selData = swVidData[catName];

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        navigation={true}
        /* 사용할 모듈을 여기에 적용시킨다 */
        modules={[Navigation]}
        className="mySwiper"
      >
        {selData.map((v, i) => (
          <SwiperSlide key={i}>
            <section className="sw-inbox">
              {/* 동영상이미지박스 */}
              <div className="vid-img">
                <img src={v.isrc} alt={v.tit} />
                {/* 폰트어썸 아이콘 */}
              </div>
              {/* 동영상 타이틀 박스 */}
              <div className="vid-tit">
                <h4>{v.cat}</h4>
                <h3>{v.tit}</h3>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
} /////////// SwiperVid 컴포넌트 ///////////

// 스와이퍼 플러그인 컴포넌트

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./css/swiper_ban.scss";

// import required modules
// 사용할 스와이퍼 모듈을 불러온다
// (여기서는 페이지네이션,네비게이션,자동넘김)
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export function SwiperBan({ cat }) {
  // cat - 카테고리명
  console.log("배너카테고리명:", cat);
  const swp = useRef(null);

  useLayoutEffect(() => {
    if (swp.current) {
      swp.current.slideTo(0, 0);
    }

    console.log(swp.current);
  });

  // 리스트만들기 함수 ////
  const makeList = (num) => {
    // num
    let temp = [];
    for (let x = 0; x < num; x++) {
      temp[x] = (
        <SwiperSlide key={x}>
          {(cat == "men" || cat == "women") && x == 0 ? (
            <video
              src={process.env.PUBLIC_URL+"/images/sub/" + cat + "/banner/mv.mp4"}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              muted
              // loop
              className={cat + "-vid"}
              //   autoPlay
            />
          ) : (
            <img
              src={process.env.PUBLIC_URL+"/images/sub/" + cat + "/banner/ban" + (x + 1) + ".png"}
            />
          )}
        </SwiperSlide>
      );
    } /////////// for /////////////

    // 배열을 리턴
    return temp;
  }; ///////////// makeList 함수 //////////

  // 리턴코드 ///////////////////
  return (
    <>
      <Swiper
        /* ref 속성에 useRef 할당변수를 넣어서 외부에 연결함 */
        onInit={(s) => {
          swp.current = s;
        }}
        onActiveIndexChange={() => {
          console.log("ㅋㅋ~!");
        }}
        slidesPerView={1}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        // }}
        loop={true}
        navigation={true}
        /* 사용할 모듈을 여기에 적용시킨다 */
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
        // 슬라이드 이동후 실행코드구역
        onSlideChange={(swp) => {
          // swp는 내부로 전달되는 스와이퍼 자신객체
          // activeIndex는 loop시 오류있음
          // realIndex는 loop에도 잘 나옴!

          // style에는 없으므로 여기서 리턴
          if (cat == "style") return;

          // 현재 진짜순번
          let idx = swp.realIndex;
          console.log("슬라이드순번:", idx);

          let vidObj = document.querySelector(`.${cat}-vid`);

          if (idx == 0) {
            vidObj.play();
            swp.autoplay.stop();
            swp.autoplay.running = false;


            vidObj.addEventListener("timeupdate", (e) => {
              console.log(e.target.paused);

              if (e.target.paused) {
                swp.slideNext();
                swp.autoplay.start();
                swp.autoplay.running = true;
              }
            });
          } else {            
            let playPromise = vidObj.play();
            if(playPromise !== undefined) playPromise.then(()=>vidObj.pause());
          }
        }}
      >
        {makeList(cat == "style" ? 5 : 3)}
      </Swiper>
    </>
  );
} /////////// SwiperBan 컴포넌트 ///////////

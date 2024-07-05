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
import { useEffect, useRef, useState } from "react";

export function SwiperBan({ cat }) {
  // cat - 카테고리명
  // console.log("배너카테고리명:", cat);

  // 스와이퍼 객체를 담기위한 참조변수
  const swpObj = useRef(null);

  // 스와이퍼 슬라이드의 동영상변수
  let mvEle;

  // 화면 랜더링구역 ///////////
  useEffect(() => {
    // 스와이퍼 배너 첫페이지로 이동하기
    // 스와이퍼 객체
    let objSwp = swpObj.current.swiper;
    // 스와이퍼 페이지이동 메서드: slideTo(순번,시간)
    objSwp.slideTo(0, 0);
    // 첫번째 슬라이드는 0번, 애니시간은 0으로 안보이게

    // 스와이퍼객체는 어디있지?
    // console.log("랜더링:", swpObj);
    // console.log("Swiper:", swpObj.current.swiper);
    // 플러그인 스와이퍼 컴포넌트 객체 생성시
    // ref속성에 useRef변수를 넣으면 거기에
    // 스와이퍼 객체가 담겨진다! -> 외부에서 사용가능!!!
    // 사용법:
    // (1) 요소로 사용할때 : 참조변수.current
    // (2) 객체로 사용할때 : 참조변수.current.swiper

    // 참고) ref속성에 useRef변수를 사용한 객체사용법은
    // 다른 컴포넌트에서도 사용할 수 있는 방법이다!!!
  }); ////// useEffect //////////////

  // 리스트만들기 함수 ////
  const makeList = (num) => {
    // num
    let temp = [];
    for (let x = 0; x < num; x++) {
      temp[x] = (
        <SwiperSlide key={x}>
          {(cat == "men" || cat == "women") && x == 0 ? (
            <video
              src={
                process.env.PUBLIC_URL + "/images/sub/" + cat + "/banner/mv.mp4"
              }
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              muted
              // loop ->루프는 동영상멈춤이벤트체크시 주석
              className={cat + "-vid"}
              //   autoPlay
            />
          ) : (
            <img
              src={
                process.env.PUBLIC_URL +
                "/images/sub/" +
                cat +
                "/banner/ban" +
                (x + 1) +
                ".png"
              }
            />
          )}
        </SwiperSlide>
      );
    } /////////// for /////////////

    // 배열을 리턴
    return temp;
  }; ///////////// makeList 함수 //////////

  // 화면랜더링 구역 : 한번만 /////////////
  useEffect(()=>{

    // 스와이퍼 객체 : ref로 외부에 노출한 스와이퍼객체
    let objSwp = swpObj.current.swiper;

    // 화면절반크기 기준값
    const winCta = window.innerHeight / 2;
    // 스크롤시 호출함수
    const scrollFn = () => {
        if (window.scrollY > winCta) {
            // 영상플레이시 자동넘김 끄기
            objSwp.autoplay.stop();
            objSwp.autoplay.running = false;
            // 영상멈추기
            mvEle.pause();
        } else {
            // 자동넘김 시작
            objSwp.autoplay.start();
            // 자동넘김 속성 true전환!
            objSwp.autoplay.running = true;
            // 영상재생
            mvEle.play();
        }
    }; ////////////// scrollFn ////////////

    // 스크롤 이동시 기준값에 따라 동영상 재생/멈춤
    // 단, 동영상객체가 있을때만 걸어준다!
    if(mvEle)
    window.addEventListener("scroll", scrollFn);


    // [ 소멸자 만들기 ] ////////////
    return(()=>{
      // 동영상변수가 null이 아닐때만 이벤트삭제
      if(mvEle){
        // 동영상 시간업데이트 이벤트 설정제거
        mvEle.removeEventListener("timeupdate", actionVideo); 
        // 스크롤 이벤트 설정제거
        window.removeEventListener("scroll", scrollFn);
      } /// if /////

      console.log("난 스와이퍼 소멸자!!!");
    });
  },[]); /////// useEffect //////////

  // 동영상 재생시 작동 함수 ////////
  const actionVideo = (e) => {
    // 스와이퍼 객체
    let swp = swpObj.current.swiper;
    // 비디오가 멈추면 멈춤속성값이 true임
    // 멈춤속성 -> paused
    // console.log("비디오재생중~!!!", e.target.paused);
    // 비디오가 멈추면 슬라이드 이동
    if (e.target.paused) {
      // 슬라이드 이동
      swp.slideNext();
      // 자동넘김 시작
      swp.autoplay.start();
      // 자동넘김 속성 true전환!
      swp.autoplay.running = true;
    } ///// if ////////
  }; ///////// actionVideo //////////



  // 리턴코드 ///////////////////
  return (
    <>
      <Swiper
        ref={swpObj}
        /* ref 속성에 useRef 할당변수를 넣어서 
        외부에 연결함 */
        onInit={(swp) => {
          console.log("스와이퍼 처음셋팅!", swp);
        }}
        slidesPerView={1}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        // -> 자동플레이는 코딩으로 대체!
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
          if (cat == "style") {
            // 자동넘김 시작
            swp.autoplay.start();
            // 자동넘김 속성 true전환!
            swp.autoplay.running = true;
            // 여기서 리턴
            return;
          } ///// if ////

          // 선택 동영상 : 상단 전역변수로 선언 //
          mvEle = document.querySelector(`.${cat}-vid`);

          // 현재 진짜순번
          let idx = swp.realIndex;
          // console.log("슬라이드순번:", idx);

          // men / women 일때 첫페이지 영상플레이
          if (idx == 0) {
            // 영상플레이시 자동넘김 끄기
            swp.autoplay.stop();
            swp.autoplay.running = false;

            // 영상플레이작동
            mvEle.play();

            // 비디오가 재생시 발생이벤트 체크
            // timeupdate : 비디오재생 이벤트
            mvEle.addEventListener("timeupdate", actionVideo); 
            ///////// timeupdate /////////
          } /// if ///
          // 기타 페이지는 영상멈춤
          else {
            // mvEle.pause(); // -> 에러남
            let playPromise = mvEle.play();
            if (playPromise !== undefined)
              playPromise.then(() => mvEle.pause());
            // 원래 then() 메서드는 Promise객체를 만들고 쓰는것!
            // 플레이 메서드가 기본적으로 프라미스를 구성하고 있음!
            // 그래서 then()메서드 사용가능!
          } /// else ///
        }}
      >
        {makeList(cat == "style" ? 5 : 3)}
      </Swiper>
    </>
  );
} /////////// SwiperBan 컴포넌트 ///////////

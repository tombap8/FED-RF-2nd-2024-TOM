import React, { useCallback, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { branchData } from "../../js/data/branch";

// 모듈 CSS 불러오기 /////
import "../../css/pages/branch.scss";
import SwiperApp from "../plugin/SwiperApp";
import LocalMap from "../modules/LocalMap";

/* API 키값 AIzaSyCTZWygfYuMNSJHOB-p16G3P8OxI3SRUcU */
/* 부산 35.16011, 129.1699 */
/* 제주 33.49061, 126.4864 */

// 마커 아이콘 설정 (기본 아이콘이 제대로 표시되지 않는 문제 해결)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function Branch(props) {
  const { state } = useLocation();
  const { local } = state;

  const selData = branchData[local];
  console.log(local, selData);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  // 네비게이트 이동함수 생성하기
  const goPage = useNavigate();
  // -> goPage(라우터주소,전달객체)
  // -> 예) goPage('/branch',{state:{local:'seoul'}})

  // 지역별 위도경도값
  const latLng = useRef({
    seoul: [37.51283, 127.1026],
    busan: [35.16011, 129.1699],
    jeju: [33.49061, 126.4864],
  });

  const EnableScrollZoomOnCtrl = () => {
    const map = useMap();
  
    const handleKeyDown = (e) => {
      if (e.key === "Control") {
        map.scrollWheelZoom.enable();
      }
    };
  
    const handleKeyUp = (e) => {
      if (e.key === "Control") {
        map.scrollWheelZoom.disable();
      }
    };
  
    useEffect(() => {
      map.scrollWheelZoom.disable(); // 기본적으로 scrollWheelZoom 비활성화
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
  
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    }, [map]);
  
    return null;
  };
    

    const markerRef = useRef(null);

  // 컴포넌트를 통해 줌 레벨 설정
  const SetViewOnChange = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
  };

  const OpenPopupOnLoad = ({ markerRef }) => {
    useEffect(() => {
      if (markerRef.current) {
        markerRef.current.openPopup();
      }
    }, [markerRef]);
    return null;
  };

  // console.log(local,'지역 위도:',latLng.current[local].lat);
  // console.log(local,'지역 경도:',latLng.current[local].lng);

  // 지도를 리턴하는 함수 ////////////
  const makeMap = (local, title, zoom) => {
    return (
      <MapContainer
        key={local} // key 속성 추가
        center={latLng.current[local]}
        zoom={zoom}
        style={{ height: "400px", width: "100%" }}
        scrollWheelZoom={false} // 기본적으로 scrollWheelZoom 비활성화
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={latLng.current[local]}>
          {/* <Popup>
            <div style={{ width: "200px" }}>
              <b>{title} 지점</b>
              <br />
              시그니엘 호텔
            </div>
          </Popup> */}
          <OpenPopupOnLoad markerRef={markerRef} />
        </Marker>

        <SetViewOnChange center={latLng.current[local]} zoom={zoom} />
        <EnableScrollZoomOnCtrl />
      </MapContainer>
    );
  }; ////////// makeMap 함수 /////////////

  // 리턴 코드구역 ///////////////
  return (
    <>
      <div className="branch-container">
        <div className="branch-cont">
          <SwiperApp local={local} />
          {/* max-width 적용 */}
          <div className="branch-wrap">
            {/* 1 */}
            <div className="con-wrap">
              <div className="img-box">
                <img
                  // src={"../../../images/branch/" + local + "/main_01.png"}
                  src={
                    process.env.PUBLIC_URL +
                    "/images/branch/" +
                    local +
                    "/main_01.png"
                  }
                  alt="메인01"
                  title="메인01"
                />
              </div>
              <div className="text-box">
                <div>
                  <h2>
                    {selData.tit.split("^")[0]}
                    {selData.tit.split("^")[1]}
                  </h2>
                  <span className="contents-title">
                    <p>{selData.cont.split("^")[0]}</p>
                    <p>{selData.cont.split("^")[1]}</p>
                    <p>{selData.cont.split("^")[2]}</p>
                  </span>
                </div>
              </div>
            </div>
            {/* 2 */}
            <div className="con-wrap">
              <div className="img-box">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/images/branch/" +
                    local +
                    "/main_02.png"
                  }
                  alt="메인02"
                  title="메인02"
                />
              </div>
              <div className="text-box">
                <div>
                  <h2>
                    {selData.tit02.split("^")[0]}
                    <br />
                    {selData.tit02.split("^")[1]}
                  </h2>
                  <span className="contents-title">
                    <p>{selData.cont02.split("^")[0]}</p>
                    <p>{selData.cont02.split("^")[1]}</p>
                    <p>{selData.cont02.split("^")[2]}</p>
                  </span>
                </div>
              </div>
            </div>
            {/* 3 */}
            <div className="con-wrap reverse">
              <div className="img-box">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/images/branch/" +
                    local +
                    "/main_03.png"
                  }
                  alt="메인03"
                  title="메인03"
                />
              </div>
              <div className="text-box">
                <div>
                  <h2>
                    {selData.tit03.split("^")[0]}
                    <br />
                    {selData.tit03.split("^")[1]}
                  </h2>
                  <span className="contents-title">
                    <p>{selData.cont03.split("^")[0]}</p>
                    <p>{selData.cont03.split("^")[1]}</p>
                    <p>{selData.cont03.split("^")[2]}</p>
                  </span>
                </div>
              </div>
            </div>
            {/* 4 */}
            <div className="con-wrap">
              <h2>Room Packages & Offers</h2>

              <div className="slide-box">
                {/* 1 */}
                <div>
                  <div className="slide-img">
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/images/branch/" +
                        local +
                        "/main_05_01.png"
                      }
                      alt=""
                    />
                  </div>
                  <h2>{selData.tit04}</h2>
                  <span className="contents-title">
                    <p>{selData.cont04.split("^")[0]}</p>
                    <p>{selData.cont04.split("^")[1]}</p>
                  </span>
                </div>
                {/* 2 */}
                <div>
                  <div className="slide-img">
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/images/branch/" +
                        local +
                        "/main_05_02.png"
                      }
                      alt=""
                    />
                  </div>
                  <h2>{selData.tit05}</h2>
                  <span className="contents-title">
                    <p>{selData.cont05.split("^")[0]}</p>
                    <p>{selData.cont05.split("^")[1]}</p>
                  </span>
                </div>
                {/* 3 */}
                <div>
                  <div className="slide-img">
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/images/branch/" +
                        local +
                        "/main_05_03.png"
                      }
                      alt=""
                    />
                  </div>
                  <h2>{selData.tit06}</h2>
                  <span className="contents-title">
                    <p>{selData.cont06.split("^")[0]}</p>
                    <p>{selData.cont06.split("^")[1]}</p>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="con-wrap info">
            {
              // 지도리턴함수를 호출함!
              makeMap(
                local, // 지역코드
                local === "seoul"
                  ? "서울"
                  : local === "busan"
                  ? "부산"
                  : local === "jeju"
                  ? "제주"
                  : "", // 지역 타이틀명
                17 // 확대비율
              )
            }
            <ul>
              {local !== "seoul" && (
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      // 기본이동막기
                      e.preventDefault();
                      goPage("/branch", { state: { local: "seoul" } });
                    }}
                  >
                    <img
                      src={
                        process.env.PUBLIC_URL + "/images/branch/seoul/main.jpg"
                      }
                      alt="호텔서울"
                      title="호텔서울"
                    />
                    <p>호텔서울</p>
                    <p>
                      명동, 을지로, 청계천 등 서울의 중심 관광지들로의 접근성이
                      뛰어나 서울 관광을 위한 최적의 위치를 자랑합니다.
                    </p>
                  </a>

                  {/* 구글맵 넣기 */}
                  {/* <LocalMap center={latLng.current.seoul} /> */}
                </li>
              )}
              {local !== "busan" && (
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      // 기본이동막기
                      e.preventDefault();
                      goPage("/branch", { state: { local: "busan" } });
                    }}
                  >
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/images/branch/busan/hotel_busan.jpg"
                      }
                      alt="호텔부산"
                      title="호텔부산"
                    />
                    <p>호텔부산</p>
                    <p>
                      시그니엘 부산은 해운대의 랜드마크 '엘시티(LCT)'타워에
                      위치한 260실 규모의 럭셔리 호텔입니다.
                    </p>
                  </a>
                  {/* 구글맵 넣기 */}
                  {/* <LocalMap center={latLng.current.busan} /> */}
                </li>
              )}
              {local !== "jeju" && (
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      // 기본이동막기
                      e.preventDefault();
                      goPage("/branch", { state: { local: "jeju" } });
                    }}
                  >
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/images/branch/jeju/hotel_jeju.jpg"
                      }
                      alt="호텔제주"
                      title="호텔제주"
                    />
                    <p>호텔제주</p>
                    <p>
                      환상의 섬 제주도 중문관광단지에 위치한 롯데호텔 제주는
                      500개의 객실을 갖춘 한국 최고의 리조트 호텔입니다.
                    </p>
                  </a>
                  {/* 구글맵 넣기 */}
                  {/* <LocalMap center={latLng.current.jeju} /> */}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Branch;

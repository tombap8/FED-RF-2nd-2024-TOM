import React, { useRef, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

function App() {
  // 마커용 참조변수 ////
  const markerRef = useRef(null);
  
  // 지도 변경용 상태변수 ////
  const [local, setLocal] = useState("seoul");


  // 마커 아이콘 설정 
  // (기본 아이콘이 제대로 표시되지 않는 문제 해결)
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });

  // 지역별 위도경도값
  const latLng = useRef({
    seoul: [37.51283, 127.1026],
    busan: [35.16011, 129.1699],
    jeju: [33.49061, 126.4864],
  });

  // 스크롤 줌 컨트롤 처리 함수 ///////
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

  // 컴포넌트를 통해 줌 레벨 설정
  const SetViewOnChange = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
  };

  // 팝업로딩 관련 함수 ////////
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
          <Popup>
            <div style={{ width: "200px" }}>
              <b>{title} 지점</b>
              <br />
              시그니엘 호텔
            </div>
          </Popup>
          <OpenPopupOnLoad markerRef={markerRef} />
        </Marker>

        <SetViewOnChange center={latLng.current[local]} zoom={zoom} />
        {/* 바로스크롤로 확대적용막기 호출 */}
        <EnableScrollZoomOnCtrl />
      </MapContainer>
    );
  }; ////////// makeMap 함수 /////////////

  return (
    <div className="App">
      <h1>맵지도바꾸기</h1>
      {makeMap(
        local,
        local === "seoul"
          ? "서울"
          : local === "busan"
          ? "부산"
          : local === "jeju"
          ? "제주"
          : ""
      )}
      <button onClick={() => setLocal("seoul")}>서울</button>
      <button onClick={() => setLocal("busan")}>부산</button>
      <button onClick={() => setLocal("jeju")}>제주</button>
    </div>
  );
}

export default App;

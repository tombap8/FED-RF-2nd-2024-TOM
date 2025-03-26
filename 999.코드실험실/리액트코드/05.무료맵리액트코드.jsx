import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// 마커 아이콘 설정 (기본 아이콘이 제대로 표시되지 않는 문제 해결)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function App() {
  // 지역별 위도경도값
  const latLng = useRef({
    seoul: [37.51283, 127.1026],
    busan: [35.16011, 129.1699],
    jeju: [33.49061, 126.4864],
  });

  
  // 컴포넌트를 통해 줌 레벨 설정
  const SetViewOnChange = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
  };


  // 지도를 리턴하는 함수 ////////////
  const makeMap = (local, title, zoom) => {
    return (
      <MapContainer
        key={local} // key 속성 추가
        center={latLng.current[local]}
        zoom={zoom}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={latLng.current[local]}>
          <Popup>
            <b>{title}지점</b>
            <br />
            시그니엘 호텔
          </Popup>
        </Marker>

        <SetViewOnChange center={latLng.current[local]} zoom={zoom} />
      </MapContainer>
    );
  }; ////////// makeMap 함수 /////////////

  return (
    <div className="App">
      <h1>서울시 강남구 CGV 위치</h1>
      {
              // 지도리턴함수를 호출함!
              makeMap(
                local,// 지역코드
                local === "seoul"
                  ? "서울"
                  : local === "busan"
                  ? "부산"
                  : local === "jeju"
                  ? "제주"
                  : "",// 지역 타이틀명
                  17 // 확대비율
              )
            }
    </div>
  );
}

export default App;

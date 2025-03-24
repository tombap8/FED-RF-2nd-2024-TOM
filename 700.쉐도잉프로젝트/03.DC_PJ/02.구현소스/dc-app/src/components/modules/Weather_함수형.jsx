import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../../css/weather.scss";

// Weather 함수형 컴포넌트
const Weather = () => {
  // 상태 변수를 정의함
  const [weatherData, setWeatherData] = useState({
    temp: "", // 기온
    desc: "", // 설명
    icon: "", // 날씨 아이콘
    loading: true, // 정보 로딩 여부
    city: "", // 도시명
  });

  // 컴포넌트가 마운트 되었을 때 실행되는 useEffect 훅
  useEffect(() => {
    const cityName = "Seoul"; // 도시명
    const apiKey = "7fdf8fb74f3e2ed02bfb7e298a32df49"; // API 키
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`; // 날씨 정보 조회 URL

    // Axios를 이용한 데이터 조회
    axios
      .get(url) // 파일 로딩
      .then((res) => {
        const wdata = res.data; // 응답 데이터
        // 상태 변수에 데이터 설정
        setWeatherData({
          temp: wdata.main.temp, // 기온
          desc: wdata.weather[0].description, // 설명
          icon: wdata.weather[0].icon, // 아이콘
          loading: false, // 로딩 완료
          city: cityName, // 도시명
        });
      })
      .catch((err) => console.log(err)); // 에러 처리
  }, []); // 빈 배열을 두 번째 인수로 전달하여 컴포넌트 마운트 시 한 번만 실행

  // 아이콘 경로
  const isrc = `https://openweathermap.com/img/w/${weatherData.icon}.png`;

  // 로딩 중일 때
  if (weatherData.loading) {
    return <h4>Loading...</h4>;
  } else {
    // 절대 온도를 섭씨 온도로 변환
    let ctemp = (parseInt(weatherData.temp) - 273.15).toFixed(1);

    // 날씨 정보를 렌더링
    return (
      <div className="weather-bx">
        <h4>Now Weather</h4>
        <h5>{weatherData.city}</h5>
        <img src={isrc} alt="weather icon" />
        <p>{ctemp}℃</p>
        <p>{weatherData.desc}</p>
      </div>
    );
  }
};

export default Weather;
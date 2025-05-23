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

  useEffect(() => {
    // 사용자 위치 정보를 가져오는 함수
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getCityName, showError);
      } else {
        console.log("Geolocation is not supported by this browser.");
      } // 위치 정보 지원 여부 확인
    }; // getLocation 함수

    // 위치 정보를 이용해 도시명을 가져오는 함수
    const getCityName = (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&accept-language=en`;

      axios.get(url).then((response) => {
        const cityName = response.data.address.city || response.data.address.town || response.data.address.village;
        getWeatherData(cityName);
      }).catch((error) => {
        console.log(error);
      }); // 도시명을 가져와서 상태 업데이트
    }; // getCityName 함수

    // 오류 처리 함수
    const showError = (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          console.log("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          console.log("An unknown error occurred.");
          break;
        default:
          console.log("An unknown error occurred.");
          break;
      } // 오류 코드에 따른 메시지 출력
    }; // showError 함수

    // 날씨 정보를 가져오는 함수
    const getWeatherData = (cityName) => {
      const apiKey = "7fdf8fb74f3e2ed02bfb7e298a32df49"; // 날씨 정보 조회 API 키
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

      axios.get(url).then((res) => {
        const wdata = res.data;
        setWeatherData({
          temp: wdata.main.temp, // 기온
          desc: wdata.weather[0].description, // 설명
          icon: wdata.weather[0].icon, // 아이콘
          loading: false, // 로딩 완료
          city: cityName, // 도시명
        }); // 상태 업데이트
      }).catch((err) => {
        console.log(err);
      }); // 날씨 정보를 가져와서 상태 업데이트
    }; // getWeatherData 함수

    // 초기 위치 정보를 가져옴
    getLocation();
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
    ); // 날씨 정보를 렌더링
  } // 로딩 여부에 따른 조건부 렌더링
};

export default Weather;
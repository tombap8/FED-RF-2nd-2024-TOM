import { useState, useEffect } from "react";
import "../../css/modules/weather.scss";
import axios from "axios";

const Weather = () => {
  // 상태 변수 정의
  const [weatherData, setWeatherData] = useState({
    temp: "",
    desc: "",
    icon: "",
    loading: true,
    city: "",
  });

  // 컴포넌트가 마운트 되었을 때 실행되는 useEffect
  useEffect(() => {
    const cityName = "Seoul"; // 도시명 설정
    const apiKey = "7fdf8fb74f3e2ed02bfb7e298a32df49"; // API 키
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`; // 날씨 정보 조회 URL

    // axios를 이용한 데이터 조회
    axios
      .get(url)
      .then((result) => {
        const wdata = result.data; // 데이터 파싱
        // 상태 변수 업데이트
        setWeatherData({
          temp: wdata.main.temp,
          desc: wdata.weather[0].description,
          icon: wdata.weather[0].icon,
          loading: false,
          city: cityName,
        });
      })
      .catch((err) => console.log(err)); // 에러 처리
  }, []); // 빈 배열을 두어 컴포넌트가 처음 렌더링될 때만 실행

  const isrc = `https://openweathermap.com/img/w/${weatherData.icon}.png`; // 날씨 아이콘 URL

  // 로딩 상태에 따른 조건부 렌더링
  if (weatherData.loading) {
    return <h4>Loading...</h4>;
  } else {
    // 절대온도를 섭씨온도로 변환
    let ctemp = (parseInt(weatherData.temp) - 273.15).toFixed(1);
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

export default Weather; // Weather 컴포넌트 내보내기
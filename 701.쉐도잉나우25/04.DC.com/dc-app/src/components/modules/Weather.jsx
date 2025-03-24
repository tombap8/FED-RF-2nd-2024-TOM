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

  // [사용자의 현재 위치를 가져오는 함수]
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resolve, reject);
    });
  };

  // `navigator.geolocation`은 웹 브라우저에서 사용자의 위치
  //  정보를 가져오기 위해 사용되는 객체입니다. 이를 사용하여
  //  사용자에게 위치 정보를 요청하고, 사용자가 이를 허용하면
  //  위치 정보를 얻을 수 있습니다. `navigator.geolocation`
  //  객체는 다음과 같은 주요 메서드를 제공합니다:

  // 1. `getCurrentPosition()`
  // 2. `watchPosition()`
  // 3. `clearWatch()`

  // ### 1. `getCurrentPosition()`
  // `getCurrentPosition` 메서드는
  // 사용자의 현재 위치를 한 번 요청합니다.

  // [도시명을 가져오는 함수]
  const getCityName = async (latitude, longitude) => {
    const apiKey = "7fdf8fb74f3e2ed02bfb7e298a32df49";
    const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    const response = await axios.get(url);
    return response.data[0].name;
  };

  // [컴포넌트가 마운트 되었을 때 실행되는 useEffect]
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // 1. 현재 위치 가져오기
        const position = await getCurrentLocation();
        const { latitude, longitude } = position.coords;

        // 2. 도시명 가져오기
        const cityName = await getCityName(latitude, longitude);

        console.log('구해온 현재도시명:',cityName);

        // 3. 날씨 정보 조회 URL
        const apiKey = "7fdf8fb74f3e2ed02bfb7e298a32df49";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

        // 4. axios를 이용한 데이터 조회
        const result = await axios.get(url);
        const wdata = result.data;

        // 5. 상태 변수 업데이트
        setWeatherData({
          temp: wdata.main.temp,
          desc: wdata.weather[0].description,
          icon: wdata.weather[0].icon,
          loading: false,
          city: cityName,
        });
      } catch (err) {
        console.log(err);
      }
    }; // fetchWeatherData /////

    fetchWeatherData();
  }, []); //// useEffect ///////

  const isrc = `https://openweathermap.com/img/w/${weatherData.icon}.png`; // 날씨 아이콘 URL

  // [로딩 상태에 따른 조건부 렌더링]
  if (weatherData.loading) {
    return <h4>Loading...</h4>;
  } /// if /// 
  else {
    // [절대온도를 섭씨온도로 변환]
    let ctemp = (parseInt(weatherData.temp) - 273.15).toFixed(1);
    return (
      <div className="weather-bx">
        <h4>Now Weather</h4>
        <h5>{weatherData.city}</h5>
        <img src={isrc} alt="weather icon" />
        <p>{ctemp}℃</p>
        <p>{weatherData.desc}</p>
      </div>
    ); // return ///
  } // else ///
}; /////////// Weather 컴포넌트 ///////////

export default Weather; // Weather 컴포넌트 내보내기

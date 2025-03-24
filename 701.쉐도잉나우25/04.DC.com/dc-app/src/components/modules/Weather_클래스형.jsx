// DC.com 날씨위젯 컴포넌트 - Weather.jsx
// -> 클래스형 컴포넌트로 구현!!!

// 날씨 컴포넌트 SCSS
import { Component } from "react";
import "../../css/modules/weather.scss";

// 엑시오스 불러오기
import axios from "axios";

// 클래스형 컴포넌트는 기본적으로 Component 를
// 상속받아 구현한다!!!
// extents 부모클래스명
class Weather extends Component {
  //  생성자 메서드는 호출하지 않아도 자동생성됨!
  // -> constructor(){}
  // 이것이 클래스의 인스턴스를 생성해준다!
  constructor(props) {
    // 부모 Component 에게 전달변수를 전달한다!
    // 부모 클래스는 super 키워드로 호출!
    super(props);
    // 생성자함수 구역에 맴버변수 즉, 클래스 속성을
    // 만들면 이것이 상태변수가 된다!
    // 클래스 내부 속성은 this 키위드를 사용함!
    // 받아온 날씨정보를 셋업할 객체임!
    // state 이름의 상태변수에 setState()로 셋팅함
    this.state = {
      // 1. 기온
      temp: "",
      // 2. 설명
      desc: "",
      // 3. 날씨 아이콘
      icon: "",
      // 4. 정보로딩여부
      loading: true,
      // 5. 도시명
      city: "",
    }; // state 객체 셋팅 ////
  } //////// constructor ////

  // 컴포넌트 생성후 날씨정보 조회하여 화면에 보이기
  // 함수형 컴포넌트에서는 랜더링후는 useEffect()이지만
  // 클래스형은 componentDidMount() 메서드 사용함!

  // 참고) 함수형 컴포넌트의 후크인 useEffect()는
  // 클래스형 컴포넌트의 아래 3가지가 통합된 것이다!
  // (1) componentDidMount : 컴포넌트 생성후
  // 후크비교 -> useEffect(()=>{},[]) : 처음 한번만 실행
  // (2) componentDidUpdate : 컴포넌트 업데이트후
  // 후크비교 -> useEffect(()=>{}) : 매번 리랜더링 후 실행
  // (3) componentWillUnmount : 컴포넌트 소멸후
  // 후크비교 -> useEffect(()=>{return(()=>{})},[]) :
  // 소멸자로 소멸후 실행

  // 컴포넌트가 마운트 되었을때 실행하는 메서드는?
  // -> componentDidMount(){}
  componentDidMount() {
    // [ 날씨조회 정보 사이트 ]
    // https://openweathermap.org/

    // 1. 지정도시명
    const cityName = "Seoul";
    // 2. 날씨정보조회 키코드(로그인 사용자 키복사)
    const apiKey = "7fdf8fb74f3e2ed02bfb7e298a32df49";
    // 3. 날씨정보 조회 url : 날씨정보 제이슨이 날아온다!
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    // 브라우저에 검증
    // https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=7fdf8fb74f3e2ed02bfb7e298a32df49

    // 소스샘플
    // https://openweathermap.org/api/one-call-3

    ////////////////////////////////////////////////
    // axios 라이브러리를 이용한 데이터 조회하기! /////
    // 먼저설치: npm i axios
    // 엑시오스는 데이터를 프라미스로 처리하여 원하는
    // 결과를 보장하는 간편한 데이터 처리 라이브러리다!

    // 엑시오스 사용법:
    // 우선 상단에 import axios from 'axios' 해줌
    // 파일 가져오기 메서드: get()
    // 다음 실행 메서드 : then()
    axios
      .get(url) // 먼저 파일 로딩
      .then((result) => {
        // result가 넘어온 데이터 담음
        // 파일형식에 맞는 파싱 자동!
        console.log(result);

        // result에 넘어온 파일 객체가 담긴다!
        // 하위 data속성을 선택해야 실제 데이터가 선택됨
        const wdata = result.data;

        // 상태변수값에 셋팅하기 //////
        this.setState({
          // 1. 기온
          temp: wdata.main.temp,
          // 2. 설명
          desc: wdata.weather[0].description,
          // 3. 날씨 아이콘
          icon: wdata.weather[0].icon,
          // 4. 정보로딩여부
          loading: false, // 로딩여부끝(false)
          // 5. 도시명
          city: cityName,
        }) //// setState //////
          
      }) //// then ////////////////
      /// 에러 처리 메서드 : catch()
      .catch((err) => console.log(err));
      /////// axios 끝 /////
  } //////////// componentDidMount /////////////

  // 컴포넌트 결과 랜더링 메서드 /////////
  // render(){} -> 여기서 완성코드를 return한다!!!
  render() {
    // 아이콘 정보 : API업체url
    const isrc = `https://openweathermap.com/img/w/${this.state.icon}.png`;

    // 로딩중 loading값이 true이면
    if (this.state.loading) {
      return <h4>Loading...</h4>;
    } /// if ////
    // 로딩성공시 loading 값이 false이면
    else {
      /* 절대온도이므로 섭씨온도로 바꾼다!
            절대온도 - 273.15 뺀다!
            소수점도 한자리만 표시 */
      let ctemp = (parseInt(this.state.temp) - 273.15).toFixed(1);
      // toFixed(자릿수)

      return (
        <div className="weather-bx">
          <h4>Now Weather</h4>
          <h5>{this.state.city}</h5>
          <img src={isrc} alt="weather icon" />
          <p>{ctemp}℃</p>
          <p>{this.state.desc}</p>
        </div>
      );
    } /// else ////
  } /////// reder 메서드 /////////
} /////// Weather 컴포넌트 ////////

// 내보내기 ///
export default Weather;

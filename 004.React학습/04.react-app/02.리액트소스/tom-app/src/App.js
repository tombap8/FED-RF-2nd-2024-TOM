import logo from "./logo.svg";
import "./App.css";
import $ from "jquery";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    $(".App-header span").hover(
      (e) => { // 오버시
        $(e.currentTarget)
        .stop().animate(
          {
            scale: 1.4,
          },
          500
        );
      },
      (e) => { // 아웃시
        $(e.currentTarget)
        .stop().animate(
          {
            scale: 1,
          },
          500
        );
      }
    );
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <span>
          <img
            src="https://poc-cf-image.cjenm.com/public/share/menumng/%EC%84%A0%EC%9E%AC%EC%97%85%EA%B3%A0%ED%8A%80%EC%96%B4banner960.png?v=1710465873"
            className="App-logo"
            alt="logo"
          />
        </span>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

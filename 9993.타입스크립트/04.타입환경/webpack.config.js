const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 애플리케이션 시작점(entry point) 설정
  entry: "./src/index.ts",

  // 모듈 처리 규칙 설정
  module: {
    rules: [
      {
        // .ts 파일 처리
        test: /\.ts$/,
        // ts-loader를 사용하여 타입스크립트 파일을 처리
        use: "ts-loader",
        // node_modules 폴더는 처리에서 제외
        exclude: /node_modules/,
      },
    ],
  },

  // 모듈 해석 설정
  resolve: {
    // import 시 확장자 생략 가능
    extensions: [".ts", ".js"],
  },

  // 출력 설정
  output: {
    // 번들 파일 이름
    filename: "bundle.js",
    // 번들 파일이 생성될 경로
    path: path.resolve(__dirname, "dist"),
    // 기존 출력물 삭제
    clean: true,
  },

  // 플러그인 설정
  plugins: [
    // HTML 파일 생성
    new HtmlWebpackPlugin({
      // 템플릿 파일 경로
      template: "./public/index.html",
    }),
  ],

  // 모드 설정
  // - development: 개발 모드, 소스맵 생성, 최적화 비활성화
  mode: "development",

  // 소스맵 생성 설정
  devtool: "source-map",

  // 웹팩 상태 정보 설정
  stats: {
    // 에러 메시지에 자세한 정보 포함
    errorDetails: true,
  },
};


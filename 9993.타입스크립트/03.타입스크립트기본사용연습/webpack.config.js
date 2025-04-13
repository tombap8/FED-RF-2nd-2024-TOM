const path = require('path');

module.exports = {
  // 개발 모드 설정
  // - 소스맵 생성
  // - 최적화 비활성화
  mode: 'development',
  
  // 진입점(entry point) 설정
  // - 타입스크립트 파일을 시작점으로 지정
  entry: './src/index.ts',
  
  // 소스맵 생성 옵션
  // - 디버깅을 위해 원본 소스와 번들 파일의 매핑 정보 생성
  devtool: 'inline-source-map',
  
  // 모듈 처리 규칙 설정
  module: {
    rules: [
      {
        // .ts 또는 .tsx 확장자를 가진 파일 처리
        test: /\.tsx?$/,
        // ts-loader를 사용하여 타입스크립트 파일을 처리
        use: 'ts-loader',
        // node_modules 폴더는 처리에서 제외
        exclude: /node_modules/,
      },
    ],
  },
  
  // 모듈 해석 설정
  resolve: {
    // import 시 확장자 생략 가능
    extensions: ['.tsx', '.ts', '.js'],
  },
  
  // 출력 설정
  output: {
    // 번들 파일 이름
    filename: 'bundle.js',
    // 번들 파일이 생성될 경로
    // - public 폴더에 생성되어 웹 서버에서 접근 가능
    path: path.resolve(__dirname, 'public'),
    // 웹 서버에서 접근할 때의 기본 경로
    publicPath: '/'
  },
  
  // 개발 서버 설정
  devServer: {
    // 정적 파일 제공 설정
    static: {
      // 정적 파일이 위치한 디렉토리
      directory: path.join(__dirname, 'public'),
    },
    // gzip 압축 사용
    compress: true,
    // 개발 서버 포트
    port: 9000,
    // 핫 모듈 교체(HMR) 활성화
    // - 코드 변경 시 자동으로 브라우저 갱신
    hot: true
  },
}; 
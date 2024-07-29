// server.js 파일은 Express 서버에서
// 구동을 위한 기본 설정을 읽어들이는 파일임!

// 명령어: node server

// 익스프레스 기본 모듈 import
const express = require('express');
// 서버경로를 위한 import
const path = require('path');
// 서버역할을 위한 익스프레스 생성자 메서드 불러오기
const app = express();

// 기본 포트 연결하기
app.listen(8080, function(){
    console.log('8080포트로 연결됨!');
});

// 서버 루트폴더 정적연결하기!(루트 정하기)
// -> SPA에서 빌드하면 배포용 소스가 build폴더에 생성되므로
// 이 배포용 폴더를 Root로 잡으면 편하다!!!
app.use(express.static(path.join(__dirname,'/build')));
// -> SPA 앱 빌드시 유의사항 : package.json파일에
// home:'http://localhost:8080' 를 등록하여 사용함!!!
// localhost는 127.0.0.1 내부호출 아이피와 동일함!

// 첫페이지 설정하기! -> url로 쳐서 들어가는 경로를 설정함!
// -> get방식으로 연결하기 때문에 get()메서드 사용!
app.get('/', function(request, response){
    // 내부로 전달되는 값은 처음것이 요청, 두번째가 응답임!
    response.sendFile(path.join(__dirname), '/build/index.html');
    // 첫페이지는 요청에 대한 응답임! 파일을 내려보내주니까
    // sendFile() 메서드사용!
});

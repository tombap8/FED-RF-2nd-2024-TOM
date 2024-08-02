// server.js 파일은 Express 서버에서
// 구동을 위한 기본 설정을 읽어들이는 파일임!

// 익스프레스 기본 모듈 import
const express = require("express");
// 서버경로를 위한 import
const path = require("path");
// 서버역할을 위한 익스프레스 생성자 메서드 불러오기
const app = express();

// 멀터 미들웨어를 불러온다!왜? 파일전송처리를 위해!
const multer = require("multer");

// 멀터를 이용하여 업로드 셋업을 한다!
// multer() 에 업로드할 폴더위치를 정해준다!
// dest 속성에 값으로 셋팅!
// 커스터마이징 없이 기본 dest 로 업로드 위치를 셋팅하면
// 폴더가 없을경우 폴더를 생성해 준다!

// But...! 파일명을 겹쳐지므로 이것을 커스터마징하여
// 변경하면 자동으로 폴더를 생성하지 않으므로
// 우리가 uploads라는 폴더를 생성해야한다!
// -> 배포시 이 폴더가 생기도록 SPA 개발폴더의 public아래에
// uploads 폴더를 만들어준다!

// 파일명을 내가 원하는 원래 이름으로 들어가도록 변경한다!
// 멀터 스토리지의 저장소를 사용함!
const storage = multer.diskStorage({
  // 폴더경로를 여기 설정함(dest설정은 지원준다!)
  destination: function (req, file, setPath) {
    // 여기에 파일저장위치를 지정함!
    setPath(null, "public/uploads/");
    // -> 아래는 실서버 배포시 변경용코드![1]
    // setPath(null,"build/uploads/");
    // 여기지정하면 자동으로 uploads파일을 만들지 않음!
  },
  // 파일명이 원래 이름으로 들어가도록 변경하기
  filename: function (req, file, setName) {
    // 파일명을 오리지널 이름으로 변경
    setName(null, file.originalname);
    // 내부전달 2번째 값에 파일정보가 들어오고
    // originalname 속성은 파일명+확장자가 있다!
  },
});

// 변경된 정보가 반영도록 storage를 담아준다!
const upload = multer({ storage: storage });

// 기본 경로만 사용한 방식:
// const upload = multer({ dest: "build/uploads/" });

// 파일업로드는 POST방식으로 진행함!
// 익스프레스 서버 메서드에 post()메서드로 설정함!
// -> 첫번째값은 루트아래에 업로드관련 post전송을 선택
// -> xxx는 폴더명이 아니고 작업명이다!!!
// -> 두번째 항목은 전송종류를 설정 : 파일전송은 'file'
// -> 세번째는 내부전달 변수인 요청,응답에 대한 함수
app.post("/xxx", upload.single("file"), (req, res) => {
  console.log(req.file);
});

// 기본 포트 연결하기
app.listen(8080, function () {
  console.log("8080포트로 연결됨!");
});

// 서버 루트폴더 정적연결하기!(루트 정하기)
// -> SPA에서 빌드하면 배포용 소스가 build폴더에 생성되므로
// 이 배포용 폴더를 Root로 잡으면 편하다!!!
app.use(express.static(path.join(__dirname, "/public")));
// -> 아래는 실서버 배포시 변경용코드![2]
// app.use(express.static(path.join(__dirname, "/build")));
// -> SPA 앱 빌드시 유의사항 : package.json파일에
// home:'http://localhost:8080' 를 등록하여 사용함!!!
// localhost는 127.0.0.1 내부호출 아이피와 동일함!

// 첫페이지 설정하기! -> url로 쳐서 들어가는 경로를 설정함!
// -> get방식으로 연결하기 때문에 get()메서드 사용!
app.get("/", function (request, response) {
  // 내부로 전달되는 값은 처음것이 요청, 두번째가 응답임!
  response.sendFile(path.join(__dirname), "/public/index.html");
  // -> 아래는 실서버 배포시 변경용코드![3]
  // response.sendFile(path.join(__dirname), "/build/index.html");
  // 첫페이지는 요청에 대한 응답임! 파일을 내려보내주니까
  // sendFile() 메서드사용!
});

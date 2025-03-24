// 회원가입을 위한 로컬스토리지 생성 JS
/************************************ 
    [ 회원가입 기본 데이터 구조 ]
    1. 기본키(유일키) : idx
    2. 아이디 : uid
    3. 비밀번호 : pwd
    4. 사용자이름 : unm
    5. 이메일 : eml
************************************/

// [ 로컬쓰 클리어 ] /////////
const clearData = () => {
  localStorage.clear();
  console.log("로컬쓰 클리어!");
}; /////////// clearData //////////////

// [ 로컬쓰 초기체크셋팅! ] ////////////
const initData = () => {
  // 만약 로컬스 "mem-data"가 null이면 만들어준다!
  if (localStorage.getItem("mem-data") === null) {
    localStorage.setItem(
      "mem-data",
      `
      [
          {
              "idx": 1,
              "uid": "admin",
              "pwd": "1111",
              "unm": "Administrator",
              "eml": "admin@dc.com"
          },
          {
              "idx": 2,
              "uid": "tomtom",
              "pwd": "1111",
              "unm": "Tom",
              "eml": "tom@gmail.com"
          },
          {
              "idx": 3,
              "uid": "mountainhiker",
              "pwd": "1111",
              "unm": "Alice Johnson",
              "eml": "mountainhiker@example.com"
          },
          {
              "idx": 4,
              "uid": "chefbob",
              "pwd": "1111",
              "unm": "Bob Smith",
              "eml": "chefbob@example.com"
          },
          {
              "idx": 5,
              "uid": "bookwormlee",
              "pwd": "1111",
              "unm": "Catherine Lee",
              "eml": "bookwormlee@example.com"
          },
          {
              "idx": 6,
              "uid": "gardenguru",
              "pwd": "1111",
              "unm": "David Brown",
              "eml": "gardenguru@example.com"
          },
          {
              "idx": 7,
              "uid": "traveleremily",
              "pwd": "1111",
              "unm": "Emily Davis",
              "eml": "traveleremily@example.com"
          },
          {
              "idx": 8,
              "uid": "fitfrank",
              "pwd": "1111",
              "unm": "Frank Harris",
              "eml": "fitfrank@example.com"
          },
          {
              "idx": 9,
              "uid": "techiegrace",
              "pwd": "1111",
              "unm": "Grace Wilson",
              "eml": "techiegrace@example.com"
          },
          {
              "idx": 10,
              "uid": "musiclover",
              "pwd": "1111",
              "unm": "Henry Clark",
              "eml": "musiclover@example.com"
          },
          {
              "idx": 11,
              "uid": "moviebuff",
              "pwd": "1111",
              "unm": "Irene Martinez",
              "eml": "moviebuff@example.com"
          },
          {
              "idx": 12,
              "uid": "diyjack",
              "pwd": "1111",
              "unm": "Jack Robinson",
              "eml": "diyjack@example.com"
          },
          {
              "idx": 13,
              "uid": "fitkatie",
              "pwd": "1111",
              "unm": "Katie Lewis",
              "eml": "fitkatie@example.com"
          },
          {
              "idx": 14,
              "uid": "artlover",
              "pwd": "1111",
              "unm": "Liam Walker",
              "eml": "artlover@example.com"
          },
          {
              "idx": 15,
              "uid": "bakermia",
              "pwd": "1111",
              "unm": "Mia Hall",
              "eml": "bakermia@example.com"
          },
          {
              "idx": 16,
              "uid": "guitarnoah",
              "pwd": "1111",
              "unm": "Noah Young",
              "eml": "guitarnoah@example.com"
          },
          {
              "idx": 17,
              "uid": "petlover",
              "pwd": "1111",
              "unm": "Olivia King",
              "eml": "petlover@example.com"
          },
          {
              "idx": 18,
              "uid": "runnerpaul",
              "pwd": "1111",
              "unm": "Paul Scott",
              "eml": "runnerpaul@example.com"
          },
          {
              "idx": 19,
              "uid": "cityexplorer",
              "pwd": "1111",
              "unm": "Quinn Adams",
              "eml": "cityexplorer@example.com"
          },
          {
              "idx": 20,
              "uid": "readerrachel",
              "pwd": "1111",
              "unm": "Rachel Baker",
              "eml": "readerrachel@example.com"
          }
      ]
    `
    );
  }
}; ///////////// initData /////////////////

export { clearData, initData };

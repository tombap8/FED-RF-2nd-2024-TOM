// 데이터 유형에 맞게 만들기 ///////

// [vans신발 데이터 생성]
// let category = ["man","woman","kids"];
// let gname = ["반스캐쥬얼","반스어얼리","반스뉴진스","반스스타일"];
// let gprice = ["43000","55000","76000","48000","66000"];

// [여성의류 데이터 생성]
let category = ["modern","casual"];
let gname = ["워닝드레스","워스비버든","코코샤스넬라","포코로와드"];
let gprice = ["123000","224000","253000","340000","520000"];

// 개수읽어오기
let categoryNum = category.length;
let gnameNum = gname.length;
let gpriceNum = gprice.length;



// 호출시 : rdm[아이템개수]
let rdm = (x)=> Math.floor(Math.random()*x);

let bb = [];

for(let x=1;x<=19;x++){
bb.push({
        "idx":x,
        "gname":gname[rdm(gnameNum)],
        "category":category[rdm(categoryNum)],
        "gprice":gprice[rdm(gpriceNum)]
    });
}
console.log(bb)
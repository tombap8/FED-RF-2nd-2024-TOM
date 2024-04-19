window.addEventListener("DOMContentLoaded", ()=>{

    const news  = document.querySelector(".news");
    const news_body = news.querySelector("tbody");
    console.log(news, news_body);
    
    let hcode = "";
    for(let x in ndata){
            hcode += `<tr>`;
            for(let y in ndata[x]){
                if(y === "번호" || y === "작성자"){
                    hcode += `
                    <td class="mb_hidden">${ndata[x][y]}</td>
                `;
                }else if(y === "제목"){
                    hcode += `
                    <td class="tit">
                        <a href="#">
                            ${ndata[x][y]}
                        </a>
                    </td>
                    `;
                }
                else{
                    hcode += `
                    <td>${ndata[x][y]}</td>
                    `;
                }
        }
        hcode += `</tr>`;
    }

    news_body.innerHTML = hcode;
})
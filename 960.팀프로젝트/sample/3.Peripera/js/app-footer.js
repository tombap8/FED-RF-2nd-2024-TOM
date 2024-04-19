window.addEventListener("DOMContentLoaded", ()=>{
    const siteList = document.querySelector(".site_list");
    const selectSite = document.querySelector(".select_txt");

    selectSite.onclick = (e)=>{
        siteList.classList.toggle("on");
        event.preventDefault();
    }



})
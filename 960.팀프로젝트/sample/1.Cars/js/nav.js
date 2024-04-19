function nav() {
    const qs = x => document.querySelector(x);
    
    const nav = qs("#nav");
    const navBg = qs("#nav_bg");
    const height = `${document.documentElement.scrollHeight}px`;
    
    qs("#nav > .contents_con").style.height = height;
    
    console.log(nav.style.display);

    if (nav.style.display === "" || nav.style.display === "none") {
        nav.style.display = "block";
        navBg.style.display = "block";
        nav.classList.remove('close');
        nav.classList.add('open');
        nav.removeEventListener('animationend', aniNav);
        nav.addEventListener('animationend', aniNav);
    } else if(nav.style.display === "block") {
        nav.classList.remove('open');
        nav.classList.add('close');
        nav.removeEventListener('animationend', aniNav);
        nav.addEventListener('animationend', aniNav);
    }

    function aniNav(){
        nav.removeEventListener('animationend', aniNav);
        if(nav.classList.contains('close')) {
            nav.style.display = "none";
            navBg.style.display = "none";
        }
    }
}
  
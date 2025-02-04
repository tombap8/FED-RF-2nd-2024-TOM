
export const MainComp = Vue.component("main-comp",{
    template: `
    <main>
      <banner-comp/>
      <today-area-comp/>
      <fashion-area-comp/>
    </main>
    `,
    mounted(){
      // css셋팅
      $('#css-set').attr('href','./css/main.css');
    },
  });
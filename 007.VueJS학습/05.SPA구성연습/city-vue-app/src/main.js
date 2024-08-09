// 맨 처음 읽어 들이는 JS파일 - main.js
import Vue from 'vue'
// 구성 Root VUE 파일
import App from './App'
// 뷰JS 라우터 불러오기
// (기본적으로 라우터 폴더 아래 index.js를 읽어옴)
import router from './router'
// 뷰엑스 스토어 JS 불러오기
import store from './store'

// 팁 메시지 안나오게 하는 코드
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store, // 스토어 사용등록!
  router, // 라우터 사용등록!
  components: { App },
  template: '<App/>',
  // 뷰 인스턴스 생성직후 호출코드구역
  created(){
    // 데이터 초기화 메서드 호출!
    store.commit('initSet');
  },
})

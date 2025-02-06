// 뷰엑스 스토아 - 전역뷰데이터 저장소!!!

////// 뷰엑스 스토아를 활용한 변수 셋팅하기 ///////
// [뷰엑스 스토어 인스턴스를 생성한다!!!] //////

// export const store = new Vuex.Store({
export default new Vuex.Store({
  // 1. 데이터 셋팅구역
  state: {
    logSet: {},
    logCls: '',
  },
  // 2. 데이터 변경 메서드 구역
  // -> 컴포넌트에서 호출시 commit() 사용!
  mutations: {
    setLogin(st,pm){
        st.logSet = pm;
        st.logCls = 'logon';
        // 김소월님, 환영합니다~!🙍‍♀️🙍‍♂️🙎‍♀️🙎‍♂️🦸‍♀️🦸‍♂️🦹‍♀️🦹‍♂️
    },
    setLogout(st,pm){
        st.logSet = {};
        st.logCls = '';
    },
  },
  // 3. 비동기처리 메서드 구역
  // -> 컴포넌트에서 호출시 dispatch() 사용!
  actions: {},
}); /////////// Vuex.Store ///////////////

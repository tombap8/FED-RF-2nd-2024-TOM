module.exports = {
    // 환경 변수들은 process.env 객체에 정의됨.
    // NODE_ENV -> 앱이 실행되는 모드 3개의 기본 모드가 있음
    // ("development", "production", "test")
	publicPath: process.env.NODE_ENV === 'production'
    ? '/city-vue-app/'
    : '/'
}
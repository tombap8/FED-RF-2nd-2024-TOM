<template>
  <main>
    <img v-bind:src="this.$store.state.imgsrc" alt="지역이미지" />
    <p v-text="this.$store.state.desc"></p>
  </main>
</template>

<script>
export default {
  name: "MainArea",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main {
  padding: 10px;
}
main img {
  width: 100%;
}
</style>

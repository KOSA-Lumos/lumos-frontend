<template>
  <v-app>
    <button @click="goToChild">라우터 띄우기</button>
    <button @click="main123">메인123라우터 띄우기</button>
    <router-view></router-view>
    <mainPageFooter></mainPageFooter>
  </v-app>
</template>

<script>
import mainPageFooter from './components/footer/mainPageFooter.vue';

export default {
  name: 'app',
  components: {
    mainPageFooter,
  },
  methods: {
    goToChild() {
      this.$router.push('/child');
    },
    main123() {
      this.$router.push('/mainPage123');
    },
  },
};
</script>


<style scoped>

</style>
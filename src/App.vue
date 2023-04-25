<template>
  <v-app>
    <mainPage></mainPage>
    <mainPageFooter></mainPageFooter>
  </v-app>
</template>

<script>
import mainPage from'./components/body/mainPage.vue';
import mainPageFooter from './components/footer/mainPageFooter.vue';

export default {
  name: 'app',
  components: {
    mainPageFooter,
    mainPage,
  },
  methods: {},
};
</script>

<style scoped>

</style>
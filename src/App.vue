<template>
  <v-app>
    <mainPageHeader></mainPageHeader>
    <mainPage></mainPage>
    <mainPageFooter></mainPageFooter>
    <shareButton></shareButton>
  </v-app>
</template>

<script>
import mainPageHeader from './components/header/mainPageHeader.vue';
import mainPage from'./components/body/mainPage.vue';
import mainPageFooter from './components/footer/mainPageFooter.vue';
import shareButton from './components/footer/shareButton.vue';

export default {
  name: 'app',
  components: {
    mainPageHeader,
    mainPageFooter,
    mainPage,
    shareButton
  },
  methods: {},
};
</script>

<style>

</style>

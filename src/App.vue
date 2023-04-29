<template>
  <v-app>

    <router-view />
    <footer-layout />

  </v-app>
</template>

<script>
import FooterLayout from './components/layout/FooterLayout.vue';

export default {
  name: 'app',
  components: {
    FooterLayout,
  },
  methods: {
    // goToChild() {
    //   this.$router.push('/child');
    // },
    // main123() {
    //   this.$router.push('/mainPage123');
    // },
  },
};
</script>

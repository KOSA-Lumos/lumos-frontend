<template>
  <v-app>

    <div style="height: calc(100vh - 54px);">
      <router-view />
    </div>
    <div style="height: 54px">
      <footer-main />
    </div>

  </v-app>
</template>

<script>
import FooterMain from './components/footer/FooterMain.vue';

export default {
  name: 'app',
  components: {
    FooterMain,
  },
  methods: {
    
  },
};
</script>

<template>
  <v-app>

    <div  style="min-height: calc(100vh - 92px)">
      <router-view />
    </div>
    <div style="height: 92px">
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

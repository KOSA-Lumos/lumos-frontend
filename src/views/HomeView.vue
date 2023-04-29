<template>
  <v-main>
    <v-container>

      <v-row>
        <v-col cols="8">
          <home-contents-layout />
        </v-col>
        <v-col cols="4">
          <home-side-layout />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <home-center-data-layout />
        </v-col>
      </v-row>

    </v-container>
  </v-main>
</template>

<script>
import HomeCenterDataLayout from '@/components/layout/HomeCenterDataLayout.vue';
import HomeContentsLayout from '@/components/layout/HomeContentsLayout.vue';
import HomeSideLayout from '@/components/layout/HomeSideLayout.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    HomeContentsLayout,
    HomeSideLayout,
    HomeCenterDataLayout,
  },

  data () {
    return {

    }
  },
});
</script>

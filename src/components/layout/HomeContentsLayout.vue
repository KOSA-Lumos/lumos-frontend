<template>
  <v-container>
    <v-row style="height: 40px; background-color: aquamarine;">
      <spec-select-box />
    </v-row>

    <v-row style="height: 700px;">
      <map-box />
    </v-row>

  </v-container>
</template>

<script>
import MapBox from '../body/HomeContents/MapBox.vue'
import SpecSelectBox from '../body/HomeContents/SpecSelectBox.vue'

export default {
  components: { SpecSelectBox, MapBox },

}
</script>

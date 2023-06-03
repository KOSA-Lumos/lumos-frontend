<template>
  <div>
    
    <v-row style="height: 40px;">
      <spec-select-box />
    </v-row>

    <v-row style="height: calc(100vh - 82px);">
      <map-box />
    </v-row>

  </div>
</template>

<script>
import MapBox from '@/components/body/HomeContents/MapBox.vue'
import SpecSelectBox from '@/components/body/HomeContents/SpecSelectBox.vue'

export default {
  components: { SpecSelectBox, MapBox },

}
</script>

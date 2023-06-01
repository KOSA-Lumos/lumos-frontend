<template>
  <div>
    <h1>찜한 목록</h1>
    <v-card v-for="favorite in favoriteList" :key="favorite.center_num" class="mb-4">
      <v-card-title>{{ favorite.center_name }}</v-card-title>
      <v-card-text>{{ favorite.center_state }} {{ favorite.center_city }}</v-card-text>
    </v-card>
  </div>
</template>

<script>
import { onMounted,ref } from 'vue'
import axios from 'axios';
import store from '@/store';
export default {
  setup() {

    const favoriteList = ref([])
    
    var serverUrl = process.env.VUE_APP_SERVER_URL;

    onMounted(async () => {
      // try {
      // const userId = store.getters.getUserId;
      //   const res = await axios.get(`${serverUrl}/favorite/`);
      //   console.log('favoriteList', res.data);
      //   favoriteList.value = res.data;
      // } catch (error) {
      //   console.log('error', error);
      // }
      axios.get(`${serverUrl}/favorite`,{
        params : {
          userId : store.getters.getUserId,
        },
      })
      .then((res)=>{
        console.log('favoriteList', res.data);
        favoriteList.value = res.data;
      })
      .catch((err)=>{
        console.log(err);
      })
    });

    
    return {
      favoriteList,
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 16px;
}

.v-card {
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>

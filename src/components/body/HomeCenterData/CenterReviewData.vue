<template>
  <v-container>
    <div>
      <v-btn @click="callEmotionApp">Call Emotion App</v-btn>
    </div>
    <br />
    <div>
      <v-btn @click="callGptApp">Call Gpt App</v-btn>
    </div>
    <br />
    <div>
      <v-btn @click="callNaverApp">Call Naver App</v-btn>
    </div>
  </v-container>
</template>

<script>
import { reactive } from "vue";

export default {
  setup() {
    const data = reactive({
      response: "",
    });

    async function callEmotionApp() {
      try {
        const response = await fetch("http://localhost:5000/emotionApi", {
          method: "POST",
        });
        const responseData = await response.json();
        data.response = responseData;
        console.log(responseData);
      } catch (error) {
        console.error(error);
      }
    }

    async function callGptApp() {
      try {
        const response = await fetch("http://localhost:5000/gptApi", {
          method: "POST",
        });
        const responseData = await response.json();
        data.response = responseData;
        console.log(responseData);
      } catch (error) {
        console.error(error);
      }
    }

    async function callNaverApp() {
      try {
        const response = await fetch("http://localhost:5000/naverApi", {
          method: "POST",
        });
        const responseData = await response.json();
        data.response = responseData;
        console.log(responseData);
      } catch (error) {
        console.error(error);
      }
    }

    return { data, callEmotionApp, callGptApp, callNaverApp };
  },
};
</script>

<style scoped>
</style>
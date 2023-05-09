<template>
  <div>
    <v-btn @click="callgptmealApp">네이버파파고 영어로 번역하고 gpt식단추천 App</v-btn>
    <br />
    <br />
    <v-textarea
      bg-color="grey-lighten-2"
      color="cyan"
      label="(Naver)gpt에게 식단을 추천받으세요!!"
      :readonly="true"
      v-model="data.naverkoreanText"
    ></v-textarea>
    <br />
    <br />
    <v-btn @click="googlemealApp">구글 영어로 번역하고 gpt식단추천 App</v-btn>
    <br />
    <br />
    <v-textarea
      bg-color="grey-lighten-2"
      color="cyan"
      label="(Google)gpt에게 식단을 추천받으세요!!"
      :readonly="true"
      v-model="data.koreanText"
    ></v-textarea>
    <br />
    <br />
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  setup() {
    const data = reactive({
      response: "",
      mealresponse: "",
      koreanText: "",
      dialog: false,
    });

    async function callgptmealApp() {
      try {
        const mealresponse = await fetch("http://localhost:5000/gptmeal2API", {
          method: "POST",
        });
        const responseData = await mealresponse.text(); // Response를 text로 변환
        data.dialog = true;
        data.mealresponse = responseData;
        data.mealreplace = data.mealresponse;
        
        const navermealresponse = JSON.parse(responseData);
        const decodedText = navermealresponse.result.translatedText;
        data.navermealresponse = decodedText;
        data.naverkoreanText = data.navermealresponse
                  .replace(/(^{|}$)/g, "")
          .replace(/\\n/g, "\n");

        // console.log(data.mealreplace);
      } catch (error) {
        console.error(error);
      }
    }

    async function googlemealApp() {
      try {
        const googlemealresponse = await fetch(
          "http://localhost:5000/googlemealAPI",
          {
            method: "POST",
          }
        );
        const responseData = await googlemealresponse.text();
        data.dialog = true;
        const decodedResponse = JSON.parse(responseData);
        const decodedText = decodedResponse.result.translatedText;
        data.googlemealresponse = decodedText;
        if (typeof data.googlemealresponse !== "undefined") {
          console.log(data.googlemealresponse);
          console.log(typeof data.googlemealresponse);
        } else {
          console.log("data.googlemealresponse is not defined.");
        }
        data.koreanText = data.googlemealresponse
          .replace(/(^{|}$)/g, "")
          .replace(/\\n/g, "\n");

        // data.koreanText = decodeURIComponent(JSON.parse(decodedText));
        // console.log(data.koreanText);
        // data.koreanText.replace(/(^{|\}$)/g, '') // {와 } 제거
        // .replace(/\\n\\n/g, '\n\n'); // \n\n이 나올 때마다 엔터 삽입
      } catch (error) {
        console.error(error);
      }
    }

    return {
      data,
      callgptmealApp,
      googlemealApp,
    };
  },
};
</script>

<style scoped>
</style>
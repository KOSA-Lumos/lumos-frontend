<template>
  <div>
    <div><v-btn @click="callEmotionApp">Call Emotion App</v-btn></div>
    <br />
    <div><v-btn @click="callGptApp">Call Gpt App</v-btn></div>
    <br />
    <div><v-btn @click="callNaverApp">Call Naver App</v-btn></div>
    <br />
    <v-btn @click="callgptmealApp"
      >네이버파파고 영어로 번역하고 gpt식단추천 App</v-btn
    >
    <v-dialog v-model="data.dialog" max-width="500">
      <v-card>
        <v-card-title> 추천 식단 </v-card-title>
        <v-card-text>
          {{ data.mealresponse }}
          {{ data.mealreplace }}
          <!-- {{ responseData }} -->
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="data.dialog = false">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <br />
    <br />
    <v-btn @click="googlemealApp">구글 영어로 번역하고 gpt식단추천 App</v-btn>
    <v-dialog v-model="data.dialog" max-width="500">
      <v-card>
        <v-card-title> 추천 식단 </v-card-title>
        <v-card-text>
          <!-- {{ data.googlemealresponse }} -->
          {{ data.koreanText }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="data.dialog = false">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <br />
    <br />
    <div><v-btn @click="googletransrateApp">구글번역테스트하기</v-btn></div>
    <br />
    <v-btn @click="kinderrecommendAPP">구글 번역 어린이집 추천 App</v-btn>
    <v-dialog v-model="data.dialog" max-width="500">
      <v-card>
        <v-card-title> 어린이집 추천 </v-card-title>
        <v-card-text>
          {{ data.koreanText }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="data.dialog = false">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <br />
    <br />
    <v-btn @click="kinderemotionAPP">구글 번역 글들 감정분석 App</v-btn>
    <v-dialog v-model="data.dialog" max-width="500">
      <v-card>
        <v-card-title> 감정분석 </v-card-title>
        <v-card-text>
          {{ data.koreanText }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="data.dialog = false">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <br />
    <br />
    <v-btn @click="kinderresourceAPP">구글 번역 어린이집고려할목록 App</v-btn>
    <v-dialog v-model="data.dialog" max-width="500">
      <v-card>
        <v-card-title> 어린이집고려할목록 </v-card-title>
        <v-card-text>
          {{ data.koreanText }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="data.dialog = false">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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

    async function callgptmealApp() {
      try {
        const mealresponse = await fetch("http://localhost:5000/gptmeal2API", {
          method: "POST",
        });
        const responseData = await mealresponse.text(); // Response를 text로 변환
        data.dialog = true;
        data.mealresponse = responseData;
        data.mealreplace = data.mealresponse;
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

    async function googletransrateApp() {
      try {
        await fetch("http://localhost:5000/googletransrateAPI", {
          method: "POST",
        });
      } catch (error) {
        console.error(error);
      }
    }

    async function kinderrecommendAPP() {
      try {
        const kinderrecommend = await fetch(
          "http://localhost:5000/kinderrecommendAPI",
          {
            method: "POST",
          }
        );
        const responseData = await kinderrecommend.text();
        data.dialog = true;
        const decodedResponse = JSON.parse(responseData);
        const decodedText = decodedResponse.result.translatedText;
        data.kinderrecommend = decodedText;
        if (typeof data.kinderrecommend !== "undefined") {
          console.log(data.kinderrecommend);
          console.log(typeof data.kinderrecommend);
        } else {
          console.log("data.kinderrecommend is not defined.");
        }
        data.koreanText = data.kinderrecommend
          .replace(/(^{|}$)/g, "")
          .replace(/\\n/g, "\n");

      } catch (error) {
        console.error(error);
      }
    }

    async function kinderemotionAPP() {
      try {
        const kinderemotion = await fetch(
          "http://localhost:5000/kinderemotionAPI",
          {
            method: "POST",
          }
        );
        const responseData = await kinderemotion.text();
        data.dialog = true;
        const decodedResponse = JSON.parse(responseData);
        const decodedText = decodedResponse.result.translatedText;
        data.kinderemotion = decodedText;
        if (typeof data.kinderemotion !== "undefined") {
          console.log(data.kinderemotion);
          console.log(typeof data.kinderemotion);
        } else {
          console.log("data.kinderemotion is not defined.");
        }
        data.koreanText = data.kinderemotion
          .replace(/(^{|}$)/g, "")
          .replace(/\\n/g, "\n");

      } catch (error) {
        console.error(error);
      }
    }

    async function kinderresourceAPP() {
      try {
        const kinderresource = await fetch(
          "http://localhost:5000/kinderresourceAPI",
          {
            method: "POST",
          }
        );
        const responseData = await kinderresource.text();
        data.dialog = true;
        const decodedResponse = JSON.parse(responseData);
        const decodedText = decodedResponse.result.translatedText;
        data.kinderresource = decodedText;
        if (typeof data.kinderresource !== "undefined") {
          console.log(data.kinderresource);
          console.log(typeof data.kinderresource);
        } else {
          console.log("data.kinderresource is not defined.");
        }
        data.koreanText = data.kinderresource
          .replace(/(^{|}$)/g, "")
          .replace(/\\n/g, "\n");

      } catch (error) {
        console.error(error);
      }
    }


    return {
      data,
      callEmotionApp,
      callGptApp,
      callNaverApp,
      callgptmealApp,
      googlemealApp,
      googletransrateApp,
      kinderrecommendAPP,
      kinderemotionAPP,
      kinderresourceAPP,
    };
  },
};
</script>

<style scoped>
</style>
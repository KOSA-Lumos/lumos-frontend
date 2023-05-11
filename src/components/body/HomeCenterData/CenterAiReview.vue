<template>
  <div>
    <v-btn @click="googletransrateApp">(TEST) 구글번역테스트하기</v-btn>
    <v-dialog v-model="data.dialog" max-width="500">
      <v-card>
        <v-card-title> </v-card-title>
        <v-card-text> {{ data.koreanText }} 번역 </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="data.dialog = false">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <br />
    <br />
    <div><v-btn @click="callGptApp">(TEST) Gpt App</v-btn></div>
    <br />
    <div>
      <v-btn @click="callNaverApp"
        >(TEST) Naver 카페검색하기 App v-card로 배치가능</v-btn
      >
    </div>
    <br />
    <div id="app">
      <v-container>
        <v-card
          v-for="item in data.Naverresponse.items"
          :key="item.cafeurl"
          class="mb-3"
        >
          <v-card-text>
            {{ item.description }}
          </v-card-text>
        </v-card>
      </v-container>
    </div>
    <br />
    <v-btn @click="kinderrecommendAPP">
      (다른 페이지에 들어갈것)!! 구글 번역 어린이집 추천 App</v-btn
    >
    <v-dialog v-model="data.dialog" max-width="500">
      <v-card>
        <v-card-title> </v-card-title>
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
    <br />
    <div><v-btn @click="callEmotionApp">아마존 감정처리하기</v-btn></div>
    <v-textarea
      bg-color="grey-lighten-2"
      color="cyan"
      label="(Amazone)후기가 긍정적일까요 부정적일까요"
      :readonly="true"
    ></v-textarea>
    <br />
    <v-btn @click="kinderresourceAPP">어린이집 선택시 고려할 목록 App</v-btn>
    <v-textarea
      bg-color="grey-lighten-2"
      color="cyan"
      label="(GPT)어린이집 선택시 우선적으로 봐야할 목록"
      :readonly="true"
      v-model="data.koreanText"
    ></v-textarea>
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  setup() {
    const data = reactive({
      response: {},
      Naverresponse: {},
      mealresponse: "",
      description: {},
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
        data.Naverresponse = responseData;
        console.log(responseData);
        console.log(data.Naverresponse);
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
        const googletransrate = await fetch(
          "http://localhost:5000/googletransrateAPI",
          {
            method: "POST",
          }
        );
        const responseData = await googletransrate.text();
        data.dialog = true;
        const decodedResponse = JSON.parse(responseData);
        const decodedText = decodedResponse.result.translatedText;
        data.googletransrate = decodedText;
        if (typeof data.googletransrate !== "undefined") {
          console.log(data.googletransrate + "+ 번역");
          console.log(typeof data.googletransrate);
        } else {
          console.log("data.googletransrate is not defined.");
        }
        data.koreanText = data.googletransrate
          .replace(/(^{|}$)/g, "")
          .replace(/\\n/g, "\n");
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
      kinderresourceAPP,
    };
  },
};
</script>

<style scoped>
</style>
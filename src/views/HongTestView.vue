<template>
  <div>
    <h1
      class="text-decoration-underline"
      style="text-align: center; margin-top: 50px"
    >
      찜한 목록
    </h1>
    <v-card style="background-color: #f5f5f5; max-width: 1700px; min-height: 300px">
      <v-row>
        <v-col
          v-for="favorite in favoriteList"
          :key="favorite.center_num"
          cols="3"
        >
          <v-card class="mb-3">
            <v-card-title>{{ favorite.center_name }}</v-card-title>
            <v-card-text>
              유형: {{ favorite.center_category }} <br />
              주소: {{ favorite.center_state }} {{ favorite.center_city }}
              <br />
              어린이집 유형: {{ favorite.center_type }} <br />
              연장보육 여부: {{ favorite.center_extendcare ? "O" : "X" }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
  <br>
  <div>
    <v-btn
      @click="kinderrecommendAPP"
      v-if="favoriteList"
      style="margin-left: 50px"
    >
      어린이집 추천 App</v-btn
    >
    <br />
    <br />
    <v-textarea
      v-if="favoriteList"
      bg-color="grey-lighten-5"
      color="cyan"
      label="(Gpt)가장 마음에 드는 어린이집을 추천받으세요"
      :readonly="true"
      rows="15"
      v-model="data.koreanText"
      style="margin-left: 50px; margin-right: 50px"
    ></v-textarea>
  </div>

  <v-dialog v-model="data.loading" persistent width="400" height="600">
    <v-card color="white" dark>
      <v-card-text class="text-center">
        <span class="text-body-2">AI 응답 대기중!!</span>
        <v-progress-circular indeterminate color="yellow"></v-progress-circular>
      </v-card-text>
      <v-card-actions>
        <v-btn color="black" block @click="data.loading = false"
          >로딩창 끄기</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { reactive } from "vue";
import { onMounted, ref } from "vue";
import axios from "axios";
import store from "@/store";
export default {
  setup() {
    const favoriteList = ref([]);

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
      axios
        .get(`${serverUrl}/favorite`, {
          params: {
            userId: store.getters.getUserId,
          },
        })
        .then((res) => {
          console.log("favoriteList", res.data);
          favoriteList.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    });

    const data = reactive({
      response: {},
      Naverresponse: {},
      mealresponse: "",
      description: {},
      koreanText: "",
      dialog: false,
      loading: false,
    });

    async function kinderrecommendAPP() {
      data.loading = true;
      try {
        const kinderrecommend = await fetch(
          "http://localhost:5000/kinderrecommendAPI",
          {
            method: "POST",
          }
        );
        const responseData = await kinderrecommend.text();
        data.loading = false;
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
          .replace(/"/, "")
          .replace(/\\ n/g, "\n");
      } catch (error) {
        data.loading = false;
        console.error(error);
      }
    }

    return {
      favoriteList,
      data,
      kinderrecommendAPP,
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

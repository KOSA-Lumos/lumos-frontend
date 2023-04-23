<template>
  <v-container>
    <v-col cols="12">
      <v-btn @click="getData">유치원 데이터 가져오기</v-btn>
    </v-col>
    <v-col cols="12">
      <v-btn @click="getkinderData">어린이집 데이터 가져오기</v-btn>
    </v-col>
    <v-row v-if="data.kinderInfo">
      <v-col cols="12">
        <ul>
          <li>주소: {{ data.kinderInfo[0].addr }}</li>
          <li>3년제학급수: {{ data.kinderInfo[0].clcnt3 }}</li>
          <li>4년제학급수: {{ data.kinderInfo[0].clcnt4 }}</li>
          <li>5년제학급수: {{ data.kinderInfo[0].clcnt5 }}</li>
          <li>설립일자: {{ data.kinderInfo[0].edate }}</li>
          <li>설립유형: {{ data.kinderInfo[0].establish }}</li>
          <li>전화번호: {{ data.kinderInfo[0].telno }}</li>
          <li>홈페이지 주소: {{ data.kinderInfo[0].hpaddr }}</li>
          <li>교육청명: {{ data.kinderInfo[0].officeedu }}</li>
          <li>운영시간: {{ data.kinderInfo[0].opertime }}</li>
          <li>공학시간: {{ data.kinderInfo[0].pbnttmng }}</li>
          <li>3세급수: {{ data.kinderInfo[0].ppcnt3 }}</li>
          <li>4세급수: {{ data.kinderInfo[0].ppcnt4 }}</li>
          <li>5세급수: {{ data.kinderInfo[0].ppcnt5 }}</li>
          <li>혼합급수: {{ data.kinderInfo[0].mixclcnt }}</li>
          <li>혼합인원수: {{ data.kinderInfo[0].mixppcnt }}</li>
          <li>개원일자: {{ data.kinderInfo[0].odate }}</li>
          <li>소재지 우편번호: {{ data.kinderInfo[0].rppnname }}</li>
          <li>어린이보호구역내 학교여부: {{ data.kinderInfo[0].shclcnt }}</li>
          <li>어린이보호구역내 유치원여부: {{ data.kinderInfo[0].shppcnt }}</li>
          <li>교육지원청명: {{ data.kinderInfo[0].subofficeedu }}</li>
        </ul>
      </v-col>
    </v-row>
    <v-row v-if="data.getkinderData">
      <v-col cols="12">
        <ul>
          <li>시도명: {{ data.getkinderData[0].sidoname }}</li>
          <li>시군구명: {{ data.getkinderData[0].sigunguname }}</li>
          <li>어린이집코드: {{ data.getkinderData[0].stcode }}</li>
          <li>어린이집명: {{ data.getkinderData[0].crname }}</li>
          <li>어린이집유형: {{ data.getkinderData[0].crtypename }}</li>
          <li>운영현황: {{ data.getkinderData[0].crstatusname }}</li>
          <li>운영현황: {{ data.getkinderData[0].zipcode }}</li>
          <li>상세주소: {{ data.getkinderData[0].craddr }}</li>
          <li>전화번호: {{ data.getkinderData[0].crtelno }}</li>
          <!-- <li>운영시간: {{ data.getkinderData[0].opertime }}</li>
          <li>공학시간: {{ data.getkinderData[0].pbnttmng }}</li>
          <li>3세급수: {{ data.getkinderData[0].ppcnt3 }}</li>
          <li>4세급수: {{ data.getkinderData[0].ppcnt4 }}</li>
          <li>5세급수: {{ data.getkinderData[0].ppcnt5 }}</li>
          <li>혼합급수: {{ data.getkinderData[0].mixclcnt }}</li>
          <li>혼합인원수: {{ data.getkinderData[0].mixppcnt }}</li>
          <li>개원일자: {{ data.getkinderData[0].odate }}</li>
          <li>소재지 우편번호: {{ data.getkinderData[0].rppnname }}</li>
          <li>어린이보호구역내 학교여부: {{ data.getkinderData[0].shclcnt }}</li>
          <li>어린이보호구역내 유치원여부: {{ data.getkinderData[0].shppcnt }}</li>
          <li>교육지원청명: {{ data.getkinderData[0].subofficeedu }}</li> -->
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";

export default {
  setup() {
    const data = reactive({});

    const getData = () => {
      axios
        .get(
          "/api?key=" +
            process.env.VUE_APP_KINDERGARTEN_API_KEY +
            "&sidoCode=11&sggCode=11110"
        )
        .then((response) => {
          data.kinderInfo = response.data.kinderInfo;
          console.log("됨");
          console.log(response.data.kinderInfo);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const getkinderData = () => {
      axios
        .get(
          "/mediate/rest/cpmsapi030/cpmsapi030?key=005ab342fddc40618256e53e9426e46e&arcode=11380&stcode=",
        )
        .then((response) => {
          data.childcare = response.data.childcare;
          console.log("어린이집됨");
          console.log(response.data.childcare);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return { data, getData, getkinderData };
  },
};
</script>

<style>
</style>
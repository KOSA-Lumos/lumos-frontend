<template>
  <div v-if="state.testData">
    <v-table>
      <tbody>
        <tr>
          <th>센터번호</th>
          <td>{{ state.testData.center_num }}</td>
        </tr>
        <tr>
          <th>어린이집유치원명</th>
          <td>{{ state.testData.center_detail_name }}</td>
        </tr>
        <tr>
          <th>시도</th>
          <td>{{ state.testData.center_detail_state }}</td>
        </tr>
        <tr>
          <th>시군구</th>
          <td>{{ state.testData.center_detail_city }}</td>
        </tr>
        <tr>
          <th>유형</th>
          <td>{{ state.testData.center_detail_classification }}</td>
        </tr>
        <tr>
          <th>센터개소여부</th>
          <td>{{ state.testData.center_detail_centeropen }}</td>
        </tr>
        <tr>
          <th>교육청전화번호</th>
          <td>{{ state.testData.center_detail_officenumber }}</td>
        </tr>
        <tr>
          <th>주소</th>
          <td>{{ state.testData.center_detail_address }}</td>
        </tr>
        <tr>
          <th>전화번호</th>
          <td>{{ state.testData.center_detail_phone }}</td>
        </tr>
        <tr>
          <th>팩스번호</th>
          <td>{{ state.testData.center_detail_fax }}</td>
        </tr>
        <tr>
          <th>반수</th>
          <td>{{ state.testData.center_detail_roomcount }}</td>
        </tr>
        <tr>
          <th>반면적</th>
          <td>{{ state.testData.center_detail_roomsize }}</td>
        </tr>
        <tr>
          <th>놀이터수</th>
          <td>{{ state.testData.center_detail_playgroundcount }}</td>
        </tr>
        <tr>
          <th>교사수</th>
          <td>{{ state.testData.center_detail_teachercount }}</td>
        </tr>
        <tr>
          <th>정원</th>
          <td>{{ state.testData.center_detail_regularperson }}</td>
        </tr>
        <tr>
          <th>현원</th>
          <td>{{ state.testData.center_detail_currentperson }}</td>
        </tr>
        <tr>
          <th>위도</th>
          <td>{{ state.testData.center_detail_Latitude }}</td>
        </tr>
        <tr>
          <th>경도</th>
          <td>{{ state.testData.center_detail_longitude }}</td>
        </tr>
        <tr>
          <th>차량운영여부</th>
          <td>{{ state.testData.center_detail_vehicle }}</td>
        </tr>
        <tr>
          <th>홈페이지주소</th>
          <td>{{ state.testData.center_detail_hompage }}</td>
        </tr>
        <tr>
          <th>설립일자</th>
          <td>{{ state.testData.center_detail_establish }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <br />
  <div>
    <!-- <v-btn @click="getData">유치원 데이터 가져오기</v-btn> -->
    <v-row v-if="data.kinderInfo">
      <v-col cols="12">
        <ul v-if="data.kinderInfo.length > 0">
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
  </div>
  <br />
  <div id="app">
    <v-btn class="kakao-share" @click="kakaoShare">카카오 공유하기</v-btn>
  </div>
</template>


<script>
import { reactive } from "vue";
import axios from "axios";

export default {
  name: "App",
  components: {},
  setup() {
    var serverUrl = process.env.VUE_APP_SERVER_URL;

    const kakaoShare = () => {
      window.Kakao.Share.sendCustom({
        templateId: 92638,
        // 카카오톡이 설치 되지 않았을때 마켓으로 이동
        installTalk: true,
      });
    };

    const data = reactive({
      kinderInfo: [],
      response: "",
    });

    const state = reactive({
      center_num: "1",
      testData: null,
    });

    const getDetailData = () => {
      axios
        .get(`${serverUrl}/kindergartendetail/${state.center_num}/detail`)
        .then((response) => {
          state.testData = response.data;
          console.log(state.testData);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const getData = () => {
      axios
        .get(
          "/api?key=" +
            process.env.VUE_APP_KINDERGARTEN_API_KEY +
            "&sidoCode=27&sggCode=27140"
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

    getDetailData();

    return {
      kakaoShare,
      state,
      getDetailData,
      testData: state.testData,
      getData,
      data,
    };
  },
};
</script>

<style scored>
* {
  margin: 0;
  padding: 0;
}

.kakao-share {
  width: 150px;
  height: 100px;
  line-height: 50px;
  color: black;
  text-align: center;
  background: #ffe812;
  font-size: 12px;
  cursor: pointer;
}
</style>

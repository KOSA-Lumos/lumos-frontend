<template>
  <div v-if="state.testData">
    <v-table density="compact">
      <tbody >
        <tr>
          <th>센터번호</th>
          <td>{{ state.testData.center_num }}</td>
        </tr>
        <tr>
          <th>어린이집/유치원명</th>
          <td>{{ state.testData.center_detail_name }}</td>
        </tr>
        <tr>
          <th>시, 도</th>
          <td>{{ state.testData.center_detail_state }}</td>
        </tr>
        <tr>
          <th>시, 군, 구</th>
          <td>{{ state.testData.center_detail_city }}</td>
        </tr>
        <tr>
          <th>국공립, 민간, 직장</th>
          <td>{{ state.testData.center_detail_classification }}</td>
        </tr>
        <tr>
          <th>센터개소여부</th>
          <td>{{ state.testData.center_detail_centeropen }}</td>
        </tr>
        <tr>
          <th>교육청센터번호</th>
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
          <td>
            <a v-bind:href="state.testData.center_detail_hompage" target="_blank">{{
              state.testData.center_detail_hompage
            }}</a>
          </td>
        </tr>
        <tr>
          <th>설립일자</th>
          <td>{{ state.testData.center_detail_establish }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <br />
  <br />
  <div id="kakaoshare" class="text-center">
    <v-btn class="kakao-share" @click="kakaoShare">카카오 공유하기</v-btn>
  </div>
</template>


<script>
import { reactive, onMounted } from "vue";
import axios from "axios";
import store from "@/store";

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
      center_num: null,
      testData: null,
    });

    onMounted(() => {
      state.center_num = store.getters.getClickedCenter.centerNum;
      console.log(store.getters.getClickedCenter.centerNum);
      getDetailData();
    });

    const getDetailData = () => {
      axios
        .get(`${serverUrl}/kindergartendetail/${state.center_num}/detail`)
        .then((response) => {
          state.testData = response.data;
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
  tbody th {
    width: 300px;
  }

#kakaoshare {
  display: flex;
  justify-content: center;
  align-items: center;
}

.kakao-share {
  width: 150px;
  height: 100px;
  line-height: 20px;
  color: black;
  text-align: center;
  background: #ffe812;
  font-size: 15px;
  cursor: pointer;
}
</style>

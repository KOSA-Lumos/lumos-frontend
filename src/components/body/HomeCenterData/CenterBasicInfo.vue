<template>
  <div>
    <v-table v-if="state.testData">
      <thead>
        <tr>
          <th>센터번호</th>
          <th>어린이집유치원명</th>
          <th>어린이집유치원여부</th>
          <th>시도</th>
          <th>시군구</th>
          <th>설립유형</th>
          <th>연장보육여부</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ state.testData.center_num }}</td>
          <td>{{ state.testData.center_name }}</td>
          <td>{{ state.testData.center_category }}</td>
          <td>{{ state.testData.center_state }}</td>
          <td>{{ state.testData.center_city }}</td>
          <td>{{ state.testData.center_type }}</td>
          <td v-if="state.testData.center_extendcare === true">O</td>
          <td v-else>X</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";
import { useStore } from 'vuex'; // Vuex store를 사용하기 위해 추가
import Centerinfo from '../../../store/modules/Centerinfo.js'

export default {
  setup() {
    var serverUrl = process.env.VUE_APP_SERVER_URL;

    const state = reactive({
      center_num: "1",
      testData: null,
    });

    const store = useStore(); // Vuex store를 가져옴

    const getTestData = () => {
      axios
        .get(
          `${serverUrl}/kindergartendetail/${state.center_num}/information`
        )
        .then((response) => {
          state.testData = response.data;
          store.commit('Centerinfo/setNormalInfo', response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getTestData();

    return {
      state,
      getTestData,
      Centerinfo,
      testData: state.testData,
    };
  },
};

</script>
<template>
  <div>
    <v-table v-if="state.testData">
      <thead>
        <tr>
          <th>센터번호</th>
          <th>어린이집/유치원명</th>
          <th>어린이집/유치원</th>
          <th>시, 도</th>
          <th>시, 군, 구</th>
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

export default {
  setup() {
    var serverUrl = process.env.VUE_APP_SERVER_URL;

    const state = reactive({
      center_num: "1",
      testData: null,
    });

    const getTestData = () => {
      axios
        .get(
          `${serverUrl}/kindergartendetail/${state.center_num}/information`
        )
        .then((response) => {
          state.testData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getTestData();

    return {
      state,
      getTestData,
      testData: state.testData,
    };
  },
};

</script>


// vuestore에서 usernumber갖고오기
// import { reactive, computed } from "vue";
// import axios from "axios";
// import { useStore } from "vuex"; // Import the useStore function from vuex

// export default {
//   setup() {
//     var serverUrl = process.env.VUE_APP_SERVER_URL;

//     const store = useStore(); // Access the Vuex store

//     const state = reactive({
//       testData: null,
//     });

//     const getTestData = () => {
//       axios
//         .get(`${serverUrl}/kindergartendetail/${store.state.center_num}/information`) // Use store.state.center_num instead of state.center_num
//         .then((response) => {
//           state.testData = response.data;
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     };

//     getTestData();

//     return {
//       state,
//       getTestData,
//       testData: state.testData,
//     };
//   },
// };


<template>
  <div>
    <v-table v-if="state.testData">
      <thead>
        <tr>
          <th>어린이집명</th>
          <th>등급</th>
          <th>보육과정 및 상호작용</th>
          <th>보육환경 및 운영관리</th>
          <th>건강·안전</th>
          <th>교직원</th>
          <th>평가일자</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ state.testData.center_name }}</td>
          <td>{{ state.testData.childcare_eval_grade }}</td>
          <td>{{ state.testData.childcare_eval_communication }}</td>
          <td>{{ state.testData.childcare_eval_environment }}</td>
          <td>{{ state.testData.childcare_eval_safety }}</td>
          <td>{{ state.testData.childcare_eval_teacher }}</td>
          <td>{{ state.testData.childcare_eval_date }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <div>
    <canvas ref="myChart"></canvas>
  </div>
</template> 



<script>
import { reactive, ref, onMounted } from "vue";
import Chart from "chart.js/auto";
import axios from "axios";

export default {
  setup() {
    var serverUrl = process.env.VUE_APP_SERVER_URL;

    const state = reactive({
      center_num: "1",
      testData: null,
    });

    const getGradeData = () => {
      axios
        .get(`${serverUrl}/kindergartendetail/${state.center_num}/grade`)
        .then((response) => {
          state.testData = response.data;
          console.log(state.testData);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const myChart = ref(null);

    onMounted(() => {
      const ctx = myChart.value.getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "등급",
            "보육과정 및 상호작용",
            "보육환경 및 운영관리",
            "건강·안전",
            "교직원",
          ],
          datasets: [
            {
              label: "A(우수)",
              data: [74, 93, 95, 84, 90],
              backgroundColor: "#F78181",
              barThickness: 50,
            },
            {
              label: "B(적합)",
              data: [20, 5, 4, 14, 7],
              backgroundColor: "#F7BE81",
              barThickness: 50,
            },
            {
              label: "C(개선필요)",
              data: [5, 2, 1, 2, 3],
              backgroundColor: "#BCF5A9",
              barThickness: 50,
            },
            {
              label: "D(미달)",
              data: [1],
              backgroundColor: "#58D3F7",
              barThickness: 50,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              position: "right",
            },
            title: {
              display: true,
              text: "어린이집평가 전체 평균",
            },
          },
        },
      });
    });

    getGradeData();

    return {
      myChart,
      state,
      getGradeData,
      testData: state.testData,
    };
  },
};
</script>
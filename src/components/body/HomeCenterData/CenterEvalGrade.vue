<template>
  <div>
    <v-table v-if="state.testData">
      <thead>
        <tr>
          <th>상호명</th>
          <th>등급</th>
          <th>보육과정 및 상호작용</th>
          <th>보육환경 및 운영관리</th>
          <th>건강 및 안전</th>
          <th>교직원</th>
          <th>평가 년.월</th>
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
    <canvas id="myChart" ref="myChart" style="height: 500px;"></canvas>
  </div>
</template> 



<script>
import { reactive, ref } from "vue";
import Chart from "chart.js/auto";
import axios from "axios";

export default {
  setup() {
    var serverUrl = process.env.VUE_APP_SERVER_URL;

    const state = reactive({
      center_num: "1",
      testData: {},
    });

    const getGradeData = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/kindergartendetail/${state.center_num}/grade`
        );
        state.testData = response.data;
        getScoreByGrade();
        getCommunication();
        getEnvironment();
        getSafety();
        getTeacher();
        renderChart();
      } catch (error) {
        console.log(error);
      }
    };

    const myChart = ref(null);

    const getScoreByGrade = () => {
      if (state.testData !== null) {
        const grade = state.testData.childcare_eval_grade;
        if (grade === "A") {
          return 65;
        } else if (grade === "B") {
          return 17;
        } else if (grade === "C") {
          return 4;
        } else if (grade === "D") {
          return 1;
        } else {
          return 0;
        }
      }
      return 0;
    };

    const getCommunication = () => {
      if (state.testData !== null) {
        const grade = state.testData.childcare_eval_communication;
        if (grade === "우수") {
          return 53;
        } else if (grade === "보통") {
          return 6;
        } else if (grade === "개선필요") {
          return 1;
        } else {
          return 0;
        }
      }
      return 0;
    };

    const getEnvironment = () => {
      if (state.testData !== null) {
        const grade = state.testData.childcare_eval_environment;
        if (grade === "우수") {
          return 55;
        } else if (grade === "보통") {
          return 3;
        } else if (grade === "개선필요") {
          return 1;
        } else {
          return 0;
        }
      }
      return 0;
    };

    const getSafety = () => {
      if (state.testData !== null) {
        const grade = state.testData.childcare_eval_safety;
        if (grade === "우수") {
          return 60;
        } else if (grade === "보통") {
          return 10;
        } else if (grade === "개선필요") {
          return 1;
        } else {
          return 0;
        }
      }
      return 0;
    };

    const getTeacher = () => {
      if (state.testData !== null) {
        const grade = state.testData.childcare_eval_teacher;
        if (grade === "우수") {
          return 55;
        } else if (grade === "보통") {
          return 7;
        } else if (grade === "개선필요") {
          return 1;
        } else {
          return 0;
        }
      }
      return 0;
    };

    const renderChart = () => {
      const ctx = myChart.value.getContext("2d");
      const datasets = [
        {
          label: "현 어린이집 등급위치",
          data: [
            {
              x: "등급",
              y: getScoreByGrade(state.testData.childcare_eval_grade)
            },
            { x: "보육과정 및 상호작용",
              y: getCommunication(state.testData.childcare_eval_communication) 
            },
            { x: "보육환경 및 운영관리",
              y: getEnvironment(state.testData.childcare_eval_environment) 
            },
            { x: "건강·안전",
              y: getSafety(state.testData.childcare_eval_safety) 
            },
            { x: "교직원",
              y: getTeacher(state.testData.childcare_eval_teacher) 
            },
          ],
          type: "scatter",
          backgroundColor: "#000000",
          pointRadius: 8,
        },
        {
          label: "D(미달)",
          data: [1],
          backgroundColor: "#58D3F7",
          barThickness: 50,
        },
        {
          label: "C(개선필요)",
          data: [5, 2, 1, 2, 3],
          backgroundColor: "#BCF5A9",
          barThickness: 50,
        },
        {
          label: "B(적합)",
          data: [20, 5, 4, 14, 7],
          backgroundColor: "#F7BE81",
          barThickness: 50,
        },
        {
          label: "A(우수)",
          data: [74, 93, 95, 84, 90],
          backgroundColor: "#F78181",
          barThickness: 50,
        },
      ];

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
          datasets: datasets,
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
    };

    getGradeData();

    return {
      myChart,
      state,
      getGradeData,
      renderChart,
      testData: state.testData,
    };
  },
};
</script>

<style scoped>
.myChart{
  height: 1000px;
}
</style>
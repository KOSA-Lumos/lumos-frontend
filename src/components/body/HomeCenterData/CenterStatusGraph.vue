<template>
  <div>
    <canvas ref="myChart"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from 'vue';
import Chart from 'chart.js/auto';
import axios from "axios";

export default {
  name: 'DataGraph',
  setup() {
    var serverUrl = process.env.VUE_APP_SERVER_URL;

    const myChart = ref(null);

    const state = reactive({
      center_num: "1",
      testData: null,
    });

    const getDetailData = () => {
      axios
        .get(`${serverUrl}/kindergartendetail/${state.center_num}/detail`)
        .then((response) => {
          state.testData = response.data;
          const ctx = myChart.value.getContext('2d');
          new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['방 개수', '선생님', '놀이터개수', '정원', '현원'],
              datasets: [
                {
                  label: '전체 평균',
                  data: [4.8, 9.7, 0.65, 48.8, 32],
                  borderWidth: 1
                },
                {
                  label: state.testData.center_detail_name,
                  data: [
                    state.testData.center_detail_roomcount,
                    state.testData.center_detail_teachercount,
                    state.testData.center_detail_playgroundcount,
                    state.testData.center_detail_regularperson,
                    state.testData.center_detail_currentperson,
                  ],
                  borderWidth: 1
                }
              ]
            },
            options: {
              maintainAspectRatio: true,
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    onMounted(() => {
      getDetailData();
    });

    return { myChart };
  }
}
</script>

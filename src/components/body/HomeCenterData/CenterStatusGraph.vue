<template>
  <v-container>
    <h1>센터 상태그래프</h1>
    <p>아래는 내용 출력</p>
  
    <div style="height: 500px;">
      유
      <canvas ref="myChart"></canvas>
    </div>

  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

export default {
  setup() {
    const myChart = ref(null);

    onMounted(() => {
      const ctx = myChart.value.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['현원', 'CCTV수', '몰라', '몰라2', '몰라3', '몰라4'],
          datasets: [
            {
              label: '전체 평균',
              data: [12, 19, 3, 5, 2, 3],
              borderWidth: 1
            },
            {
              label: 'ABC어린이집',
              data: [10, 7, 4, 8, 15, 12],
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });

    return { myChart };
  }
}
</script>

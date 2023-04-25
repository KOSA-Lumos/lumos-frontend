<template>
  <div>
    <canvas ref="myChart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  mounted() {
    this.$nextTick(() => {
      const ctx = this.$refs.myChart.getContext('2d')
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
            label: 'Sales',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        },
        options: {}
      })
    })
  }
}

</script>

<style scoped>

</style>
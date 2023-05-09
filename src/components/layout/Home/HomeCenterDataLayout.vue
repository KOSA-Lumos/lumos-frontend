<template>
  <div>
    <v-card style="min-height: 350px">

      <v-tabs
        fixed-tabs
        v-model="tab"
        bg-color="yellow-lighten-4"
      >
        <v-tab :value="1">기본정보</v-tab>
        <v-tab :value="2">상세정보</v-tab>
        <v-tab :value="3">평가등급</v-tab>
        <v-tab :value="4">비교그래프</v-tab>
        <v-tab :value="5">식단추천</v-tab>
        <v-tab :value="6">AI분석</v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item v-for="n in 6" :key="n" :value="n">

          <v-container fluid v-if="n === 1">
            <center-basic-info />
          </v-container>

          <v-container fluid v-if="n === 2">
            <center-detail-info />
          </v-container>

          <v-container fluid v-if="n === 3">
            <center-eval-grade />
          </v-container>

          <v-container fluid v-if="n === 4">
            <center-status-graph />
          </v-container>

          <v-container fluid v-if="n === 5">
            <center-good-meal />
          </v-container>

          <v-container fluid v-if="n === 6">
            <center-ai-review />
          </v-container>
          
        </v-window-item>

      </v-window>

    </v-card>
  </div>
</template>

<script>
import CenterBasicInfo from '@/components/body/HomeCenterData/CenterBasicInfo.vue'
import CenterDetailInfo from '@/components/body/HomeCenterData/CenterDetailInfo.vue'
import CenterEvalGrade from '@/components/body/HomeCenterData/CenterEvalGrade.vue'
import CenterGoodMeal from '@/components/body/HomeCenterData/CenterGoodMeal.vue'
import CenterStatusGraph from '@/components/body/HomeCenterData/CenterStatusGraph.vue'
import CenterAiReview from '@/components/body/HomeCenterData/CenterAiReview.vue'

export default {
  components: {CenterBasicInfo, CenterDetailInfo, CenterEvalGrade, CenterGoodMeal, CenterStatusGraph, CenterAiReview},
  data: () => ({
    tab: null,
  }),

}
</script>

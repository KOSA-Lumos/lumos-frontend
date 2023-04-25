<template>
  <div>
    <div class="buttons">
      <router-link to="/normalinfo"> 기본정보 </router-link>
      <router-link to="/gradeeval"> 등급평가 </router-link>
      <router-link to="/detailinfo"> 상세정보 </router-link>
      <router-link to="/reviewresult"> 리뷰분석결과 </router-link>
      <router-link to="/datagraph"> 데이터비교 </router-link>
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
</script>


<style scoped>
</style>
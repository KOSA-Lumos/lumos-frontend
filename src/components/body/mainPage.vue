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
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
  background-size: flex;
  height: 20%;
  width: 100%;
  margin-bottom: 20px;
}

.buttons a {
  margin-right: 10px;
  background-color: #ffd600;
}
</style>
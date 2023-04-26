<template>
  <div>
    <div class="buttons">
      <router-link to="/child/normalinfo"> 기본정보 </router-link>
      <router-link to="/child/gradeeval"> 등급평가 </router-link>
      <router-link to="/child/detailinfo"> 상세정보 </router-link>
      <router-link to="/child/reviewresult"> 리뷰분석결과 </router-link>
      <router-link to="/child/datagraph"> 데이터비교 </router-link>
    </div>
        <div class="buttons" v-if="sdf">
      <router-link to="/child/kidsnormalinfo"> (유)기본정보 </router-link>
      <router-link to="/child/kidsgradeeval"> (유)등급평가 </router-link>
      <router-link to="/child/kidsdetailinfo"> (유)상세정보 </router-link>
      <router-link to="/child/kidsreviewresult"> (유)리뷰분석결과 </router-link>
      <router-link to="/child/kidsdatagraph"> (유)데이터비교 </router-link>
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LastChangeMethods',
  props: {
    sdf: {
      type: Boolean,
      default: false
    }
  },
}
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
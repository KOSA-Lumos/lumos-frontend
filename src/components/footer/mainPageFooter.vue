<template>
  <div class="normalInfo">
    <div class="info">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
    </div>
    <div class="buttons">
      <router-link to="/detailGrade">등급평가 </router-link>
      <router-link to="/footerMeals">식단표 </router-link>
      <router-link to="/footerPictures">사진 </router-link>
      <router-link to="/footerCctv">CCTV </router-link>
      <router-link to="/detailView">상세보기 </router-link>
    </div>
    <div>
    <router-view/>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const title = "기본정보";

    const description = "ABC 어린이집";

    return { title, description };
  },
});
</script>


<style>
.normalInfo {
  display: flex;
  flex-direction: row;
  height: 80%;
  width: 100vw;
}

.info {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f7f7f7;
  height: 100%;
  width: 20%;
}

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
  background-color: #FFD600;
}
</style>

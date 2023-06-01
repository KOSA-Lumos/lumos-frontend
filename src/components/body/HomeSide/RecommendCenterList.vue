<template>
  <div>
    <!-- <h1>위치 설정하기</h1>
    <p>시군구 입력 후 검색어 입력</p>
    <v-divider></v-divider> -->
    
    <v-row>
      <v-col cols="9">
        <v-text-field v-model="clickAddress"></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-btn @click="recommendCenters()" icon="mdi-magnify"></v-btn>
      </v-col>
    </v-row>
    
    <v-divider></v-divider>

    <div v-for="rcmdCenter in recommendedCenters"
      :key="rcmdCenter.centerNum"
      @click="displayClickedCenterDetail(rcmdCenter)">
      <h2>{{ rcmdCenter.centerName }}</h2>
      <p>
        번호:{{ rcmdCenter.centerNum }} | 
        공석:{{ rcmdCenter.centerDetailRegularperson - rcmdCenter.centerDetailCurrentperson }} | 
        차량:{{ rcmdCenter.centerDetailVehicle }} | 
        연장:
          <span v-if="rcmdCenter.centerExtendcare === 0">X</span>
          <span v-if="rcmdCenter.centerExtendcare === 1">O</span>
      <!-- 찜하기  -->
      <v-icon @click="addFavoriteCenter(rcmdCenter.centerNum)" :color="isFavorite.includes(rcmdCenter.centerNum) ? 'yellow-darken-1' : 'grey-lighten-2'">mdi-star</v-icon>

      </p>
      <v-divider />
    </div>

  </div>
</template>

<script>
// import axios from 'axios';
// import store from '@/store';
export default {
  data() {
    return {
      myPosition: "서울특별시 종로구",
      isFavorite: []
    };
  },
  computed: {
    recommendedCenters() {
      return this.$store.getters.getRecommendedCenters;
    },
    clickAddress() {
      return this.$store.getters.getClickAddress;
    },
    clickPosition() {
      return this.$store.getters.getClickPosition;
    },
    clickAddressState() {
      return this.$store.getters.getClickAddressState;
    },
    clickAddressCity() {
      return this.$store.getters.getClickAddressCity;
    }
  },
  created() {
    // 로컬 스토리지에서 찜한 목록을 가져옴
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
      this.isFavorite = JSON.parse(favorites);
    }
  },

  methods: {
    // 상호명 검색
    recommendCenters() {
      console.log("@@ recommendCenters 실행");

      let cPosition = this.clickPosition;
      let cAddressState = this.clickAddressState;
      let cAddressCity = this.clickAddressCity;

      let serverUrl = process.env.VUE_APP_SERVER_URL;
      this.$axios
        .get(
          `${serverUrl}/searchMap/center/list/address`,
          {
            // Get 요청에서는 data 옵션이 아니라 params(Query Parameter)를 사용한다.
            params: {
              centerState: cAddressState,
              centerCity: cAddressCity,
              centerLatitude: cPosition[0],
              centerLongitude: cPosition[1],
            },
          }
        )
        .then((response) => {
          console.log("@@@ axios 성공", response);
          this.$store.dispatch('setRecommendedCenters', response.data);
        })
        .catch((error) => {
          console.log("@@@ axios 실패");
          console.log(error);
        });
    },
    // 리스트에서 보육시설 클릭 시 실행
    displayClickedCenterDetail(scdCenter) {
      // console.log("@@ displayClickedCenterDetail 실행");
      this.$store.dispatch('setClickedCenter', scdCenter);
    },

    // // 찜하기
    // addFavoriteCenter(centerNum){
    //   const url= process.env.VUE_APP_SERVER_URL + '/searchMap/favorite';
    //   const data= {
    //     centerNum: centerNum,
    //     userId : this.$store.getters.getUserId,
    //   }
    //   console.log("test");
    //   console.log(data);
    //   this.$axios.post(url, data)
    //    .then((response) => {
    //     console.log("~~ addFavoriteCenter 성공 ~~", response);
    //   })
    //   .catch((error) => {
    //     console.log("~~ addFavoriteCenter 실패 ~~");
    //     console.log(error);
    //   });
    // }

addFavoriteCenter(centerNum) {
  const url = process.env.VUE_APP_SERVER_URL + '/searchMap/favorite';
  const data = {
    centerNum: centerNum,
    userId: this.$store.getters.getUserId,
  }

  // 이미 찜하기가 눌린 상태인지 확인
  const isFavorite = this.isFavorite.includes(centerNum);

  if (isFavorite) {
    // 이미 찜하기가 눌린 상태이므로 삭제 요청을 보냄
    this.$axios.post(url, data)
    // this.$axios.post(url, { data: data })
      .then((response) => {
        console.log("~~ deleteFavoriteCenter 성공 ~~", response);
        // 찜하기 목록에서 삭제된 centerNum을 제거
        const index = this.isFavorite.indexOf(centerNum);
        if (index > -1) {
          this.isFavorite.splice(index, 1);
        }
        // 로컬 스토리지에서 찜한 목록 업데이트
        localStorage.setItem('favorites', JSON.stringify(this.isFavorite));
      })
      .catch((error) => {
        console.log("~~ deleteFavoriteCenter 실패 ~~");
        console.log(error);
      });
  } else {
    // 찜하기 추가 요청을 보냄
    this.$axios.post(url, data)
      .then((response) => {
        console.log("~~ addFavoriteCenter 성공 ~~", response);
        // 찜하기 목록에 centerNum을 추가
        this.isFavorite.push(centerNum);
        // 로컬 스토리지에서 찜한 목록 업데이트
        localStorage.setItem('favorites', JSON.stringify(this.isFavorite));
      })
      .catch((error) => {
        console.log("~~ addFavoriteCenter 실패 ~~");
        console.log(error);
      });
  }
},

  },
}
</script>

<style>
.star-icon {
  color: yellow;
  stroke: yellow;
  stroke-width: 1px;
}
</style>

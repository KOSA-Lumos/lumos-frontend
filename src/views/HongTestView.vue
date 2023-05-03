<template>
  <v-container>
    <h1>Hong 테스트 페이지</h1>
    <p>여기에 기능 구현</p>
        <v-btn v-if="!loginUser" color="black" variant="text" class="mx-2" rounded="xl" @click="moveTo('/login')">Login</v-btn>
        <v-btn v-else color="black" variant="text" class="mx-2" rounded="xl" @click="logout">Logout</v-btn>
  </v-container>

  
</template>

<script>

export default {
  data: () => ({
    
  }),
  computed: {
    loginUser(){
      console.log("~~사용자인증 성공^ㅁ^~~");
      return this.$store.getters.loginUser;

    }
  },
  
  methods: {
    moveTo (url) {
      console.log('@@ moveTo(' + url + ')')
      this.$router.push(`${url}`);
    },
    logout(){
      this.$store.commit('logout');
      this.$router.push('/');
    }
  }
}
</script>

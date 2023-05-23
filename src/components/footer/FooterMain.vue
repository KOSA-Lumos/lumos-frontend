<template>
  <v-footer class="bg-blue-grey-darken-3">

    <v-row justify="center" no-gutters>

      <v-col class="text-center" cols="12">
        <v-btn color="white" variant="text" class="mx-2" rounded="xl" @click="moveTo('/')">Home</v-btn>
        <v-btn v-if="!loginUser" color="white" variant="text" class="mx-2" rounded="xl" @click="moveTo('/login')">Login</v-btn>
        <v-btn v-else color="white" variant="text" class="mx-2" rounded="xl" @click="logout">Logout</v-btn>
        <v-btn color="white" variant="text" class="mx-2" rounded="xl" @click="moveTo('/yunittest')">YunitTest</v-btn>
        <v-btn color="white" variant="text" class="mx-2" rounded="xl" @click="moveTo('/jeongtest')">JeongTest</v-btn>
        <v-btn color="white" variant="text" class="mx-2" rounded="xl" @click="moveTo('/hongtest')">HongTest</v-btn>
            <!-- ShareThis BEGIN -->
  <div class="sharethis-inline-share-buttons"></div>
  <!-- ShareThis END -->
      </v-col>

      <v-col class="text-center mt-4" cols="12">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
      
    </v-row>

  </v-footer>
</template>

<script>

export default {
  data: () => ({
    
  }),
  computed: {
    loginUser(){
      console.log("~~로그인 유무 확인~~");
      console.log(this.$store.getters.loginUser);
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

<style scoped>

</style>
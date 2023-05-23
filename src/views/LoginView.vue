<template>
  <v-app id="inspire">
    <v-main class="blue-grey lighten-4">
      <v-container class="loginPage-container" fill-height>
        <!-- <v-layout align-center row wrap> -->
          <v-flex xs12>
            <v-card>
              <div class="pa-10">
                <h1 style="text-align: center" class="mb-10">Login</h1>
                <form>
                  <v-text-field v-model="loginData.userId" label="ID" prepend-inner-icon="mdi-account"></v-text-field>
                  <v-text-field v-model="loginData.userPw" prepend-inner-icon="mdi-lock" type="password" label="Password"></v-text-field>
                  <v-btn @click="login" color="orange darken-2 text-capitalize" depressed large block dark class="mb-3">Login</v-btn>
                  <v-btn @click="regist" color="orange darken-2 text-capitalize" depressed large block dark>Sign Up</v-btn>
                  <v-btn @click="kakaoLogin" color="yellow darken-2 text-capitalize" depressed large block dark>카카오로그인</v-btn>
                </form>
              </div>
            </v-card>
          </v-flex>
        <!-- </v-layout> -->
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { ref, reactive } from "vue";
import axios from 'axios';
import { useRouter } from 'vue-router';
import store from '@/store';

export default {
  name: "loginPage",
  components: {},
  setup() {
    let kakao_account = ref(null);
    const router = useRouter()

    // 동의를 받음
    function kakaoLogin(){
       window.Kakao.Auth.login({
          scope:'account_email',
          success:getKakaoAcount
      });
    }
    function regist() {
        router.push('/signUp');
    }
    
    function getKakaoAcount(){
      console.log("test");
      window.Kakao.API.request({
      url:'/v2/user/me',
      success: res=>{
        // const kakao_account = res.kakao_account;
        const userId = res.kakao_account.email;
        console.log(res)
        store.dispatch("setUserId", userId) // -> store.commit("mutSetUSerId", userId)
        console.log('kakao_account', kakao_account);
        console.log("로그인성공");
        //axios로 spring에 요청
        // 회원가입시킬지, 로그인시킬지 spirng 에서 db에 검사해서 확인한뒤
                  // 요청을 보낼 주소, 지금은 우리 스프링 주소로 보냄
          axios.get("http://localhost:8080"+`/springweb/user/kakaoLogin`, {
          params : {
            // key : value
            userId : userId
          },
        }) // API 경로와 필요한 데이터를 전달 
        .then(res => {
          console.log(res.data);
          if (res.data.userId == null) {
            console.log(store.getters.getUserId)
            router.push('/signUp');
            console.log("회원가입페이지로 보내기")
          } else {
            router.push('/');
            console.log('메인페이지로 보내기')
          }
          console.log(res.data.userId);
          console.log("카카오 로그인 API 호출 성공");
        })
        .catch(err => {
          console.log("카카오 로그인 API 호출 실패", err);
        });

      }

      })
    }

    const loginData = reactive({
      userId : '',
      userPw : ''
    })
      // const userId ='';
      // const userPw ='';

    function login(){
      var serverUrl = process.env.VUE_APP_SERVER_URL;
      console.log(loginData.userId)
      axios.get(`${serverUrl}/user/login`,{
        params : {
          userId : loginData.userId,
          userPw : loginData.userPw
        },
      })
      .then((res)=>{
        if (res.data == "") {
          console("유저없음")
          // alert("존재하지 않는 회원입니다.");
        } else {
          store.getters.changeLoginUser;
          console.log("~~로그인 성공^ㅁ^~~");
          console.log(res);
        }
        if (res.data.adminYn == "Y") { 
          router.push('/hongtest'); 
        } else { 
          router.push('/'); 
        }
         
      })
      .catch((err)=>{
        console.log("~~로그인 실패-ㅁ-~~");
        console.log(err);
      })
    }

    function logout(){

    }


    return {
      kakaoLogin,
      kakao_account,
      regist,
      login,
      loginData,
      logout
      
      
    };
  },
};
</script>

<style scoped>
.loginPage-container {
  width: 500px;
  margin-top:100px;
}
.kakaoLogin-button {
  width: 150px;
  height: 40px;
  line-height: 50px;
  color: black;
  text-align: center;
  background: #ffe812;
  font-size: 12px;
  cursor: pointer;
}

</style>


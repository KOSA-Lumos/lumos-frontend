 <template>
  <v-sheet width="300" class="mx-auto">
  <v-form v-model="valid" ref="form">
    <v-text-field v-model="signUpData.userId" :rules="userIdRules" label="" ></v-text-field>
    <v-text-field v-model="signUpData.userPw" :rules="userPwRules" type="password" label="비밀번호"></v-text-field>
    <v-text-field v-model="signUpData.userPwConfirm" :rules="userPwConfirmRules" type="password" label="비밀번호 확인"></v-text-field>
    <v-text-field v-model="signUpData.userName" :rules="userNameRules" label="이름"></v-text-field>
    <v-text-field v-model="signUpData.nickname" :rules="nicknameRules" label="닉네임"></v-text-field>
    <v-text-field v-model="signUpData.phone" :rules="phoneRules" label="연락처"></v-text-field>
    <v-text-field v-model="signUpData.userAddress" :rules="userAddressRules" label="주소"></v-text-field>
    <v-btn color="primary" @click="submit">회원가입</v-btn>
  </v-form>
  </v-sheet>
</template>

<script>
import { reactive, ref  } from "vue";
import {} from "vue";
import store from '@/store';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name : "signUpView",
  setup(){
    // let kakao_account = ref(null);
    const router = useRouter()
    
    const kakao_account = ref(null);
    
    const signUpData = reactive({
      userId: store.getters.getUserId,
      // userId: '',
      userPw: '',
      userPwConfirm: '',
      userName: '',
      nickname: '',
      phone: '',
      userAddress: '',
      userIdRules: [
        v => !!v || '아이디는 필수 입력사항입니다.',
        v => (v && v.length >= 4) || '아이디는 4글자 이상이어야 합니다.',
      ],
      userPwRules: [
        v => !!v || '비밀번호는 필수 입력사항입니다.',
        v => (v && v.length >= 8) || '비밀번호는 8글자 이상이어야 합니다.',
      ],
      userPwConfirmRules: [
        v => !!v || '비밀번호 확인은 필수 입력사항입니다.',
        v => (v && v === signUpData.password) || '비밀번호가 일치하지 않습니다.',
      ],
      nameRules: [
        v => !!v || '이름은 필수 입력사항입니다.',
      ],
      nicknameRules: [
        v => !!v || '닉네임은 필수 입력사항입니다.',
      ],
      phoneRules: [
        v => !!v || '연락처는 필수 입력사항입니다.',
      ],
      addressRules: [
        v => !!v || '주소는 필수 입력사항입니다.',
      ],
    })


    function submit(){
      // var serverUrl = process.env.VUE_APP_SERVER_URL;
      // this.$axios
        axios.post(
          "http://localhost:8080/springweb/user/signup",
          // `${serverUrl}/user/signup`,
          {
            userId:signUpData.userId,
            userPw:signUpData.userPw,
            userName:signUpData.userName,
            nickname:signUpData.nickname,
            phone:signUpData.phone,
            userAddress:signUpData.userAddress
          }
        )
        .then((res) => {
          console.log("회원가입하기 성공");
          console.log(res);
          router.push('/');
        })
        .catch((err) => {
          console.log("회원가입하기 실패");
          console.log(err);
        });
    }
  
    return {
      kakao_account,
      submit,
      valid: false,
      signUpData
      
    }
  }
}
</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
}


</style>


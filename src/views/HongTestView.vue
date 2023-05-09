<template>
  <v-table class="userList">
    <thead>
      <tr>
        <th>회원번호</th>
        <th>ID</th>
        <th>PW</th>
        <th>이름</th>
        <th>우편주소</th>
        <th>도로명</th>
        <th>상세주소</th>
        <th>닉네임</th>
        <th>전화번호</th>
        <th>Status</th>
        <th>Admin</th>
        <th>탈퇴</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in state.userList" :key="user.userNo">
        <td>{{ user.userNo }}</td>
        <td>{{ user.userId }}</td>
        <td>{{ user.userPw }}</td>
        <td>{{ user.userName }}</td>
        <td>{{ user.zonecode }}</td>
        <td>{{ user.roadAddress }}</td>
        <td>{{ user.detailAddress }}</td>
        <td>{{ user.nickname }}</td>
        <td>{{ user.phone }}</td>
        <td>{{ user.status }}</td>
        <td>{{ user.adminYn }}</td>
        <td>
          <v-btn @click="deleteUser(user.userId)" color="red" small depressed>
            탈퇴
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
<script>
import { onMounted, ref, reactive } from 'vue'
import axios from 'axios';

export default {
  components: {},
  setup() {
    const userList = ref([])
    const state = reactive({
      userList: null,
    });

    var serverUrl = process.env.VUE_APP_SERVER_URL;
    onMounted(async () => {
      try {
        const res = await axios.get(`${serverUrl}/user/all-user`);
        console.log('userList', res.data);
        state.userList = res.data;
      } catch (error) {
        console.log('error', error);
      }
    });

    const deleteUser = async (userId) => {
      try {
        const response = await axios.put(
          `${serverUrl}/user/set-user/${userId}`,
          {
            status: 'N'
          }
        );
        console.log('~~ 회원탈퇴 성공 ^ㅁ^ ~~', response.data);

        const res = await axios.get(`${serverUrl}/user/all-user`);
        console.log('userList', res.data);
        state.userList = res.data;

        // router.push('')
        
      } catch (err) {
        console.error(err);
        console.log('~~ 탈퇴 실패 ~ㅁ~ ~~', err);
      }
    };

    return {
      userList,
      state,
      deleteUser
    };
  },
};
</script>
<style scoped>
.userList {
  margin: 50px;
}
</style>
<template>
  <div class="login-container">
    <div class="logo">
      <img src="./assets/img/no-data.png" alt="Logo" />
    </div>
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="input-group">
        <label for="username">用户名</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="请输入用户名"
          required
        />
      </div>
      <div class="input-group">
        <label for="password">密码</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="请输入密码"
          required
        />
      </div>
      <button type="submit" class="login-button">登录</button>
    </form>
    <button class="login-button" @click="clickHandle">跳转</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();

const username = ref("");
const password = ref("");

const clickHandle = () => {
  router.push('/houseLoan');
}

const handleLogin = () => {
  router.push('/houseLoan');
  // router.push('/houseLoan');
  // if (username.value && password.value) {
  //   alert(`登录成功！\n用户名: ${username.value}`);
  //   // 这里可以添加登录逻辑，比如发送请求到服务器
  // } else {
  //   alert("请输入用户名和密码！");
  // }
};
</script>

<style scoped>
.login-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.logo img {
  width: 100px;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #0056b3;
}
</style>

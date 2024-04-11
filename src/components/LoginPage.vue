<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="submitForm" class="login-form">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" class="form-control" />
        <p v-if="!usernameValid" class="error-msg">Username cannot be empty.</p>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" class="form-control" />
        <p v-if="!passwordValid" class="error-msg">Password must be at least 8 characters long.</p>
      </div>
      <button type="submit" class="btn">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      username: '',
      password: '',
      usernameValid: true,
      passwordValid: true
    };
  },
  methods: {
    ...mapMutations([
      'setToken'
    ]),
    validateForm() {
      this.usernameValid = this.username.trim() !== '';
      this.passwordValid = this.password.length >= 8;
      return this.usernameValid && this.passwordValid;
    },
    async submitForm() {
      if (this.validateForm()) {
        try {
        const response = await axios.post('http://localhost/demotesting/API/Routes/routes.php', {
          username: this.username,
          password: this.password,
          action:'login'
        });
        if(response.status ==200){
            localStorage.setItem('token', response.data.token);
          this.setToken(response.data.token);
           this.$router.push('/upload')
          }
        console.log('Login successful', response);
      } catch (error) {
        console.error('Login failed', error);
      } finally {
        this.loggingIn = false;
      }
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.btn:hover {
  background-color: #0056b3;
}

.error-msg {
  color: red;
  margin-top: 5px;
  font-size: 14px;
}
</style>

<template>
  <div class="register-container">
    <h1>Register</h1>
    <form @submit.prevent="submitForm" class="register-form">
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
      <div class="form-group">
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" class="form-control" />
        <p v-if="!confirmPasswordValid" class="error-msg">Passwords do not match.</p>
      </div>
      <div class="form-group">
        <label for="mobile">Mobile:</label>
        <input type="text" id="mobile" v-model="mobile" class="form-control" />
        <p v-if="!mobileValid" class="error-msg">Mobile number must be 10 digits long.</p>
      </div>
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" class="form-control" />
        <p v-if="!nameValid" class="error-msg">Name cannot be empty.</p>
      </div>
      <button type="submit" class="btn">Register</button>
    </form>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="success" class="success">{{ success }}</div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      mobile: '',
      name: '',
      usernameValid: true,
      passwordValid: true,
      confirmPasswordValid: true,
      mobileValid: true,
      nameValid: true,
      error:'',
      success:''
    };
  },
  methods: {
    validateForm() {
      this.usernameValid = this.username.trim() !== '';
      this.passwordValid = this.password.length >= 8;
      this.confirmPasswordValid = this.confirmPassword === this.password;
      this.mobileValid = /^\d{10}$/.test(this.mobile);
      this.nameValid = this.name.trim() !== '';
      
      return (
        this.usernameValid &&
        this.passwordValid &&
        this.confirmPasswordValid &&
        this.mobileValid &&
        this.nameValid
      );
    },
    resetForm() {
      this.username = '';
      this.password = '';
      this.confirmPassword = '';
      this.mobile = '';
      this.name = '';
      this.usernameValid = true;
      this.passwordValid = true;
      this.confirmPasswordValid = true;
      this.mobileValid = true;
      this.nameValid = true;
    },
    async submitForm() {
      if (this.validateForm()) {
        try{
          const response = await axios.post('http://localhost/demotesting/API/Routes/routes.php', {
            username: this.username,
            password: this.password,
            confirmPassword: this.confirmPassword,
            mobile: this.mobile,
            name: this.name,
            action :'register'
          });
          console.log(response,'kk')
          if(response.status==200){
            this.resetForm();
             this.success = 'Form submitted!';
          }else{
            this.error = response.data
          }
        } catch (error) {
          console.error('Error submitting form:', error);
        }
       
      }
    }
  }
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.register-form {
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

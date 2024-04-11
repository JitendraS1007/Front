<template>
  <div class="container">
    <input type="file" @change="handleFileUpload" ref="fileInput" />
    <button @click="uploadFile">Upload</button>
    <div v-if="loading" class="loading">Uploading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="success" class="success">{{ success }}</div>
</div>
</template>

<script>
import axios from 'axios';


export default {
  data() {
    return {
      file: null,
      loading: false,
      error: '',
      success: '',
      token:''
    };
  },
   computed: {
      
  
  },
  created(){
      this.token = localStorage.getItem("token");
      if(this.token ==''){
        this.$router.push('/login')
      }
    },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    uploadFile() {
      if (!this.file) {
        this.error = 'Please select a file';
        return;
      }
      this.loading = true;
      const formData = new FormData();
     
      formData.append('file', this.file);
      formData.append('action', 'fileupload')
      formData.append('token', this.token)

      axios.post('http://localhost/demotesting/API/Routes/routes.php', formData)
        .then(response => {
          if(response.data.error !=''){
            this.error = response.data.error
          }else{
            this.success = 'File uploaded successfully';
          }
          console.log(response,'response')
          this.loading = false;
          this.$refs.fileInput.value = '';
        })
        .catch(error => {
          console.log(error);
          this.error = 'Failed to upload file';
          this.loading = false;
        });
    }
  }
};
</script>
<style>
.container {
  margin: 20px;
}




button {
  background-color: #4caf50; 
  color: white; 
  padding: 10px 20px; 
  border: none;
  cursor: pointer; 
}

button:hover {
  background-color: #45a049; 
}


.loading {
  color: blue;
  margin-top: 10px; 
}


.error {
  color: red; 
  margin-top: 10px;
}

.success {
  color: green; 
  margin-top: 10px; 
}

</style>

<template>
    <div class="container">
        <div class="col-md-12">
            <form class="form-horizontal">
                <div class="input-group">
                    <div class="custom-file">
                        <input class="custom-file-input col-md-12" type="file" @change="handleFilesUpload"/>
                        <label v-if="selectedFile==null" class="custom-file-label" for="file">Upload your file</label>
                        <label v-if="selectedFile!=null" class="custom-file-label" for="file">{{ selectedFile.name }}</label>
                    </div>
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" @click="upload">Upload</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    name: 'upload-file',
    data: function() {
        return{
            selectedFile: null
        }
    },
    methods: {
        handleFilesUpload(event){
            this.selectedFile = event.target.files[0];
      },
      upload() {
          const url = 'http://localhost:8085/upload';
          const fd = new FormData();
          const aaa = this;
          fd.append('file', this.selectedFile, this.selectedFile.name);

          this.$axios.post(url, fd)
          .then(()=>{
              aaa.$emit('getFileList', true);
          });

      }
  }    
}
</script>
<style scoped>
.custom-file-input:lang(en)~.custom-file-label::after {
    content: "Select";
}
</style>
<template>
  <div>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark justify-content-end">
      <a class="navbar-brand" href="/">#</a>
      <button class="btn btn-sm btn-outline-light ml-auto mr-1" type="button">Sign in</button>
      <div class="justify-content-end">
        <form class="form-inline">
        </form>
      </div>
    </nav>
    <div class="container">
      <div class="col-md-12">
        <br>
        <div class="jumbotron jumbotron-fluid">
          <div class="container">
              <h1 class="display-4 col-md-10">Insert Your Work Time</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import VueToast from 'vue-toast-notification';
// Import one of available themes
import 'vue-toast-notification/dist/theme-default.css';
// import 'vue-toast-notification/dist/theme-sugar.css';
 
Vue.use(VueToast);

export default {
  name: "main-header",
  props:{
    pmessage: String,
    pmessageType: String 
  },
  watch: { 
  pmessage: function() {
      if(this.pmessage!=''){
        Vue.$toast.open({
          'message': this.pmessage,
          'type': this.pmessageType
        });

      }
    }
  },
  methods:{
    showtoast: function(){
      console.log('toast');
    }
  }
};
</script>
<style scoped>
.jumbotron{
    background-color: #FFFFFF;
    color: #343A40;
    font-family: 'Sansita Swashed', cursive;
    margin-bottom: -1rem;
}
h1{
    font-weight: 600;
}
hr{
    background-color: whitesmoke;
}
.please {
  color: #343A40;
}
</style>

<template>
    <div class="container">
    <!-- result list -->
        <h1 class="text-center header">Result</h1>
        <fieldset>
        <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div v-bind:class="{'alert-success':checkSuccess, 'alert-danger':!checkSuccess}" class="alert form-control col-12" role="alert">{{ result }}</div>
            </li>
            <li v-if="checkSuccess" class="list-group-item d-flex justify-content-between align-items-center">
                <label for="work_time" class="col-sm-4 col-form-label"><span>Your end time</span></label> 
                <input id="work_time" type="text" v-bind:value="work_time" readonly class="form-control col-4">
                <div class="col-3 h5 mb-auto"><span class="badge badge-danger">{{ minused_time }}</span></div>
            </li>
            <li v-if="checkSuccess" class="list-group-item d-flex justify-content-between align-items-center">
                <label for="deducted_time" class="col-sm-4 col-form-label"><span>Your rest time</span></label> 
                <input type="text" v-bind:value="deduct_time" readonly class="form-control col-4">
                <div class="col-3"><span class="badge badge-danger"></span></div>
            </li>
            <li v-if="checkSuccess" class="list-group-item d-flex justify-content-between align-items-center">
                <label for="evaluate_time" class="col-sm-4 col-form-label"><span>Your work time</span></label> 
                <input type="text" v-bind:value="evaluate_time" readonly class="form-control col-4">
                <div class="col-3"><span class="badge badge-danger"></span></div>
            </li>
        </ul>
        </fieldset>
    </div>
</template>
<script>
export default {
    name: 'result-list',
    props:{
        result: String,
        work_time: String,
        deduct_time: String,
        evaluate_time: String,
        minused_time: String
    },
    computed:{
        checkSuccess: function(){
            return this.result==='success';
        }
    }
}
</script>
<style scoped>
.container{
    font-family: 'Sansita Swashed', cursive;
    font-size: 120%;
}
input{
    border: 0;
    font-size: 110%;
    padding: 0.5;
}
input[readonly]{
  background-color:transparent;
  border: 0;
  font-size: 1em;
}
.alert{
    border: 0;
    font-size: 110%;
    padding: 0.7rem;
    margin-bottom: 0rem;
}
</style>
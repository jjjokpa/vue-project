<template>
  <div id="app" class="work-time container-fluid">
    <link rel="stylesheet" href="../css/reset.css" />
    <link rel="stylesheet" href="../css/app.scss" />
    <link href="https://unpkg.com/vue-bootstrap-typeahead/dist/VueBootstrapTypeahead.css" rel="stylesheet">

    <div id="main-header">
      <main-header v-bind:pmessage="pmessage"
                   v-bind:pmessageType="pmessageType" />
    </div>
    <div class="container vh-100">
      <div class="row">
        <div class="col-md-12">
          <div id="upload-file">
            <upload-file v-on:getFileList="getFileList"/>
          </div>
        </div>
      </div>

      <div class="row">
          <div class="col-md-12">
              <div class="p-5">

                <!-- work time insert form -->
                <form class="form-horizontal" @keyup="inputCheck" @click="inputCheck" @keypress="inputCheck">
                  <fieldset>
                    <div class="form-group row">            
                      <label for="day" class="col-sm-3 col-form-label"><i class="far fa-calendar-alt fa-lg"></i><span class="ml-3">day</span></label>
                      <div class="col-sm-9">
                        <input readonly type="text" id="day" v-model="day" class="form-control">
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="start_time" class="col-sm-3 col-form-label"><i class="far fa-clock fa-lg"></i><span class="ml-3">start time</span></label>            
                      <div class="col-sm-9">
                          <input type="text" id="start_time" v-model="start_time" class="form-control">
                      </div>
                    </div>                    
                    <div class="form-group row">
                      <label for="time" class="col-sm-3 col-form-label"><i class="far fa-clock fa-lg"></i><span class="ml-3">end time</span></label>            
                      <div class="col-sm-9">
                          <input readonly type="text" id="time" v-model="time" class="form-control">
                      </div>
                    </div>                    
                    <div class="form-group row">    
                      <label for="memo" class="col-sm-3 col-form-label"><i class="fas fa-pen fa-lg"></i><span class="ml-3">work memo</span></label>          
                      <div class="col-sm-9">
                          <input type="text" id="memo" v-model="memo" class="form-control" placeholder="please insert your work memo">
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="file" class="col-sm-3 col-form-label"><i class="far fa-file-excel fa-lg"></i><span class="ml-3">excel file</span></label>                                      
                      <div class="col-sm-9" @click="fileNameCheck" @keypress="fileNameCheck" @keyup="fileNameCheck">
                          <vue-bootstrap-typeahead
                            v-model="file"
                            :data="file_list"
                          />
                          <a href="#" class="badge badge-pill badge-light" @click="fileDownload" :hidden="hidden == 'true'">download</a>
                      </div>
                    </div>
                    <hr>


                    <!-- send button -->
                    <div class="form-group">
                      <div class="col-md-13 text-center">
                        <button :disabled="disabled == 'true'" style="background: #03A87C;font-weight:bold;" type="button" class="shadow-sm btn btn-success btn-lg col-md-12" v-on:click="postTime()">Insert</button>
                      </div>
                    </div>
                  </fieldset>
                </form>
                <!-- result list -->
                <div id="result-list" v-if="checkSuccess">
                  <result-list v-bind:result="result"
                               v-bind:work_time="work_time"
                               v-bind:deduct_time="deduct_time"
                               v-bind:evaluate_time="evaluate_time"
                               v-bind:minused_time="minused_time"/>
                </div>
              </div>
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-md-12">
          <div class="card shadow-sm ml-5 rounded" style="width: 20rem">
            <div class="card-body">
              <h5 style="font-weight:bold" class="card-title"><div><span class="col-md-12">休憩時間</span><span class="col-md-6">控除時間</span></div></h5>
              <div class="col-md-12"><span>11：45～12：30</span><span class="col-md-7 ml-3">45分</span></div>
              <div class="col-md-12"><span>17：20～17：40</span><span class="col-md-7 ml-3">20分</span></div>
              <div class="col-md-12"><span>19：40～20：00</span><span class="col-md-7 ml-3">20分</span></div>
              <br>
              <div class="col-md-12"><span>※ 24時以降は直接手入力する。</span></div>
              <div class="col-md-12"><span>（1時⇒25:00、3時⇒27:00）</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="main-footer">
      <main-footer/>
    </div>
  </div>
</template>
<script>
import MainFooter from './components/MainFooter.vue'
import MainHeader from './components/MainHeader.vue'
import ResultList from './components/ResultList.vue'
import UploadFile from './components/UploadFile.vue'
document.title='Insert work time'

export default {
  name: "App",
  components: {
    'main-footer': MainFooter,
    'main-header': MainHeader,
    'result-list': ResultList,
    'upload-file': UploadFile
  },
  data: function() {
    return {
      day: "2020/10/01",
      start_time: '08:50',
      time: "",
      memo: "",
      file: "",
      url_base: "http://localhost:8085",
      result:'',
      work_time:'',
      deduct_time:'',
      evaluate_time:'',
      minused_time:'-0',
      disabled: 'true',
      hidden: 'true',
      file_list: [],
      pmessage: '',
      pmessageType: ''
    };
  },

  // gen time every 1 second
  created() {
    setInterval(this.genTime, 1000);
  },

  // for body color
  mounted() {
    document.body.className = 'single';
    this.inputCheck();
    this.getFileList();
  },
  computed: {
    // when success show result list
    checkSuccess: function() {
      // return true;
      return this.result!='';
    }
  },
  methods: {

    // post to spring rest api
    postTime: async function() {
      // json has time info
      let timeJson = this.makeJson();
      let aaa = this;

      // request
      await this.$axios.post(this.url_base + "/insertTime", timeJson, {
        headers: {
          'content-type': 'application/json'
        }
      }).then(res => {

        // work time exist response
        if(res.data.work_time){
          aaa.result = 'success';
          aaa.work_time = res.data.work_time;
          aaa.deduct_time = res.data.deduct_time;
          aaa.evaluate_time = res.data.evaluate_time;
          const diff = this.parseMinute(this.time)-this.parseMinute(this.work_time);
          this.minused_time = "-" + this.changeToTimeStr(diff);

          this.pmessageType='error';
          this.pmessage='minute deducted : -'+ diff;
        }else {
          aaa.result = res.data.insert_message;
        }

      }).catch(err =>{
        let aaa = this;
        aaa.result = "" + err.message;
      });


    },

    // make json from input
    makeJson: function() {
      return { day: this.day, start_time: this.start_time, time: this.time, memo: this.memo, file: this.file };
    },

    // generate current time
    genTime: function() {
      const today = new Date();
      const date =
        today.getFullYear() +
        "/" +
        ("0" + (today.getMonth() + 1)).slice(-2) +
        "/" +
        ("0" + today.getDate()).slice(-2);
      const time =
        ("0" + today.getHours()).slice(-2) +
        ":" +
        ("0" + today.getMinutes()).slice(-2);
      this.day = date;
      this.time = time;
    },

    // change to minute
    parseMinute: function(s) {
      let part = s.match(/(\d+):(\d+)(?: )?(am|pm)?/i);
      let hh = parseInt(part[1], 10);
      let mm = parseInt(part[2], 10);
      return hh * 60 + mm;
    },

    // subtracted time
    changeToTimeStr: function(m) {
      let hh = Math.floor(m / 60);
      let mm = m % 60;
      return ("0" + hh).slice(-2) + ":" + ("0" + mm).slice(-2);
    },

    // button control
    inputCheck: function() {
      this.checkLogin();
      this.disabled='true';
      if(this.memo.length>0 && this.file_list.includes(this.file)) {
        this.disabled='false';
      }
    },

    // getFileList
    getFileList: function(isUploaded) {
      const url = this.url_base + '/getFileList';
      this.$axios.get(url)
      .then(res=>{
        this.file_list = res.data.file_list;
      });

      // set message if uploaded
      if (isUploaded){
        this.pmessageType='success';
        this.pmessage='file upload completed';        
      }
    },

    // download button control
    fileNameCheck: function() {
      this.pmessage='';
      this.hidden='true';
      if(this.file_list.includes(this.file)) {
        this.hidden='false';
        this.pmessageType = 'success';
        this.pmessage='selected file is available';
      }
    },

    // initiate file download
    fileDownload: function() {
      this.pmessage='';
      const file_name = this.file;
      if(this.file_list.includes(file_name)) {

        const url = this.url_base + '/downloadFile'
        const query = url + "?fileName=" + this.file;
        fetch(query,{
          method: 'GET'
        })
        .then(response => response.blob())
        .then(blob =>{
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = file_name;
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();    
            a.remove();  //afterwards we remove the element again   
        }).then(()=>{
          this.pmessageType='success';
          this.pmessage='download complete';
        })
      }
    },

    // login check
    checkLogin: function(){
      this.pmessage=''
      const status = true;
      if(!status){
        this.pmessageType='success';
        this.pmessage='please Sign in';
      }
    }
  },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Sansita+Swashed:wght@300;600;900&display=swap');

#app {
  border-radius: 4px;
  padding: 20px;
  transition: all 0.2s;
}

li {
    border-radius: 2px;
    padding: 10px;
    background: #f4f4f4;
    margin-bottom: 2px;
    border-left: 2px solid #e6e7e8;
    color: #444;
}
li .label {
    margin-left: 10px;
    font-size: 20px;
}

body.single {
    background: #F8F9FA;
    font-weight: 600;
    height: 100%;
}

.work-time{
  background: #FFFFFF;
  display: block;
}

#main-footer{
  background: dimgrey;
  display: block;
  color: #FFFFFF;
}

#main-header{
    color: #FFFFFF;
}
.badge{
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-35%, 40%);
}

</style>
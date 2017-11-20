<template>
  <div class="register">
    <x-header link="/">注册</x-header>
      <img class="logos" src="/static/img/1.jpg" alt="">
      <p>欢迎来到英雄联盟</p>
    <form action=""  >

        
        <input type="text" v-model="name" placeholder="账号">
       
        <input type="password" v-model="password" placeholder="密码">
        <br>
        <a @click="zhuce" href="">注册</a>
    </form>
    <div>
      <alert v-model="show" :title="title"  @on-show="onShow" @on-hide="onHide">
        {{content}}
      </alert>
    </div>
      
   
    
  </div>
</template>

<script>
import { Alert ,XHeader } from 'vux'

export default {
  data() {
    return {
      // isLeft: false
      name:'',
      password:'',
      show: false,
      title:'',
      content:'',
      success:false
    };
  },
  components: {
   Alert,
   XHeader
  },
  methods: {
    zhuce:function(ev){
      var that = this
      ev.preventDefault();
      console.log(this.name);
      this.$axios.post('/lol/register',{
        name:that.name,
        password:that.password
      }).then(function(result){
        console.log(result);
        if(result.data.error == 1){
          // alert(result.data.message);
          that.title = '注册失败'
          that.success = false
          that.content = result.data.message
          that.show =true;
          that.password = ''
          that.name = ''
        }else{
          that.success = true
          that.title = '成功'
          that.content = result.data.message
          that.show =true;
          that.password = ''
          that.name = ''
        }
      }).catch(function(err){
        console.log(err);
      })
    },
    onHide () {
      console.log('on hide')
      if(this.success){
        location.href = '/'
      }
    },
    onShow () {
      console.log('on show')

    },
  },
  mounted:function(){
      var that = this;
      $(".tabbar").css("margin-left", "320px");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.register  {
    text-align: center;
}
.register  img.logos{
    width: 200px;
}
.register  form input {
    border: solid 1px #eee;
    width: 200px;
    height: 30px;
    margin: 10px 0;
}
.register  form a{
    display: block;
    margin: 15px auto;
    color: #fff;
    line-height: 30px;
    width: 200px;
    height: 30px;
    border: none;
    background: #8AC7FF;
}
</style>

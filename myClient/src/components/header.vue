<template>
<div class="header">
    <slot></slot>
    <div class="nav-left">
        <div class="background">
            

        </div>
        <div v-if="!user" class="logins">
            <form action="" @submit="login">    
                <input type="text"  v-model="name">
                <input type="password" v-model="password"><br>
                <button class="denglu" type="submit">登录</button>
            </form>
            
            <div class="regis">
              <span>还没有账号?  请 </span>
            <a href="#/register">注册</a>
            </div>
            
        </div>
        <div v-else class="logins">
            <div class="user">
              <div class="user-top">
              <img class="user-img" :src="user.avatar" alt="">
              <a class="user-name" :href="'#/users/'+user._id"> {{user.name}} </a>
              
              </div> 
              <p> {{user.motto}} </p>
              <ul>
                <li><a href="#/inform"  > <i class="fa fa-envelope"> </i> 与我相关</a></li>
                <li><a href=""> <i class="fa fa-money"> </i> 我的订单</a></li>
                <li><a href=""> <i class="fa fa-bullhorn"> </i> 我的发表</a></li>
                <li><a :href="'#/users/'+user._id"> <i class="fa fa-hourglass-o"> </i> 社区资料</a></li>
                
              </ul>
              <a class="sets "  href="#/sets"> <i class="fa fa-cog fa-spin " ></i> 设置</a>
            </div>
            <!-- {{user}} -->
        </div>
           
        
    </div>
    <div>
      <alert v-model="show" :title="title"  @on-show="onShow" @on-hide="onHide">
        {{content}}
      </alert>
    </div>
  </div>
  
</template>


<script>
import { Alert } from 'vux'
export default {
  data: function() {
    return {
      name: "",
      password: "",
      isLogin: false,
      show: false,
      title:'',
      content:'',
      success:false,
      user:''
    };
  },
  methods: {
    login: function(ev) {
      //  ev.preventDefault()
      var that = this;
      ev.preventDefault();
      console.log(ev.currentTarget);

      console.log(this.name);
      console.log(this.password);
      this.$axios.post('/lol/login',{
        name:that.name,
        password:that.password
      }).then(function(result){
        console.log(result);
        if(result.data.error == 1){
          // alert(result.data.message);
          that.title = '登录失败'
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
  components: { Alert },
  mounted:function(){
    var that = this
    this.$axios.get('/lol/session').then(function(result){
      // console.log(result.data.message)
      if(result.data.error == 0){
        that.user = result.data.message
      }
    }).catch(function(err){
      console.log(err);
    })
  }
};
</script>

<style scoped>
.user-img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: solid 2px #fcfb86;
  
}
.header {
  width: 100%;
  background: #fff;
  /* overflow: hidden; */
  position: fixed;
  top: 0;
  z-index: 997;
   border-bottom: solid 1px #eee;
}
.header a {
  color: #888;
  float: left;
  width: 34px;
}
.header .nav-left {
  /* margin-left: -320px; */
  text-align: center;
  background-image: url(/static/img/background.jpg);
  background-size: 100% 100%;
  width: 240px;
  height: 480px;
  position: absolute;
  top: 0;
  left: -240px;
  z-index: 500;
  transition: all 0.5s;
  /* display: none; */
    color: rgba(255,255,255,0.8);
}
.header .nav-left .logins {
  position: relative;
  z-index: 999;
  padding: 40px 20px;

}
.header .nav-left .logins .regis{
  overflow: hidden;
}
.header .nav-left .logins .regis span{
  float: left;
}
.header .nav-left .logins .regis a{
  float: left;
}

.header .nav-left .logins input{
color: white;
 background:  rgba(12,15,255,0.1);
 border: solid 1px #eee;
    width: 200px;
    height: 30px;
    margin: 10px 0;
}
.header .nav-left .logins .denglu{
  display: block;
    margin: 15px auto;
    color: #fff;
    line-height: 30px;
    width: 200px;
    height: 30px;
    border: none;
    background: #8AC7FF;
    /* position: relative; */
    /* z-index: 888; */
    cursor: pointer;
}

.header .nav-left > div.background {
  background: black;
  opacity: 0.3;
  position: absolute;
  width: 240px;
  height: 480px;

  top: 0;
  /* left: -240px; */
  z-index: 900;
  transition: all 0.5s;
}

.header .touxiang {
  /* font-size: 30px;
    font-weight: normal;
    padding: 0 15px;
    width: 20%; */
  line-height: 40px;
  margin-left: 15px;
  height: 40px;
}
.header h3 {
  width: 220px;
  float: left;
  line-height: 40px;
  text-align: center;
}
.header .touxiang img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: solid 2px #fcfb86;
  margin-top: 5px;
}
.header .fabu {
  float: right;
  margin-right: 15px;
  line-height: 40px;
}
.header .nav-left .logins .user-top{
overflow: hidden;
}
.header .nav-left .logins .user-top img{
  float: left;
}
.header .nav-left .logins .user-top a{
float: left;
line-height: 54px;
margin-left: 15px;
color: #fff;
}
.header .nav-left .logins p{
  width: 100%;
  text-align: left;
  font-size: 15px;
  border-bottom: solid 1px rgba(255,255,255,0.3);
  padding-bottom: 20px;
  margin-top: 5px;
}
.header .nav-left .logins ul{
  text-align: left;
  list-style: none;
}
.header .nav-left .logins ul li{
  margin: 20px 0;
}
.header .nav-left .logins ul li a{
    float:none;
    color: rgba(255,255,255,0.7);
}
.header .sets{
  color: rgba(255,255,255,0.7);
  float: none;
  position: absolute;
  /* left: 5px; */
  bottom: 0;
  /* text-align: left; */
  display: block;
  width: 80px;
  text-align: left;
}
.header .sets i{
  /* display: inline; */
  /* float: left; */
}
</style>


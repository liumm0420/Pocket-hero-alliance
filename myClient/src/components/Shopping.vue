<template>
  <div class="hello">
    <headers>
        
        <!-- <a class="touxiang" @click="login"  href=""> <img src="/static/img/default.jpg" alt=""> </a> -->

        <a v-if="!user" class="touxiang" @click="login" href="">登录</a>
        <a v-else class="touxiang" @click="login"  href=""> <img :src="user.avatar" alt=""> </a>
        <i class="fa fa-search"></i> 
       <input class="search" type="text" placeholder="找你喜欢的英雄" v-model="enterText" @keyup.enter="onEnter">
         <a class="cart" href="#/shopCart"><i class="fa fa-shopping-cart"></i></a> 
        <!-- <a v-if="user" class="fabu" href="">发布</a> -->
        
        
    </headers>
    
      
    <div v-if="user" class="main">
        <tab>
      <tab-item  selected badge-label="1">英雄</tab-item>
      <tab-item   badge-label="1">皮肤</tab-item>
      <tab-item  badge-background="#38C972" badge-color="#fff" badge-label="2">守卫/图标</tab-item>
      <tab-item  badge-background="#38C972" badge-color="#fff" badge-label="2">礼包</tab-item>
    </tab>
      <ul v-if="goods[0]">
        <li v-for="good in goods">
        
            <a  :href="'#/good/'+good._id">
                <img :src="'/static/img/hero/'+good.photo.originalname" alt="">
                <div>
                  <p> {{good.name}} </p>
                  <span> <i class="fa fa-money"></i> {{good.price}} </span>
                </div> 
            </a>
           
        </li>
      </ul>


    </div>

  </div>
</template>

<script>
import { Tab, TabItem,  Badge   } from 'vux'
import Headers from "./Header";
export default {
  data() {
    return {
      isLeft: false,
      countChild: this.numTrans,
      user:'',
      enterText:'',
      goods:[]
    };
  },
  props: ["numTrans"],
  components: {
    Headers,TabItem,Tab,Badge
  },
  methods: {
    login: function(ev) {
      var that = this;
      ev.preventDefault();
      console.log(ev);
      if (!that.isLeft) {
        $(".hello").css("margin-left", "240px");
        $(".tabbar").css("margin-left", "240px");
        that.isLeft = true;
      } else {
        $(".hello").css("margin-left", "0");
        $(".tabbar").css("margin-left", "0");
        that.isLeft = false;
      }
    },
    onEnter:function(val){
      // console.log('123')
      var that = this
    // console.log(this.enterText);
    this.$axios.post('/lol/shopSearch',{search:that.enterText}).then(function(result){
       if(result.data.error == 0){

             that.goods = result.data.message
            //  console.log(that.articles[13])
         }
    }).catch(function(err){
      console.log(err);
    })
    }
  },
  created:function(){
 $(".tabbar").css("margin-left", "0");
    var that = this
    this.$axios.get('/lol/session').then(function(result){
      // console.log(result.data.message)
      if(result.data.error == 0){
        that.user = result.data.message
      }
    }).catch(function(err){
      console.log(err);
    })
  },
  mounted:function(){
     var that = this;
     this.$axios.get('/lol/shopping').then(function(result){
      //  console.log(result.data.message);
      if(result.data.error == 0){
       that.goods = result.data.message
      }
     }).catch(function(err){
       console.log(err);
     })
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
.search{
  background: #eee;
  border: none;font-size: 15px;
  padding: 3px 10px;
  padding-left: 25px;
  margin-top: 8px;
  margin-left: 10px;
  width: 160px;
}
.fa-search{
  position: absolute;
  top: 13px;
  left: 65px;
  color: #777;
}
.hello .cart{
    display: block;
    position: absolute;
    right:15px;
    font-size: 18px;
    color: #ccc;
    top: 5px;
}
.hello .main{
    margin-top: 40px;
    width: 320px;
    border-top: solid 1px #eee;
}
.hello .defeated{
    text-align: center;
}
.hello .defeated img {
    width: 200px;
    opacity: 0.9;
}
.main ul {
  overflow: hidden;
  margin-bottom: 70px;
}
.main ul li{
  float: left;
  margin-left: 10px;
  margin-top: 10px;
  margin-right: 0;
}
.main ul li img{
  width: 145px;
  height: 170px;
  display: block;
}
.main ul li>a{
  position: relative;
  display: block;
}
.main ul li>a>div{
  position: absolute;
  bottom: 10px;
  /* left: 70px; */
  width: 100%;
  text-align: center;
}
.main ul li>a>div p{
  color: #fff;
   font-weight: 200;
}
.main ul li>a>div span{
  color: #EDDAB0;
 
}
</style>

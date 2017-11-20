<template>
  <div class="hello">
    <headers>
        
        <!-- <a class="touxiang" @click="login"  href=""> <img src="/static/img/default.jpg" alt=""> </a> -->

        <a v-if="!user" class="touxiang" @click="login" href="">登录</a>
        <a v-else class="touxiang" @click="login"  href=""> <img :src="user.avatar" alt=""> </a>
        <!-- <h3>消息</h3> -->
        <!-- <a v-if="user" class="fabu" href="">发布</a> -->
        <div>
       <tab>
      <tab-item @click.native="tab1" selected badge-label="1">回复</tab-item>
      <tab-item @click.native="tab2" badge-background="#38C972" badge-color="#fff" badge-label="2">赞</tab-item>
      <tab-item @click.native="tab3" badge-background="#38C972" badge-color="#fff" badge-label="2">踩</tab-item>
    </tab>
      
    </div>
        
        
    </headers>
    <div v-if="user" class="main">
      
          
          <ul v-if="huifu" class="heights">
            <li v-for="typeReply in typeReplys">
               
              <img :src="typeReply.author_id.avatar" alt="">
                <div>
                    <div>
                        <a :href="'#/users/'+typeReply.author_id._id"> {{typeReply.author_id.name}} </a>
                         <span> {{typeReply.create_time}} </span>
                     </div>
                    <p>  我在你的文章<a :href="'#/article/'+typeReply.article_id._id">{{typeReply.article_id.title}}</a> 中评论了 </p>
                </div>
                <!-- {{noReadMsg.author_id.name}} -->
            </li>
          </ul>
          <ul v-if="zan" class="heights">
            <li v-for="typeZan in typeZans">
              <img :src="typeZan.author_id.avatar" alt="">
                <div>
                    <div>
                        <a :href="'#/users/'+typeZan.author_id._id"> {{typeZan.author_id.name}} </a>
                         <span> {{typeZan.create_time}} </span>
                     </div>
                    <p>  我在你的文章<a :href="'#/article/'+typeZan.article_id._id">{{typeZan.article_id.title}}</a> 中给你点赞啦 </p>
                </div>
                <!-- {{noReadMsg.author_id.name}} -->
            </li>
          </ul>
          <ul v-if="cai" class="heights">
            <li v-for="typeCai in typeCais">
              <!-- 1231231231 -->
              <!-- {{typeCai}} -->
              <img :src="typeCai.author_id.avatar" alt="">
              <div>
                    <div>
                        <a :href="'#/users/'+typeCai.author_id._id"> {{typeCai.author_id.name}} </a>
                         <span> {{typeCai.create_time}} </span>
                     </div>
                   <p>  我踩了你的文章<a :href="'#/article/'+typeCai.article_id._id">{{typeCai.article_id.title}}</a>  </p>
              </div>
            </li>
          </ul>
         
    </div>
   
  </div>
</template>

<script>
import { Tab, TabItem,  Badge   } from 'vux'
import Headers from "./Header";
const list = () => ['回复', '赞', '踩']
export default {
  data() {
    return {
      isLeft: false,
      countChild: this.numTrans,
      user:'',
      list2: list(),
      index: 0,
      demo2: '美食',
      noReadMsgs:'',
      huifu:true,
      zan:false,
      cai:false,
      typeReplys:[],
      typeZans:[],
      typeCais:[]
    };
  },
  props: ["numTrans"],
  components: {
    Headers,
     Tab,
    TabItem,  
    Badge
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
    tab1:function(ev){
      this.huifu = true;
      this.zan = false;
      this.cai = false;
    },
    tab2:function(ev){
      this.huifu = false;
      this.zan = true;
      this.cai = false;
    },
    tab3:function(ev){
      console.log('点击了')
      this.huifu = false;
      this.zan = false;
      this.cai = true;
    }
  },
  mounted:function(){
      $(".tabbar").css("margin-left", "0");
      const moment = require('moment');
      
// 设置全局语言  -- 使用中文
moment.locale('zh-cn');
    var that = this
    // this.$axios.get('/lol/session').then(function(result){
    //   // console.log(result.data.message)
    //   if(result.data.error == 0){
    //     that.user = result.data.message
    //   }
    // }).catch(function(err){
    //   console.log(err);
    // })
    this.$axios.get('/lol/message').then(function(result){
      if(result.data.error == 0){
          // console.log(result.data.message)
          result.data.message.forEach(function(element) {
                   element.create_time = moment(element.create_time).fromNow();
               });
          that.noReadMsgs = result.data.message
          that.user = result.data.user
           that.noReadMsgs.forEach(function(element) {
              if(element.atType == 'reply'){
                that.typeReplys.push(element)
              }else if(element.atType == 'zan'){
                that.typeZans.push(element)
              }else if(element.atType == 'cai'){
                that.typeCais.push(element)
              }
           });


          //  console.log($('.heights')) 
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
.hello .main{
    margin-top: 50px;
    width: 320px;
}
.hello .defeated{
    text-align: center;
}
.hello .defeated img {
    width: 200px;
    opacity: 0.9;
    
}
.hello .heights{
  padding: 0 10px;
  margin-bottom: 50px;
}
.hello .heights img{
 float: left;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.hello .heights li{
   overflow: hidden;
    padding: 10px 0;
    border-bottom: solid 1px #eee;
}
.hello .heights li>div{
    float: left;
    margin-left: 10px;
    width: 80%;
}
.hello .heights li>div >div{
    overflow: hidden;
    width: 100%;
}
.hello .heights li>div  p{
    width: 220px;
    /* display: inline; */
    /* height: 500px; */
    /* word-break:break-word;  */
}
.hello .heights li >div >div a{
float: left;
font-size: 15px;
}
.hello .heights li >div >div  span{
    float: right;
    font-size: 12px;
    color: #aaa;
}

</style>

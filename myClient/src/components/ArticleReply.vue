<template>
    <div class="replyAll">
        <x-header>  全部评论({{article.reply_num}}) </x-header>
        <h5> 最新评论({{article.reply_num}})  </h5>
        <p style="padding:30px;" v-if="article.reply_num == 0">还没有人来评论呢,赶快抢沙发呦!!!</p>
        <!-- <p v-for="reply in replys"> {{reply.author.name}} </p> -->
        <ul>
            <li v-for="reply in replys">
                <img :src="reply.author.avatar" alt="">
                <div>
                    <div>
                        <a href=""> {{reply.author.name}} </a>
                         <span> {{reply.create_time}} </span>
                     </div>
                    <p>  {{reply.content}} </p>
                </div>
            </li>
        </ul>
        <div class="foot">
    <a @click="shows" href="">我也来说两句</a>
    
    </div>
    <div  >
      <popup v-model="show7" height="270px" is-transparent>
        <div style="width: 95%;background-color:#fff;height:250px;margin:0 auto;border-radius:5px;padding-top:10px;">
         <group>
      <x-textarea v-model="replyContent" :height="60" :max="200" name="description" placeholder="我来评两句"></x-textarea> 
    </group>
         <div style="padding:20px 15px;">
          <x-button @click.native="submitForm($event)" type="primary">评论</x-button>
          <x-button @click.native="show7 = false">取消</x-button>
         </div>
        </div>
      </popup>
      </div>
      <alert v-model="show" :title="title"  @on-show="onShow" @on-hide="onHide">
        {{content}}
      </alert>
    </div>
  
</template>

<script>
import { XHeader , Group ,Cell ,XButton,XTextarea ,XSwitch,Box,Popup  ,Alert} from 'vux'
export default {
  data:function(){
      return{
          replys:'',
          article:'',
          show7:false,
          replyContent:'',
          success:false,
          title:'',
      content:'',
      show:false

      }
  },
  components: {
    XHeader,
    Group,
    Cell,
    XButton,
    Box,
    Alert,XSwitch,Popup,XTextarea 
  },
  methods:{
      submitForm:function(event){
          var that = this;
      event.preventDefault();
      this.$axios.post('/lol/reply',{article_id:that.article._id,replyContent:that.replyContent}).then(function(result){
          console.log(result);
          if(result.data.error == 0){
              that.success = true
          that.title = '成功'
          that.content = result.data.message
          that.show =true;
      
          }else{
            
          that.title = '发布失败'
          that.success = false
          that.content = result.data.message
          that.show =true;
          that.articleTitle = ''
          that.articleContent = ''
          }
      }).catch(function(err){
          console.log(err);
      })
      },
      shows:function(ev){
        var that = this;
         ev.preventDefault();
         this.show7 = true
          },
          onHide () {
      console.log('on hide')
      if(this.success){
        location.reload();
      }
    },
    onShow () {
      console.log('on show')

    },
  },
  mounted:function(){
      var that = this
    //   console.log(this.$route.params);
      var _id = this.$route.params;
       const moment = require('moment');

// 设置全局语言  -- 使用中文
moment.locale('zh-cn');
 $(".tabbar").css("margin-left", "320px");
      console.log(_id);
      this.$axios.post('/lol/replyAll',_id).then(function(result){
          console.log(result.data)
          if(result.data.error == 0){
              
               that.article = result.data.message
               result.data.replys.forEach(function(element) {
                   element.create_time = moment(element.create_time).fromNow();
               });
            //    var time = moment(that.article).fromNow();
                that.replys = result.data.replys
              
          }
      }).catch(function(err){
          console.log(err);
      })
  }
}
</script>

<style scoped>
.replyAll{
    margin-bottom: 50px;
}
.replyAll > h5{
    background: #ddd;
    color: #666;
    font-weight: normal;
    padding: 4px 20px;
}
.replyAll ul{
    padding: 0 20px;
}
.replyAll ul li {
    overflow: hidden;
    padding: 20px 0;
    border-bottom: solid 1px #eee;
}
.replyAll ul li>img{
    float: left;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.replyAll ul li>div{
    float: left;
    margin-left: 10px;
    width: 80%;
}
.replyAll ul li>div >div{
    overflow: hidden;
    width: 100%;
}
.replyAll ul li>div  p{
    width: 220px;
    /* display: inline; */
    /* height: 500px; */
    /* word-break:break-word;  */
}
.replyAll ul li >div >div a{
float: left;
font-size: 15px;
}
.replyAll ul li >div >div  span{
    float: right;
    font-size: 12px;
    color: #aaa;
}
.replyAll .foot{
    position: fixed;
    bottom: 0;
    border-top: solid 1px #bbb;
    width: 320px;
    padding: 5px 10px;   
    overflow: hidden;
    background: #fff;
}
.replyAll .foot a {
    float: left;
    color: #666;
    font-size: 14px;
    padding: 3px 10px;
     background: #ddd;
     width: 280px;
}



</style>


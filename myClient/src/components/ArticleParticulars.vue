<template>
  <div class="ArticleP">
      <x-header v-if="isAuthor" :right-options="{showMore: true}"  @on-click-more="showMenus = true">    </x-header>
      <x-header v-else >    </x-header>
      <div class="content">
      <h3>{{article.title}} </h3>
      
          <span>{{times}} </span>
      <p>{{article.content}} </p>
      <div class="like">
        
               <a v-if="islike" > <i style="color:red" class="fa fa-thumbs-up"></i></a> 
        <a v-else @click="like" href=""> <i  class="fa fa-thumbs-o-up"></i></a> 
      <a v-if="isdislike"  > <i style="color:red" class="fa fa-thumbs-down"></i></a>
     <a v-else @click="dislike" href=""> <i  class="fa fa-thumbs-o-down"></i></a>
          
          <!-- <div>
               <a v-if="islike" @click="like" href=""> <i style="color:red" class="fa fa-thumbs-up"></i></a> 
        <a v-else @click="like" href=""> <i  class="fa fa-thumbs-o-up"></i></a> 
      <a v-if="isdislike" @click="dislike" href=""> <i style="color:red" class="fa fa-thumbs-down"></i></a>
     <a v-else @click="dislike" href=""> <i  class="fa fa-thumbs-o-down"></i></a>
          </div> -->
     
      <div class="likeNum">
          <span>{{article.likes_num}}赞</span>
          <span>{{article.dislikes_num}}踩</span>
      </div>
      

    
      <group>
      <!-- <x-switch title="transparent " v-model="show7"></x-switch> -->
    </group>
    
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
     </div>
     <h5>最新评论</h5>
      <!-- <div>{{article.}} {{reply.content}} </div> -->
      <!-- {{article.last_reply_author.name}} -->
      <!-- <div v-if="reply">{{last_reply_author.name}}
    {{last_reply_time}}
      {{reply.content}}</div> -->
    <div v-if="reply" class="reply">
        <img :src="last_reply_author.avatar" alt="">
        <div>
            <div>
                 <a href=""> {{last_reply_author.name}} </a>
                 <span> {{last_reply_time}} </span>
             </div>
             <p>  {{reply.content}} </p>
        </div>
    </div>
    <div v-else class="reply">
        <p>还没有人评论呢,赶紧抢沙发吧</p>
    </div>
    <div class="foot">
    <a @click="shows" href="">我也来说两句</a>
    <a badge="1" :href="'#/replys/'+article._id">
    <i class="fa fa-commenting-o"></i>
    <badge :text="article.reply_num">
    
     </badge>
    </a>
    
</div>

     <alert v-model="show" :title="title"  @on-show="onShow" @on-hide="onHide">
        {{content}}
      </alert>
      <alert v-model="show2" :title="title"  @on-hide="onHide1">
        {{content}}
      </alert>
      <div>
      <actionsheet @on-click-menu="click" :menus="menus" v-model="showMenus" show-cancel></actionsheet>
    </div>
      
  </div>
</template>

<script>
import { XHeader ,Badge ,Actionsheet, Group ,Cell ,XButton,XTextarea ,XSwitch,Box,Popup  ,Alert} from 'vux'
import moment from 'moment'
export default {
  data:function(){
      return{
          article:{reply_num:''},
          times:'',
          islike:false,
          isdislike:false,
          show7: false,
          replyContent:'',
          show: false,
          show2:false,
      title:'',
      content:'',
      success:false,
      reply:'',
      last_reply_author:'',
      last_reply_time:'',
      text:'',
      isAuthor:false,
      menus: {
        menu1: '修改',
        menu2: '删除'
      },
      showMenus: false
      
      }
  },
  methods:{
      click:function(key){
        //   console.log(key)
        var that = this
          if(key == 'menu1'){
            //   console.log('修改去')
              location.href ='#/update/'+this.article._id
          }else if(key == 'menu2'){
            //   console.log('删除去')
            this.$axios.post('/lol/delete',{_id:that.article._id}).then(function(result){
                // console.log(result.data)
                if(result.data.error == 0){
                    that.success = true
                    that.title = '成功'
                    that.content = result.data.message;
                    that.show2 = true
                    
                }
            }).catch(function(err){
                console.log(err);
            })
          }
      },
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
        dislike:function(ev){
          var _id = this.$route.params
           var that = this;
      ev.preventDefault();
      this.$axios.post('/lol/dislike',_id).then(function(result){
          console.log(result);
          if(result.data.error == 0){
          that.article = result.data.message
          that.isdislike = true
          }
      }).catch(function(err){
          console.log(err);
      })
      },
      like:function(ev){
          var _id = this.$route.params
           var that = this;
      ev.preventDefault();
      this.$axios.post('/lol/like',_id).then(function(result){
          console.log(result);
          if(result.data.error == 0){
          that.article = result.data.message
           that.islike = true
          }
      }).catch(function(err){
          console.log(err);
      })
      },
      onHide () {
      console.log('on hide')
      if(this.success){
        location.reload();
      }
    },
    onHide1 () {
      console.log('on hide')
      if(this.success){
        location.href = '/';
      }
    },
    onShow () {
      console.log('on show')

    },
  },
  mounted:function(){
      //  日期格式化工具
      this.islike =false
       this.isdislike=false
        const moment = require('moment');

// 设置全局语言  -- 使用中文
moment.locale('zh-cn');
       $(".tabbar").css("margin-left", "320px");
      var that = this
    //   console.log(this.$route.params);
      var _id = this.$route.params
      this.$axios.post('/lol/articleOne',_id).then(function(result){
        
          if(result.data.error == 0){
              that.isAuthor = result.data.isAuthor
              that.article = result.data.message
              that.reply = result.data.reply
              that.last_reply_author = result.data.last_reply_author;
              var time = moment(that.article.last_reply_time).fromNow();
              that.last_reply_time = time

              
              var time = moment(that.article.create_time).fromNow();
              that.times = time
              
            //   console.log(result.data.session)
              result.data.message.likes.forEach(function(element) {
                  if(element == result.data.session){
                      that.islike = true
                  }
              });
              result.data.message.dislikes.forEach(function(element) {
                  
                  if(element == result.data.session){
                      that.isdislike = true
                  }
              });
            //   if(result.data.message)
          }
      }).catch(function(err){
          console.log(err);
      })

  },
  components: {
    XHeader,
    Group,
    Cell,
    XButton,
    Box,
    Alert,XSwitch,Popup,XTextarea ,Badge ,Actionsheet
  },
  
//   mounted:function(){
//       var that = this;
    //  
//   }
}
</script>

<style scoped>

.ArticleP{
    
}
.ArticleP .content{
padding: 15px;
}
.ArticleP h3{
    font-weight: 400;
    font-size: 20px;
}
.ArticleP .content>span{
    display: block;
    width: 100%;
    text-align: right;
    color: #999;
    margin: 15px 0  20px 0;
    font-size: 13px;
}
.ArticleP .content>p{
    color: #444;
}
.ArticleP .like{
    overflow: hidden;
    margin-top: 30px;
}
.ArticleP .like  a{
    display: block;
    color: #888;
    float: left;
    /* width: 50%; */
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: solid 1px #ccc;
    text-align: center;
    margin-left: 70px;
}
.ArticleP .like a i{
    font-size: 22px;
    line-height: 40px;
    text-align: center;
}
.ArticleP .like .likeNum{
    font-size: 12px;
    width: 100%;
    overflow: hidden;
}
.ArticleP .like .likeNum span{
    float: left;
    margin-left: 80px;
    display: block;
}
.ArticleP .like .likeNum span:last-child{
      margin-left: 95px;
}
.ArticleP  h5{
    font-size: 13px;
    background: #ccc;
    width: 280px;
    /* position: absolute; */
    padding: 3px 20px;
    
}
.ArticleP .reply{
    padding: 10px 20px;
    margin-bottom: 50px;
    overflow: hidden;
}
.ArticleP .reply img{
    float: left;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.ArticleP .reply >div{
    float: left;
    margin-left: 10px;
    width: 80%;
    
}
.ArticleP .reply >div >div{
    overflow: hidden;
    width: 100%;
}
.ArticleP .reply >div >div a{
float: left;
font-size: 15px;
}
.ArticleP .reply >div >div  span{
    float: right;
    font-size: 12px;
    color: #aaa;
}
.ArticleP .foot{
    position: fixed;
    bottom: 0;
    border-top: solid 1px #bbb;
    width: 320px;
    padding: 5px 10px;   
    overflow: hidden;
    background: #fff;
}
.ArticleP .foot a {
    float: left;
    color: #666;
    font-size: 14px;
    padding: 3px 10px;
}
.ArticleP .foot a:first-child{
    width: 60%;
    background: #ddd;
}
.ArticleP .foot a:last-child{
    margin-left: 30px;
    position: relative;
    padding: 0;
}
.vux-badge-single{
    position: absolute; 
    top: -5px;
    left: 15px;
}
.vux-badge{
    position: absolute; 
    top: -5px;
    left: 15px;
}
.ArticleP .foot a:last-child i{
    font-size: 24px;
    line-height: 28px;
}
</style>

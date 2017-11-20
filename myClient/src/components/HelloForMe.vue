<template>
  <div class="hello">
    <headers>
        
        <!-- <a class="touxiang" @click="login"  href=""> <img src="/static/img/default.jpg" alt=""> </a> -->

        <a v-if="!user" class="touxiang" @click="login" href="">登录</a>
        <a v-else class="touxiang" @click="login"  href=""> <img :src="user.avatar" alt=""> </a>
       <i class="fa fa-search"></i> 
      <input class="search" type="text" placeholder="找你喜欢的文章" v-model="enterText" @keyup.enter="onEnter">
    
        <a v-if="user" class="fabu" href="#/fabu">发布</a>
        
        
    </headers>
    <div class="main">
      <box gap="10px 10px">
      <swiper dots-class="dotss"  height="130px" loop auto  v-model="demo01_index" :list="baseList" ></swiper>
      </box>
      <ul>
        
        <li v-for="article in articles">
          <a  :href="'#/article/'+article._id">
            <section>
              <p> {{article.title}} </p>
              
                <span> {{article.author.name}} </span> 
                <span> {{article.click_num}}次浏览 </span>
              
            </section>
            <section>
              <img :src="'/static/img/'+article.file" alt="">
            </section>
          </a>
        </li>
            
      </ul>
      <a class="moreData" href=""> {{jiazai}} </a>
      <!-- <div>{{articles}}</div> -->
  
      


    </div>
    
  </div>
</template>

<script>
import Headers from "./Header";
import { XInput, Group,Swiper,Box } from 'vux'
const baseList = [{
  url: 'javascript:',
  img: '/static/img/01.jpg',
  // title: '送你一朵fua'
}, {
  url: 'javascript:',
  img: '/static/img/02.jpg',
  // title: '送你一辆车'
}, {
  url: 'javascript:',
  img: '/static/img/03.jpg',
  // title: '送你一次旅行',
  // fallbackImg: 'https://static.vux.li/demo/3.jpg'
}]

export default {
  data() {
    return {
      isLeft: false,
      // countChild: this.numTrans,
      user:'',
      demo01_index: 0,
      enterText:'',
      baseList: baseList,
      articles:'',
      jiazai:'加载更多...'
      
    };
  },
  // props: ["numTrans"],
  components: {
    Headers,
    Swiper,
    Box,
    XInput, Group,
    
  },
  methods: {
    onEnter:function(val){
      // console.log('123')
      var that = this
    // console.log(this.enterText);
    this.$axios.post('/lol/articleSearch',{search:that.enterText}).then(function(result){
       if(result.data.error == 0){

             that.articles = result.data.message
            //  console.log(that.articles[13])
         }
    }).catch(function(err){
      console.log(err);
    })
    },
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
    }
  },
  mounted:function(){
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
    var num = 0;
    $(document).on('scroll',window,function(){
      // 页面总长
      var height = $(this).height();
      // 获取内容高度 // 屏幕
      var screenHeight = $(window).height();
      // 获取滚动的偏移量  已经滑动的高度
      var scrollTop = $(window).scrollTop();
      // console.log(height)
      // console.log(screenHeight)
      // console.log(scrollTop)
      if(scrollTop + screenHeight > height - 2){
        num +=1;
        that.$axios.get('/lol/article?page=' + num).then(function(result){
          if(result.data.error == 0){
            if(result.data.message.length<1){
              that.jiazai = '已经没有更多了!!'
            }
            result.data.message.forEach(function(article) {
              that.articles.push(article)
              
            });
             
            //  console.log(that.articles[13])
         }
        }).catch(function(err){
       console.log(err);
     })
      }
    })
     this.$axios.get('/lol/article').then(function(result){
         if(result.data.error == 0){

             that.articles = result.data.message
            //  console.log(that.articles[13])
         }
     }).catch(function(err){
       console.log(err);
     })

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  width: 320px;
  overflow: hidden;
}
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
.fa-search{
  position: absolute;
  top: 13px;
  left: 65px;
  color: #777;
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

.main{
  margin-top: 30px;
  width: 320px;
  overflow: hidden;
}

.main ul{
  width: 320px;
 
  
}
.main .moreData{
   margin-bottom: 50px;
   display: block;
   text-align: center;
   background: #eaeaea;
   padding: 5px 0;
}
.main ul li {
margin: 0 20px;

}

.main ul li a{
  display: block;
  width: 100%;
  overflow: hidden;
  color: #444;
  border-bottom: solid 1px #ccc;
  padding: 10px 0;
}
.main ul li:last-child a{
  border-bottom:none;
}
.main ul li a section{
width: 30%;
float: left;
}
.main ul li a section:first-child{
  width: 70%;
}
.main ul li a section img{
  width: 80px;
  height: 70px;
  border-radius: 10px;
}
.main ul li a section p{
  width: 200px;
}
.main ul li a section span{
  font-size: 12px;
  color: #aaa;
  margin-right: 10px;
}
</style>

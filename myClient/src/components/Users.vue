<template>
    <div class="user">
        <x-header>  社区资料 </x-header>
        <blur :height=160 :blur-amount=40  :url="url">
                 <p class="center"><img :src="url"></p>
                 <div class="guanzhu">
                     <p>关注量 <a :href="'#/attention/'+user._id">{{user.follows}}</a> </p>
                     <!-- <p>关注量 <a:href="'#/attention/'+user._id">{{user.follows}}</a> </p> -->
                     <p>被关注量 <a :href="'#/beAttention/'+user._id">{{user.be_followed}}</a> </p>
                 </div>
        </blur>
        <flexbox :gutter="0">
            <flexbox-item v-for="(img, index) in images" :key="index"><img :src="img" style="width:100%;height:106px" @click="url = img"/></flexbox-item>
        </flexbox>
        <div class="main">
            <!-- {{user}} -->
            <ul>
                <li>
                    <span>社区昵称</span> 
                    <p> {{user.name}} </p>
                </li>
                <li>
                    <span>个性签名</span>
                     <input type="text" v-model="user.motto" :value="user.motto"> 
                </li>
                <!-- {{session._id}}
                {{user._id}} -->
                 <x-button v-if="session._id == user._id"  @click.native="submitForm($event)" type="primary">修改</x-button> 
                 <x-button v-else  @click.native="guanzhu" type="primary">关注</x-button> 
            </ul> 
           
        </div>
        <alert v-model="show" :title="title"  @on-show="onShow" @on-hide="onHide">
        {{content}}
      </alert>
    </div>
</template>

<script>
import { XHeader ,Flexbox,Alert, FlexboxItem, XButton,Blur, Group ,Box} from 'vux'
export default {
  data:function(){
      return{
          images: [
        '/static/img/default.jpg',
        '/static/img/04.jpg',
        '/static/img/06.jpg'
      ],
      url: '',
      user:'',
      session:'',
      motto:'',
      show: false,
      title:'',
      content:'',
      success:false,
      }
  },
  components:{
      XHeader,Group,Box,Flexbox, FlexboxItem, Blur,XButton,Alert
  },
  methods:{
      guanzhu:function(ev){
          var that = this;
        //   console.log(ev)
        var _id = this.$route.params
        this.$axios.post('/lol/guanzhu',_id).then(function(result){
            console.log(result.data)
             if(result.data.error == 0){
                that.user = result.data.user
              
                that.session = result.data.session
                that.title = '成功'
          that.content = '关注成功'
          that.show =true;
             }else{
                 that.title = '失败'
          that.content =  result.data.message
          that.show =true;
             }
        }).catch(function(err){
            console.log(err);
        })
      },
      submitForm(event){
          var that = this;
          var _id = this.$route.params
      event.preventDefault();
      
      this.$axios.post('/lol/userUpdate',{_id:_id.user_id,url:that.url,motto:that.user.motto}).then(function(result){
          console.log(result.data)
          if(result.data.error == 0){
              that.success = true
          that.title = '成功'
          that.content = result.data.message
          that.show =true;
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
    onShow () {
      console.log('on show')

    },
  },
  mounted:function(){
      var  that = this
     $(".tabbar").css("margin-left", "320px");  
      var _id = this.$route.params
      this.$axios.post('/lol/userOne',_id).then(function(result){
          console.log(result.data);
          if(result.data.error == 0){
              that.user = result.data.user
              that.url =  result.data.user.avatar
              that.session = result.data.session
          }
      }).catch(function(err){
          console.log(err);
      })
  }
}
</script>

<style scoped>
.center {
  text-align: center;
  padding-top: 20px;
  color: #fff;
  font-size: 18px;
}
.center img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid #ececec;
}
.guanzhu{
    position: absolute;
    top: 50px;
    right: 20px;
}
.main ul{ 
     padding: 10px;
}
.main ul li{
   
    overflow: hidden;
}
.main ul li span{
    display: block;
    float: left;
    width: 25%;
    padding: 10px 0;
}
.main ul li p {
    float: right;
    width: 74%;
    border-bottom: solid 1px #ddd;
    padding: 10px 0;
}
.main ul li input{
    float: right;
    display: block;
width: 74%;
border: none;
font-size: 16px;
 padding: 10px 0;
}
</style>


<template>
    <div>
         <x-header>  我的关注 </x-header>

         <h5> 全部关注 </h5>
         <p v-if="user.attention.length<1" > 还没有关注他人哦!!! </p>
         <ul v-else>
             <li v-for="item in user.attention">
                 <a class="details" :href="'#/users/'+item._id">
                     <img :src="item.avatar" alt="">
                     <span> {{item.name}} </span>
                 </a>
             </li>
         </ul>
    </div>
</template>


<script>
import { XHeader ,Flexbox,Alert, FlexboxItem, XButton,Blur, Group ,Box} from 'vux'
export default {
    
  data:function(){
      return{
          user:{attention:[]},
      session:'',
      }
  },
  mounted:function(){
      var  that = this
     $(".tabbar").css("margin-left", "320px");  
      var _id = this.$route.params;
      this.$axios.post('/lol/userOne',_id).then(function(result){
          console.log(result.data);
          if(result.data.error == 0){
              that.user = result.data.user
              
              that.session = result.data.session
          }
      }).catch(function(err){
          console.log(err);
      })
  },
  components:{
      XHeader,Group,Box,Flexbox, FlexboxItem, Blur,XButton,Alert
  },
}
</script>

<style scoped>
h5{
    font-weight: normal;
    background: #eaeaea;
    padding: 3px 10px;
}
p   {
    text-align: center;
    margin-top: 20px;
}
.details{
    overflow: hidden;
    padding: 10px;
    display: block;
    border-bottom: solid 1px #eaeaea;
    color: #666;
}
.details img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: block;
    float: left;
}
.details span{
    float: left;
    display: block;
    line-height: 50px;
    margin-left: 20px;
    color: #666;
}
</style>

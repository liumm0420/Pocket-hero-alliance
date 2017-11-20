<template>
    <div class="main">
        <x-header style="background:  none;box-shadow: 0 24px 25px 1px #111 inset;"> <a class="cart" href="#/shopCart"><i class="fa fa-shopping-cart"></i></a> </x-header>
        <!-- {{good}} -->
        <img :src="'/static/img/hero/'+good.photo.originalname" alt="">

        <div class="footer">
            <div class="top">
                <div>
                    <h3>  {{good.name}} </h3>
                    <span> <i class="fa fa-money"></i> {{good.price}} </span>
                </div>
                
                <p> {{good.describe}} </p>
                <span> 上架时间: {{good.time.day}} </span>
                
            </div>
            <div class="boo">
                <ul>
                    <li >
                        <a  href=""> <i class="fa fa-archive"></i> 赠送</a>
                    </li>
                    <li>
                        <a @click="join" href="">加入购物车</a>
                    </li>
                    <li>
                        <a @click="show" href="">立即购买</a>
                    </li>
                </ul>
            </div>
        </div>
        <popup v-model="show7" height="270px" is-transparent>
        <div style="width: 95%;background-color:#fff;height:250px;margin:0 auto;border-radius:5px;padding-top:10px;">
         <group>
          <cell title="英雄" :value="good.name"></cell>
          <cell title="金币" :value="good.price"></cell>
         </group>
         <div style="padding:20px 15px;">
          <x-button @click.native="pay" type="primary">支付</x-button>
          <x-button @click.native="show7 = false">取消</x-button>
         </div>
        </div>
      </popup>
      <toast v-model="show6" :text="sucMsg"></toast>
      <toast v-model="show5" type="cancel" :text="errMsg"></toast>

    </div> 
</template>

<script>
import { XHeader,Toast , Group ,Cell  ,Box ,Alert,Popup,XButton} from 'vux'
export default {
  data:function(){
      return{
          good:{photo:'',time:''},
          show7:false,
          show6:false,
          sucMsg:'',
          show5:false,
          errMsg:''
      }
  },
  components: {
    XHeader,
    Group,
    Cell,
    XButton,
    Box,
    Alert,Popup,XButton,Toast
  },
  methods:{
      show:function(ev){
          ev.preventDefault();
          this.show7 = true 
      },
      join:function(ev){
          ev.preventDefault();
          var  that = this;
          var _id = this.$route.params;
          this.$axios.post('/lol/join',_id).then(function(result){
            //   console.log(result.data)
            if(result.data.error == 0){
                //   console.log(result.data.message)
                that.show7=false
                that.show6 = true
                that.sucMsg = result.data.message
              }else{
                //   console.log(result.data.message)
                that.show7=false
                that.show5 = true;
                that.errMsg = result.data.message
              }
          }).catch(function(err){
              console.log(err);
          })
      },
      pay:function(ev){
          ev.preventDefault();
          var  that = this;
          var _id = this.$route.params;
          this.$axios.post('/lol/pay',_id).then(function(result){
            //   console.log(result.data);
              if(result.data.error == 0){
                //   console.log(result.data.message)
                that.show7=false
                that.show6 = true
                that.sucMsg = result.data.message
              }else{
                //   console.log(result.data.message)
                that.show7=false
                that.show5 = true;
                that.errMsg = result.data.message
              }
              
          }).catch(function(err){
              console.log(err);
          })

      }
  },
  mounted:function(){
      var _id = this.$route.params
      var that = this;
      $(".tabbar").css("margin-left", "320px");
       this.$axios.post('/lol/goodOne',_id).then(function(result){
           if(result.data.error == 0){
               that.good = result.data.message
           }
       }).catch(function(err){
           console.log(err);
       })
  }
}
</script>
<style scoped>
.main{

}
.main .cart{
    display: block;
    position: absolute;
    right: 20px;
    font-size: 18px;
    color: #ccc;
}
.main img{
    width: 100%;
    height: 445px;
    margin-top: -50px;
}
.footer{
    position: fixed;
    bottom: 0;
    width: 100%;
    color: #fff;
    
    
}
.footer .top{
    background:  rgba(50, 50, 50, 0.8);
    padding: 0 15px;
    padding-bottom: 10px;
}
.footer .top >div{
    overflow: hidden;
}
.footer .top  h3{
    padding: 20px 0;
    font-weight: normal;
    float: left;
}
.footer .top >div span{
    font-size: 18px;
    float: right;
    padding: 20px 0;
}
.footer .top  p{
    font-size: 14px;
}
.footer .top>span{
    font-size: 12px;
    color: #aaa;
    
}
.footer .boo{

}
.footer .boo ul{
    overflow: hidden;
    list-style: none;
}
.footer .boo ul li{
    float: left;
    width: 33.33%;
     
    
}
.footer .boo ul li a{
    line-height: 40px;
    display: block;
    text-align: center;
    height: 40px;
}
.footer .boo ul li:first-child a{
    color: #E9C06C;
    background: #fff;
    font-size: 12px;
    line-height: 16px;
}
.footer .boo ul li:first-child a i{
    display: block;
    line-height: 20px;
    font-size: 14px;
}
.footer .boo ul li:nth-child(2) a{
    background: linear-gradient(to right, #F16907, #DF4706); 
    color: #fff;
}
.footer .boo ul li:nth-child(3) a{
    background: linear-gradient(to right, #BC2206, #DF4706); 
    color: #fff;
}
</style>

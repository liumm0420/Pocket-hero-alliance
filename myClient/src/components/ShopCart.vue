<template>
    <div class="myCarts">
        <x-header >购物车 <a class="qingk" @click="qingk" href="">清空</a> </x-header>
       
        <popup-picker title="选择大区" style="background:#fff;border-bottom:solid 1px #DFE4ED" :data="list" v-model="value5" value-text-align="left"></popup-picker>
        <!-- <div  style="padding:15px;"> -->
        <!-- <check-icon :value.sync="show11"> {{ show11 }}</check-icon> -->
          <!-- <group>
              <x-switch title="title" v-model="value"></x-switch>
         </group> -->
         <div class="cartList" >
             
             <ul>
                 <p class="NoCats" v-if="carts.length < 1"> 购物车空空如也,快去购物吧! </p>
                 <li v-for="cart in carts">
                        <input @click="value2" class="vehicle1" type="checkbox" name="vehicle1" :value="cart._id">
                        <a href="">
                            <img :src="'/static/img/hero/'+cart.photo.originalname" alt="">
                            <div>
                                <h3> {{cart.name}} </h3>
                                <span> <i class="fa fa-money"></i>  {{cart.price}} </span>
                            </div>
                        </a>
                 </li>
             </ul>
        </div>
        <div class="footer1">
            <p> 余额: <i class="fa fa-money"></i> {{user.score}} </p>
            <div>
                <div class="left">
                    <input @click="value1" type="checkbox" class="vehicle" name="vehicle" :value="value"><span>全选</span><br>
                </div>
                <div class="right">
                    <span> 共 <i class="fa fa-money"></i> {{total}} </span>
                    <a @click="account" href=""> 结算 </a>
                </div>
            </div>
        </div>
        <!-- </div> -->
        <toast v-model="show6" :text="sucMsg"></toast>
      <toast v-model="show5" type="cancel" :text="errMsg"></toast>
    </div>
</template>

<script>
import { XHeader,CheckIcon ,XSwitch,Toast , Group , PopupPicker} from 'vux'
export default {
  data:function(){
      return{
          value5: ['比尔吉沃特'],
          show11:true,
          value:false,
          carts:[],
          user:'',
          total:0,
          show6:false,
          sucMsg:'',
          show5:false,
          errMsg:'',
          all:[],
          list: [['比尔吉沃特', '德玛西亚', '艾欧尼亚','佛雷尔卓德','黑色玫瑰','无畏先锋','暗影岛','皮尔特沃夫','战争学院','巨神峰','雷瑟守备','裁决之地','恕瑞玛','扭曲丛林']],
      }
  },
  components: {
    XHeader,
    Group,
   XSwitch,
   Toast,
     PopupPicker,CheckIcon
  },
  methods:{
      qingk:function(ev){
          var that = this;
          ev.preventDefault();
          this.$axios.get('/lol/qingk').then(function(result){
              if(result.data.error == 0){
                  that.show6 = true;
                  that.sucMsg = result.data.message;
                  setTimeout(function(){
                    location.reload();
                },2000)
              }
          }).catch(function(err){
              console.log(err);
          })
      },
      account:function(ev){
          var that = this;
          ev.preventDefault();
          if(that.user.score < that.total){
              that.errMsg = '金币不足哦亲!!'
              that.show5 = true
          }else if ( that.total == 0 ){
              that.errMsg = '先添加购物车再来购买哦!!'
              that.show5 = true
          }else if(that.user.score >= that.total){
              this.$axios.post('/lol/payCart',{shop:that.all}).then(function(result){
                  console.log(result.data)
                  if(result.data.error == 0){
                      that.show6 = true;
                      that.sucMsg = result.data.message;
                      setTimeout(function(){
                          location.reload();
                      },2000)
                  }
              }).catch(function(err){
                  console.log(err);
              })
          }
      },
      value1:function(ev){
          
        var that = this;
         
        //  console.log(ev.target.checked)
         if(ev.target.checked){
             $('input.vehicle1').each(function(){
                 $(this)[0].checked = true 
             })
             that.all = [];
             that.carts.forEach(function(element){
                 that.all.push(element);
             })
             that.total = 0
             that.all.forEach(function(ele){
                 that.total += ele.price
             })
         }else if(ev.target.checked == false){
             $('input.vehicle1').each(function(ev){
                //  $(this).removeAttr('checked', 'checked'); 
               $(this)[0].checked = false
             })
             that.all = [];
             that.total = 0;
            
         }
     
         
      },
      value2:function(ev){
        var that = this;
        // console.log(ev.target.checked)
        // console.log(ev.target.value)
       that.total = 0
        if(ev.target.checked == true){
            var isQuan = false
            $('input.vehicle1').each(function(){
                if($(this)[0].checked == false ){
                    isQuan = true
                }
                 
             })
             if(!isQuan){
                 $('input.vehicle')[0].checked = true;
                //  console.log($('input.vehicle')[0].checked)
                //  console.log('123')
             }
            that.carts.forEach(function(element) {
                if(element._id == ev.target.value){
                    that.all.push(element);
                    that.total = 0
                    that.all.forEach(function(ele){
                        that.total += ele.price
                        // console.log(that.all);
                    })
                }   
            });
        }else if(ev.target.checked == false){
            if($('input.vehicle')[0].checked == true){
                $('input.vehicle')[0].checked = false
            }
            that.all.forEach(function(element,index) {
                if(element._id == ev.target.value){
                    
                    that.all.splice(index,1);

                    if(that.all.length < 1){
                        that.total = 0
                    }else{
                        that.total = 0
                       that.all.forEach(function(ele){
                        that.total += ele.price
                        // console.log(ele.price)
                    })
                    }
                    
                }   
            });
        }
         
      }
  },
  mounted:function(){
      var that = this;
      $(".tabbar").css("margin-left", "320px");
    //   console.log('123')
      this.$axios.get('/lol/myCart').then(function(result){
          if(result.data.error == 0){
                // console.log(result.data.cart)
                that.carts = result.data.cart
                that.user = result.data.session;
          }
      
      }).catch(function(err){
          console.log(err);
      })
  }
}
</script>
<style scoped>
.myCarts{
    overflow: hidden;
    background-color: #eaeaee;
    min-height: 480px;
}
.NoCats{
    text-align: center;
    margin-top: 50px;
}
.qingk{
    position: absolute;
    right: 20px;
    font-size: 14px;
    color: #ccc;
}
ul{
    list-style: none;
}
.cartList ul{
    margin-bottom: 70px;
}
.cartList ul li{
    overflow: hidden;
    padding: 10px 0;
    background: #ffffff;
    margin: 4px 0;
}

.cartList ul li img{
    width: 65px;
    height: 70px;
}
.cartList ul li input{
    display: block;
    float: left;
    margin: 0 10px;
    margin-top: 30px;
    
}
.cartList ul li a{
    display: block;
    float: left;
    overflow: hidden;
    
}
.cartList ul li a img{
float: left;
}
.cartList ul li a>div{
float: left;
padding-left: 15px;
margin-top: 5px;
}
.cartList ul li a>div h3{
    color: #333;

}
.cartList ul li a>div span{
    color: #888;
}
.footer1{
    position: fixed;
    bottom: 0;
    width: 320px;
    color: #444;
    
}
.footer1 p{
    text-align: center;
    font-size: 14px;
    background: #fff;
    border-bottom: solid 1px #eaeaea;
}
.footer1 p i{
    margin-left: 10px;
}
.footer1 >div{
    overflow: hidden;
    background: #fff;
    
}
.footer1 >div .left{
    float: left;
}
.footer1 >div .left input{
line-height: 40px;
    text-align: center;
    margin-left: 20px;
}
.footer1 >div .left span{
line-height: 40px;
    text-align: center;
    margin-left: 10px;
}
.footer1 >div .right{
    float: right;
    overflow: hidden;
}
.footer1 >div .right a{
    height: 40px;
    background: palevioletred;
    color: #fff;
    display: block;
    float: left;
    line-height: 40px;
    text-align: center;
    width: 85px;
}
.footer1 >div .right span{
    display: block;
    float: left;
    line-height: 40px;
    text-align: center;
    margin-right: 20px;
}

</style>


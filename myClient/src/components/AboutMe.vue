<template>
  <div class="hello">
    <headers>
        
        <!-- <a class="touxiang" @click="login"  href=""> <img src="/static/img/default.jpg" alt=""> </a> -->

        <a v-if="!user" class="touxiang" @click="login" href="">登录</a>
        <a v-else class="touxiang" @click="login"  href=""> <img :src="user.avatar" alt=""> </a>
        <h3>比尔吉沃特</h3>
        <!-- <a v-if="user" class="fabu" href="">发布</a> -->
        
        
    </headers>
    <div v-if="user" id="main" class="main">
        
    </div>
    <div id="myChart" :style="{width: '250px', height: '250px',left:'35px'}"></div>
   
    <div class="aboutM">
      <p> 最擅长: <span> {{tets}} </span> </p>
      <p> 余额: <span> 金币{{user.score}} </span> </p>
      <div>
        <p style="border:none"> 拥有的英雄 <span> {{user.shopping.length}} </span> / 138 </p>
        <ul>
          <li v-for="shop in user.shopping">
            <a  :href="'#/good/'+shop._id"> <img :src="'/static/img/hero/'+shop.photo.originalname" alt=""> </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Headers from "./Header";
export default {
  name: 'hello',
  data() {
    return {
      isLeft: false,
      countChild: this.numTrans,
      user:{shopping:[]},
      tets:''
      
    };
  },
  props: ["numTrans"],
  components: {
    Headers
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
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      var that = this
     
      // console.log(that.val)
      this.$axios.get('/lol/session').then(function(result){
        if(result.data.error == 0){
      // console.log(result.data.message.shopping)
      var arr = [];
      
      var a = 0,b = 0,c = 0,d = 0,e = 0,f = 0;
      var len = result.data.message.shopping.length
      
      result.data.message.shopping.forEach(function(element,ind) {
        // console.log(element.nenglis[0] - 0);
        a = a + (element.nenglis[0] - 0)
        b = b + (element.nenglis[1] - 0)
        c = c + (element.nenglis[2] - 0)
        d = d + (element.nenglis[3] - 0)
        e = e + (element.nenglis[4] - 0)
        f = f + (element.nenglis[5] - 0)
      });
      // console.log(a)
      
      arr = [Math.round(a/len),Math.round(b/len),Math.round(c/len),Math.round(d/len),Math.round(e/len),Math.round(f/len)]
      // console.log(arr);
      if(len<1){
        arr = [0,0,0,0,0,0]
      }
      // console.log(Math.max(a,b,c,d,e,f))
      var nengl = 0;
      // console.log(Math.max(a,b,c,d,e,f))
      // console.log(Math.min(a,b,c,d,e,f))
      if(Math.max(a,b,c,d,e,f) == Math.min(a,b,c,d,e,f)){
        that.tets = '还没有英雄来提升自己的能力哦!'
      }else{
        arr.forEach(function(eles,index){
          if(eles == Math.round(Math.max(a,b,c,d,e,f)/len)){
            // console.log(eles)
            // console.log(Math.round(Math.max(a,b,c,d,e,f)/len))
             nengl = index
            //  console.log(nengl)
          }
        })
      }
      if(nengl == 0){
        that.tets = '击杀'
      }
      if(nengl == 1){
        that.tets = '生存'
      }
      if(nengl == 2){
        that.tets = '助攻'
      }
      if(nengl == 3){
        that.tets = '物理'
      }
      if(nengl == 4){
        that.tets = '魔法'
      }
      if(nengl == 5){
        that.tets = '防御'
      }
      if(Math.max(a,b,c,d,e,f) == Math.min(a,b,c,d,e,f)){
        that.tets = '还没有购买英雄哦!'
      }

      
        that.user = result.data.message
      }
      let myChart = that.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
     
      myChart.setOption({
        title: {
          // text: '基础雷达图'
        },
        tooltip: {},
        legend: {
          // data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: '#333',
              // backgroundColor: '#999',
              // borderRadius: 10,
              // padding: [3, 5]
            }
          },
          indicator: [
            { name: '击杀', max: 10 },
            { name: '生存', max: 10 },
            { name: '助攻', max: 10 },
            { name: '物理', max: 10 },
            { name: '魔法', max: 10 },
            { name: '防御', max: 10 }
          ]
        },
        series: [{
          name: '能力值',
          type: 'radar',
          // areaStyle: {normal: {}},
          data: [
            // {
            //   value: [4300, 10000, 28000, 35000, 50000, 19000],
            //   name: '预算分配（Allocated Budget）'
            // },
            {
              value: arr,
              // name: '实际开销（Actual Spending）'
            }
          ]
        }]
      });
    }).catch(function(err){
      console.log(err);
    })
      
    }
  },
  mounted:function(){
     this.drawLine();
      $(".tabbar").css("margin-left", "0");
    var that = this
    

    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  background: #fff;
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
  /* margin: 0 10px; */
}

a {
  color: #42b983;
}
.hello .main{
  padding-top: 10px;
    margin-top: 40px;
    width: 320px;
    
    /* overflow: hidden; */
}
.hello .defeated{
    text-align: center;
}
.hello .defeated img {
    width: 200px;
    opacity: 0.9;
}
.aboutM {
  margin-bottom: 50px;
  padding: 10px;
}
.aboutM span{
  color: #A87A03;
}
.aboutM ul{
overflow: hidden;
width: 300px;
}
.aboutM p{
  width: 290px;
  position: relative;
  border-bottom: solid 1px #efefef;
  padding: 5px 0;
}
.aboutM p:before{
  content: '';
  position: absolute;
  left: -10px;
  top: 12px;
  height: 14px;
  width: 3px;
  background: #A87A03;
}
.aboutM p:after{
  content: " ";
display: inline-block;
height: 6px;
width: 6px;
border-width: 2px 2px 0 0;
border-color: #C8C8CD;
border-style: solid;
position: absolute;
top: 50%;
margin-top: -4px;
right: 2px;
transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
text-align: right;
color: #999999;
font-size: 17px;
 
}
.aboutM ul li{
  float: left;
  /* margin:  5px; */
  margin-right: 3px;
  margin-top: 5px;
}
.aboutM ul li a{
  display: block;
}
.aboutM ul li a img{
  width: 64px;
  display: block;
  height: 100px;
  border: solid 2px #c89A03;
  padding: 2px;
}
</style>

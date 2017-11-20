<template>
  <div>
    <router-view :numTrans="user"></router-view>
    <div class="tabbar">
      <tabbar v-if="user">
        <tabbar-item  selected  link="/">
          <i slot="icon" class="fa fa-home"></i>
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item  link="/inform">
          <i slot="icon" class="fa fa-weixin"></i>
          <span slot="label">消息</span>
        </tabbar-item>
        <tabbar-item link="/shopping">
          <i slot="icon" class="fa fa-shopping-basket "></i>
          <span slot="label">商城</span>
        </tabbar-item>
        <tabbar-item link="/aboutMe">
          <i slot="icon" class="fa fa-star"></i>
          <span slot="label">我</span>
        </tabbar-item>
      </tabbar>
      <tabbar v-else>
        <!-- <tabbar-item  selected @click.native="login"  link="/">
          <i slot="icon" class="fa fa-home"></i>
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item @click.native="login" link="/inform">
          <i slot="icon" class="fa fa-weixin"></i>
          <span slot="label">消息</span>
        </tabbar-item>
        <tabbar-item @click.native="login" link="/shopping">
          <i slot="icon" class="fa fa-shopping-basket "></i>
          <span slot="label">商城</span>
        </tabbar-item>
        <tabbar-item @click.native="login" link="/aboutMe">
          <i slot="icon" class="fa fa-star"></i>
          <span slot="label">我</span>
        </tabbar-item> -->
      </tabbar>
    </div>

  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
export default {
  components: {
    Tabbar,
    TabbarItem
  },
  data:function(){
    return {
      user:'',
      isLeft: false,
    }
  },
  created:function(){
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
  methods:{
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
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
  // overflow: hidden;
}
div.tabbar{
  position: fixed;
  bottom: 0;
  width: 100%;
}
.hello{
  transition: all .5s;
}
.tabbar{
  transition: all .5s;
}

</style>

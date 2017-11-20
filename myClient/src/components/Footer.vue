<template>
    <div class="footers">
        <div class="tabbar">
      <tabbar>
        <tabbar-item show-dot link="/">
          <i slot="icon" class="fa fa-home"></i>
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item show-dot link="/message">
          <i slot="icon" class="fa fa-weixin"></i>
          <span slot="label">消息列表</span>
        </tabbar-item>
        <tabbar-item selected link="/contact">
          <i slot="icon" class="fa fa-user"></i>
          <span slot="label">联系人</span>
        </tabbar-item>
        <tabbar-item badge="2" link="/kongjian">
          <i slot="icon" class="fa fa-star"></i>
          <span slot="label">空间动态</span>
        </tabbar-item>
      </tabbar>
      </div>
    </div>

</template>


<script>
import { Tabbar, TabbarItem } from "vux";
export default {
  data: function() {
    return {};
  },
  components: {
    Tabbar,
    TabbarItem
  }
};
</script>

<style scoped>
div.tabbar {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1;
}
</style>

<template>
  <div class="main">

    <headers> </headers>
    <div>
      <a class="search" href="">
        <i class="fa fa-search"></i> 重庆回锅肉</a>
    </div>
    <div class="icon">
      <swiper auto dots-position="center">

        <swiper-item v-for="list in lists">
          <ul>
            <li v-for="item in list">
            <!--<img src="{{item.img}}" alt="">-->
              <img :src="item.img" alt="">
              <span>{{item.name}}</span>
              <!--<img src="../assets/1.jpg" alt="">-->
            </li>
          </ul>
        </swiper-item>
      </swiper>
    </div>
    <div class="banner">
      <Swiper :list="baseList" v-model="demo01_index" auto></Swiper> 
    </div>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'
import Headers from './Header'
import { Swiper, SwiperItem } from 'vux'
const baseList = [{
  url: 'javascript:',
  img: 'https://static.vux.li/demo/1.jpg',
  title: '送你一朵fua'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/2.jpg',
  title: '送你一辆车'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/3.jpg',
  title: '送你一次旅行',
  fallbackImg: 'https://static.vux.li/demo/3.jpg'
}]
export default {
  components: {
    Group,
    Cell,
    Headers,
    Swiper,
    SwiperItem,
    
    
  },
  data: function() {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!',
      foodLists: [
        {
          name: '小吃馆',
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509032190217&di=4fdaf13b8e6fd0cc7479569e398ddb0a&imgtype=0&src=http%3A%2F%2Fnews.winshang.com%2Fmember%2FFCK%2F2015%2F7%2F28%2F2015728154432515198x.jpg'
        },
        {
          name: '能量西餐',
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509032306391&di=c3e1117936c79338a974a1f54feb474a&imgtype=0&src=http%3A%2F%2Fimg.qqzhi.com%2Fupload%2Fimg_0_3516350557D790940751_23.jpg'
        },
        {
          name: '新商家',
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509032332359&di=d95e087e29cc1356f6712d8a20fa0431&imgtype=0&src=http%3A%2F%2Fis2.mzstatic.com%2Fimage%2Fthumb%2FPurple69%2Fv4%2Fa2%2Fee%2F4c%2Fa2ee4ced-210f-b6fe-3c0a-af5263bdfdb6%2Fsource%2F512x512bb.jpg'
        },
        {
          name: '鲜花蛋糕',
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509627090&di=4b61590a89eae06423b5a5d6c08da0b7&imgtype=jpg&er=1&src=http%3A%2F%2Fphotocdn.sohu.com%2F20150605%2FImg414516713.jpg'
        },
        {
          name: '免配送费',
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509032190217&di=4fdaf13b8e6fd0cc7479569e398ddb0a&imgtype=0&src=http%3A%2F%2Fnews.winshang.com%2Fmember%2FFCK%2F2015%2F7%2F28%2F2015728154432515198x.jpg'
        },
        {
          name: '川鄂菜馆',
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509032306391&di=c3e1117936c79338a974a1f54feb474a&imgtype=0&src=http%3A%2F%2Fimg.qqzhi.com%2Fupload%2Fimg_0_3516350557D790940751_23.jpg'
        },
        {
          name: '无辣不欢',
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509032332359&di=d95e087e29cc1356f6712d8a20fa0431&imgtype=0&src=http%3A%2F%2Fis2.mzstatic.com%2Fimage%2Fthumb%2FPurple69%2Fv4%2Fa2%2Fee%2F4c%2Fa2ee4ced-210f-b6fe-3c0a-af5263bdfdb6%2Fsource%2F512x512bb.jpg'
        },
        {
          name: '送药上门',
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509627090&di=4b61590a89eae06423b5a5d6c08da0b7&imgtype=jpg&er=1&src=http%3A%2F%2Fphotocdn.sohu.com%2F20150605%2FImg414516713.jpg'
        },
        {
          name: '美事',
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509032190217&di=4fdaf13b8e6fd0cc7479569e398ddb0a&imgtype=0&src=http%3A%2F%2Fnews.winshang.com%2Fmember%2FFCK%2F2015%2F7%2F28%2F2015728154432515198x.jpg'
        },
        {
          name: '美团超市',
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509032306391&di=c3e1117936c79338a974a1f54feb474a&imgtype=0&src=http%3A%2F%2Fimg.qqzhi.com%2Fupload%2Fimg_0_3516350557D790940751_23.jpg'
        },
        {
          name: '生鲜果蔬',
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509032332359&di=d95e087e29cc1356f6712d8a20fa0431&imgtype=0&src=http%3A%2F%2Fis2.mzstatic.com%2Fimage%2Fthumb%2FPurple69%2Fv4%2Fa2%2Fee%2F4c%2Fa2ee4ced-210f-b6fe-3c0a-af5263bdfdb6%2Fsource%2F512x512bb.jpg'
        },
        {
          name: '甜点音频',
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509627090&di=4b61590a89eae06423b5a5d6c08da0b7&imgtype=jpg&er=1&src=http%3A%2F%2Fphotocdn.sohu.com%2F20150605%2FImg414516713.jpg'
        },
        {
          name: '正餐优选',
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509032190217&di=4fdaf13b8e6fd0cc7479569e398ddb0a&imgtype=0&src=http%3A%2F%2Fnews.winshang.com%2Fmember%2FFCK%2F2015%2F7%2F28%2F2015728154432515198x.jpg'
        },
        {
          name: '美团专送',
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509032306391&di=c3e1117936c79338a974a1f54feb474a&imgtype=0&src=http%3A%2F%2Fimg.qqzhi.com%2Fupload%2Fimg_0_3516350557D790940751_23.jpg'
        },
        {
          name: '夜宵',
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509032332359&di=d95e087e29cc1356f6712d8a20fa0431&imgtype=0&src=http%3A%2F%2Fis2.mzstatic.com%2Fimage%2Fthumb%2FPurple69%2Fv4%2Fa2%2Fee%2F4c%2Fa2ee4ced-210f-b6fe-3c0a-af5263bdfdb6%2Fsource%2F512x512bb.jpg'
        },
        {
          name: '跑腿代购',
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509627090&di=4b61590a89eae06423b5a5d6c08da0b7&imgtype=jpg&er=1&src=http%3A%2F%2Fphotocdn.sohu.com%2F20150605%2FImg414516713.jpg'
        },

      ],
      baseList,
      demo01_index: 0,
    }
  },
  computed: {
    lists: function() {
      // 以数字8为分割线, 每个轮播图中有八个菜单
      // 将原数组分割[[8],[8]]
      var num = 8;
      var arr = [];
      // var arr1 = []
      var start = 0;
      var count = Math.ceil(this.foodLists.length / 8);
      for (var i = 0; i < count; i++) {
        // console.log(i)
        arr.push(this.foodLists.slice(start, start + 8));
        start += 8;

      }
      console.log(arr)
      return arr;
    }
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}

.logo {
  width: 100px;
  height: 100px
}

.main .search {
  font-size: 12px;
  color: #aaa;
  background: #ccc;
  display: block;
  margin: 10px auto;
  border-radius: 12px;
  width: 90%;
  padding: 3px 10px;
}

.icon img {
  width: 40px;
  height: 40px;
}

.icon ul {
  overflow: hidden;
  list-style: none;
}

.icon ul li {
  float: left;
  width: 25%;
  text-align: center;
}

.icon ul li span {
  display: block;
  font-size: 12px;
}

.vux-slider>.vux-indicator,
.vux-slider .vux-indicator-right {
  top: 130px;
}
</style>
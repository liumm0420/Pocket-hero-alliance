<template>
    <div class="setss">
        <x-header>设置</x-header>
        <box gap="10px 10px">
        <cell title="关于我们"  is-link></cell>
         <cell title="意见反馈" value="QQ:784323133" is-link></cell>  
         <x-button @click.native="tuichu" type="warn">退出</x-button> 
        </box>
        <alert v-model="show" :title="title"  @on-show="onShow" @on-hide="onHide">
        {{content}}
      </alert>
    </div>
</template>

<script>
import { XHeader , Group ,Cell ,XButton ,Box ,Alert} from 'vux'

export default {
    
  data:function(){
      return{
          show: false,
      title:'',
      content:'',
      success:false,
      user:''
      }
  },
  methods:{
      tuichu:function(ev){
          
           var that = this;
      ev.preventDefault();
      console.log(ev);
      this.$axios.get('/lol/tuichu').then(function(result){
          if(result.data.error == 0){
              that.success = true
          that.title = '成功'
          that.content = result.data.message
          that.show =true;
        //   that.password = ''
        //   that.name = ''
          }

      }).catch(function(err){
          console.log(err);
      })
      },
      onHide () {
      console.log('on hide')
      if(this.success){
        location.href = '/'
      }
    },
    onShow () {
      console.log('on show')

    },
  },
  components: {
    XHeader,
    Group,
    Cell,
    XButton,
    Box,
    Alert
  },
  mounted:function(){
      var that = this;
      $(".tabbar").css("margin-left", "320px");
  }
}
</script>

<style scoped>
.setss button{
    margin-top: 50px;   
}
</style>
 
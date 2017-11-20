<template>
    <div class="setss">
        <x-header   > 发布</x-header>
        <box gap="10px 10px">
              <group>
        <x-input v-model="articleTitle" placeholder="题目"></x-input>
      <x-textarea v-model="articleContent" :max="200" name="description" placeholder="内容"></x-textarea> 
           </group>
           <input type="file"  @change="getFile($event)" >
         <x-button @click.native="submitForm($event)" type="primary">发表</x-button> 
        </box>
        <alert v-model="show" :title="title"  @on-show="onShow" @on-hide="onHide">
        {{content}}
      </alert>
    </div>
</template>

<script>
import { XHeader , Group ,Cell ,XButton,XInput ,XTextarea ,Box ,Alert} from 'vux'

export default {
    
  data:function(){
      return{
          show: false,
      title:'',
      content:'',
      success:false,
      user:'',
      articleTitle:'',
    articleContent:'',
    file : ''
      }
  },
  methods:{
       getFile(event) {
            this.file = event.target.files[0];
            console.log(this.file);
          },
      submitForm(event){
          
           var that = this;
      event.preventDefault();
      console.log(event);
      let formData = new FormData();
            formData.append('articleTitle', this.articleTitle);
            formData.append('articleContent', this.articleContent);
            formData.append('file', this.file);
            
      this.$axios.post('/lol/fabu', {articleTitle:that.articleTitle,articleContent:that.articleContent,file:that.file.name}).then(function(result){
          if(result.data.error == 0){
              that.success = true
          that.title = '成功'
          that.content = result.data.message
          that.show =true;
        //   that.password = ''
        //   that.name = ''
          }else{
            // alert(result.data.message);
          that.title = '评论失败'
          that.success = false
          that.content = result.data.message
          that.show =true;
          that.articleTitle = ''
          that.articleContent = ''
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
    Alert,XInput ,XTextarea
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

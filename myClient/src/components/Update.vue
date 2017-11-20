<template>
    <div class="setss">
        <x-header   > 修改</x-header>
        <box gap="10px 10px">
              <group>
        <x-input v-model="articleTitle" placeholder="题目"></x-input>
      <x-textarea v-model="articleContent" :max="200" name="description" placeholder="内容"></x-textarea> 
           </group>
           <input type="file"  @change="getFile($event)" >
         <x-button @click.native="submitForm($event)" type="primary">修改</x-button> 
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
    file : '',
    article_id:''
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
    //   console.log(event);
      var _id = this.$route.params
      let formData = new FormData();
            formData.append('articleTitle', this.articleTitle);
            formData.append('articleContent', this.articleContent);
            formData.append('file', this.file);
            
      this.$axios.post('/lol/update', { _id: _id,articleTitle:that.articleTitle,articleContent:that.articleContent,file:that.file.name}).then(function(result){
          if(result.data.error == 0){
              that.success = true
          that.title = '成功'
          that.content = result.data.message
          that.show =true;
          that.article_id = result.data.article_id
          }else{
            that.title = '修改失败'
          that.success = false
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
        location.href = '#/article/'+this.article_id
        // location.reload();
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
      var _id = this.$route.params
      this.$axios.post('/lol/articleOne',_id).then(function(result){
          console.log(result.data.message);
          if(result.data.error == 0){
              that.articleTitle = result.data.message.title;
              that.articleContent = result.data.message.content
          }
      }).catch(function(err){
          console.log(err);
      })
  }
}
</script>

<style scoped>
.setss button{
    margin-top: 50px;   
}
</style>

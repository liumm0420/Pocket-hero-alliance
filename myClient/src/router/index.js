// 导入vue
import Vue from 'vue';

// 导入路由
import VueRouter from 'vue-router';
// 导入路径所对应的组件
import Home from '../components/HelloFromVux'
import Hello from '../components/HelloForMe'
import Register from '../components/Register'
import Sets from '../components/Sets'
import AboutMe from '../components/AboutMe'
import Inform from '../components/Inform'
import Shopping from '../components/Shopping'
import Fabu from '../components/Fabu'
import ArticleParticulars from '../components/ArticleParticulars'
import ArticleReply from '../components/ArticleReply'
import Users from '../components/Users'
import Good from '../components/Good'
import ShopCart from '../components/ShopCart'
import Update from '../components/Update'
import Attention from '../components/Attention'
import BeAttention from '../components/BeAttention'
Vue.use(VueRouter);

// 路由匹配
const routes = [{
  path: '/',
  component: Hello
},
{
  path: '/update/:article_id',
  component: Update
},
{
  path: '/attention/:user_id',
  component: Attention
},
{
  path: '/beAttention/:user_id',
  component: BeAttention
},

{
  path: '/good/:good_id',
  component: Good
},
{
  path: '/shopCart',
  component: ShopCart
},
{
  path: '/users/:user_id',
  component: Users
}
,
{
  path: '/replys/:article_id',
  component: ArticleReply
},
{
  path: '/article/:article_id',
  component: ArticleParticulars
},
{
  path: '/register',
  component: Register
},
{
  path: '/sets',
  component: Sets
},
{
  path: '/shopping',
  component: Shopping
},{
  path: '/inform',
  component: Inform
},
{
  path: '/aboutMe',
  component: AboutMe
},
{
  path: '/fabu',
  component: Fabu
}]


// 导出实例
export default new VueRouter({
  routes
})

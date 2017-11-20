const mongoose = require('mongoose');
const shortid = require('shortid');
const DbSet = require('./db')
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    //用户的ID
    _id:{
        type:String,
        default:shortid.generate,
        unique:true //id经常会被查询，所以，把ID作为索引
    },
    //用户名
    name:{
        type:String,
        require:true
    },
    //密码
    password:{
        type:String,
        require:true
    },
    
    //个人简介
    motto:{
        type:String,
        default:'这家伙很懒,什么都没有留下..'
    },
    //个人头像
    avatar:{
        type:String,
        default:'/static/img/default.jpg'
    },
    //创建时间
    create_time:{
        type:Date,
        default:Date.now
    },
    // 更新时间
    update_time:{
        type:Date,
        default:Date.now
    },
    // 文章数量
    article_count:{
        type:Number,
        default:0
    },
    // 回复数量
    reply_count:{
        type:Number,
        default:0
    },
    // 积分
    score:{
        type:Number,
        default:2000
    },
    // 关注量
    follows:{
        type:Number,
        default:0
    },
    // 被关注量
    be_followed:{
        type:Number,
        default:0
    },
    // 已购买的商品
    shopping:{
        type:Array
    },
    // 购物车
    shoppingCart:{
        type:Array
    },
    // 关注的人
    attention:[
        {
            "_id": String,
            "name":String,
            "avatar":String
        }
    ]

    ,
    // 被关注的人
    be_attention:[
        {
            "_id": String,
            "name":String,
            "avatar":String
        }
    ]

})

// 设置静态方法
UserSchema.statics = {
    /// 通过id查找用户，并返回数据
    getUserById:(id, callback) => {
        User.findOne({'_id':id}).then((user)=>{
            callback(null, user);
        }).catch((err)=>{
            callback(err);
        })
    },
    // 通过name查找用户
    getUserByName:(name, callback) => {
        User.findOne({'name':name}).then((user)=>{
            callback(null, user);
        }).catch((err)=>{
            callback(err);
        })
    },
    
    // 通过多个名称，获取多个用户信息  $in
//  { field: { $in: [<value1>, <value2>, ... <valueN> ] } }
    getUsersByNames:(users, callback) =>{
        User.find({name:{$in:users}}).then((users) =>{
            callback(null, users);
        }).catch((err) =>{
            callback(err);
        })
    }
}


const User = mongoose.model('User',UserSchema);
module.exports = User;








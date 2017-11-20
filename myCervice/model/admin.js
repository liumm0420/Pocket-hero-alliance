
const db = require('./db');
const mongoose = require('mongoose');

var adminSchema = mongoose.Schema({
    adname:String,
    password:String,
    email:String,
    time:Date
})

// // 当前的postSchma添加方法
// adminSchema.methods.timeFabu = function(){
//     console.log('时间计算中');
//     var now = new Date();
//     // 设置文章发布的时间格式
//     var times = {
//         date:now,
//         year:now.getFullYear(),
//         month:now.getFullYear() + '-' + (now.getMonth() + 1 ),
//         day:now.getFullYear() + '-' + (now.getMonth() + 1 ) + '-' + now.getDate(),
//         minute:now.getFullYear() + '-' + (now.getMonth() + 1 ) + '-' + now.getDate() +
//                 ' ' + ( now.getHours() < 10 ? '0':'' ) + now.getHours() +
//                 ':' + ( now.getMinutes() < 10 ? '0' : '' ) + now.getMinutes()
//     /// 毫秒的时间
//     }
//     return times;
// }

var AdModel = mongoose.model('admin',adminSchema);


module.exports = AdModel;

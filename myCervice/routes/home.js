const User = require('../model/User');
var express = require('express');
// 数据验证模块，
const validator = require('validator');
const Dbset = require('../model/db');
const setting = require('../setting');
var router = express.Router();

exports.guanzhu = (req,res,next)=>{
    console.log(req.body.user_id);
    console.log('123')
    User.getUserById(req.session.user._id,(err,user)=>{
        if (err) {
            return res.json({error:1,err:err});
        }
        console.log('1233')
        isCun = false
        user.attention.forEach(function(element) {
            if(element._id ==req.body.user_id ){
                isCun = true
            }
        });
        if(isCun){
            console.log('1233')
            return res.json({error:1,message:'已经关注过了'});
        }
        console.log('12334')
        User.getUserById(req.body.user_id,(err1,users)=>{
            if (err1) {
                return res.json({error:1,err:err1});
            }
            var arr = {'_id':users._id,'name':users.name,"avatar":users.avatar}
            user.attention.push(arr);
            user.follows += 1
            user.save();
            req.session.user = user
            var arr2 = {'_id':user._id,'name':user.name,"avatar":users.avatar}
            users.be_attention.push(arr2)
            users.be_followed +=1
            users.save();
            console.log('1233')
            res.json({error:0,user:users,session:user})

        })
       
        // res.json({error:0,user:user,session:req.session.user})
    })
}
exports.userOne = (req,res,next)=>{
    console.log(req.body.user_id);
    User.getUserById(req.body.user_id,(err,user)=>{
        if (err) {
            return res.json({error:1,err:err});
        }
        res.json({error:0,user:user,session:req.session.user})
    })
}
exports.userUpdate = (req,res,next)=>{
    // console.log(req.body);
    User.getUserById(req.body._id,(err,user)=>{
        if (err) {
            return res.json({error:1,err:err});
        }
        // res.json({error:0,user:user,session:req.session.user})
        user.avatar = req.body.url
        user.motto = req.body.motto;
        user.save();
        req.session.user = user;
       res.json({error:0,user:user,session:req.session.user,message:'修改成功!!'})
    })
}
exports.register = (req, res, next) => {
    console.log(req.body);

    // 服务端进行数据验证
    let name = req.body.name;
    let password = req.body.password;
    
    // 错误数据 / 验证失败的数据
    let error = '';
    
    if (!validator.matches(name, /^[a-zA-Z][a-zA-Z0-9_]{4,11}$/, 'g')) {
        error = '用户名不合法，以字母开头，数字、字母、_';
    }
    console.log('123')
    if (!validator.matches(password, /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{5,11}/, 'g')) {
        error = '密码不合法，长度为5-11';
    }
    console.log('123')
    if (error) {
        return res.json({
            error: 1,
            message: error
        });
    } 
    User.findOne({
        name: name
    }).then((user) => {
        if (user) {
            return res.json({error:1,message:'用户名已存在'});
        }
        // 存储数据
        // 密码加密
        let newPsd = Dbset.encrypt(password, setting.PSDkey);
        req.body.password = newPsd;
        console.log(req.body);

        Dbset.addOne(User, req, res, '注册成功!!');
    }).catch((err) => {
        res.end(err);
    })


}
exports.login = (req, res, next) => {
    console.log(req.body);

    // 服务端进行数据验证
    let name = req.body.name;
    let password = req.body.password;
    
    // 错误数据 / 验证失败的数据
    let error = '';
    
    if (!validator.matches(name, /^[a-zA-Z][a-zA-Z0-9_]{4,11}$/, 'g')) {
        error = '用户名不合法，以字母开头，数字、字母、_';
    }
 
    if (!validator.matches(password, /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{5,11}/, 'g')) {
        error = '密码不合法，长度为5-11';
    }
    
    if (error) {
        return res.json({
            error: 1,
            message: error
        });
    } 
    // 密码加密
    let newPsd = Dbset.encrypt(password, setting.PSDkey);
    req.body.password = newPsd;

    User.findOne({
        name: name,
       
    }).then((user) => {
        if (!user) {
            return res.json({error:1,message:'用户名不存在,请注册'});
        }
        // 存储数据
        if(user.password != req.body.password){
            return res.json({error:1,message:'密码错误,请重新输入'});
        }
        req.session.user = user;
        res.json({error:0,message:'登录成功'})
        console.log(req.session)
        
    }).catch((err) => {
        res.json({error:1,message:err});
    })


}
exports.session=(req,res,next) =>{
    // console.log(req.session);
    if(req.session.user){
        res.json({error:0,message:req.session.user})
    }else{
        res.json({error:1})
    }
   
}
exports.tuichu=(req,res,next) =>{
    // console.log(req.session);
    // res.json({error:0,message:req.session.user})
    req.session.user = null;
    res.json({error:0,message:'退出成功'})
}
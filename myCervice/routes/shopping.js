const User = require('../model/User');
var express = require('express');
// 数据验证模块，
const validator = require('validator');
const Dbset = require('../model/db');
const setting = require('../setting');
const Goods = require('../model/tianjia');
var router = express.Router();

exports.qingk = (req, res, next) => {
    User.getUserById(req.session.user._id, (err, user) =>{
        if (err) {
            return res.json({
                err: err
            })
        }
        user.shoppingCart = [];
        user.save();
        req.session.user = user;
        res.json({error:0,message:'清除成功!!'})
    })
}

exports.index = (req, res, next) => {
    // console.log('qwe')
    Goods.find().exec(function (err, goods) {
        if (err) {
            return res.json({
                err: err
            })
        }
        res.json({
            error: 0,
            message: goods
        });

    })


}
exports.goodOne = (req, res, next) => {
    // console.log('qwe')
    // console.log(req.body.good_id)
    Goods.findById(req.body.good_id).exec(function (err, good) {
        if (err) {
            return res.json({
                err: err
            })
        }
        // console.log(good)
        res.json({
            error: 0,
            message: good
        });

    })


}
exports.payCart = (req, res, next) => {
    console.log(req.body.shop);
    User.getUserById(req.session.user._id, (err, user) => {
        if (err) {
            return res.json({
                err: err
            })
        }
        req.body.shop.forEach(function (element) {
            user.shopping.push(element);
        })
        var arr = [];
        var num = 0
        user.shoppingCart.forEach(function (element, index) {
            req.body.shop.forEach(function (ele) {

                if (ele._id == element._id) {
                    num += ele.price
                    arr.push(index);
                }
            })
        })
        console.log(arr)

        for (var i = 0; i < arr.length; i++) {
            user.shoppingCart.splice(arr[i] - i, 1);
        }
        user.score -= num
        user.save();
        req.session.user = user;
        res.json({
            error: 0,
            message: '结算成功'
        })
    })
}
exports.pay = (req, res, next) => {
    // console.log('qwe')
    // console.log(req.body.good_id)
    Goods.findById(req.body.good_id).exec(function (err, good) {
        if (err) {
            return res.json({
                err: err
            })
        }
        console.log(req.session.user._id)
        User.getUserById(req.session.user._id, (err1, user) => {
            // console.log(user);
            if (err1) {
                return res.json({
                    error: 1,
                    err: err1
                });
            }
            // console.log('123')
            if (user.score - good.price < 0) {
                return res.json({
                    error: 1,
                    message: '金币不足,快去赚取金币吧!'
                })
            }
            if (user.shopping.length < 1) {
                user.shopping.push(good);
                user.score = user.score - good.price
                user.save()
                req.session.user = user;
                return res.json({
                    error: 0,
                    message: '购买成功!!!'
                })
            }
            var isCun = false
            user.shopping.forEach(function (element) {
                if (element._id == req.body.good_id) {
                    isCun = true
                }
            });
            if (isCun) {
                return res.json({
                    error: 1,
                    message: '已拥有,不能重复购买哦!!'
                })
            }

            console.log('123123')
            user.shopping.push(good);
            user.score = user.score - good.price
            user.save()

            req.session.user = user;
            res.json({
                error: 0,
                message: '购买成功!!'
            })
        })


    })


}
exports.join = (req, res, next) => {
    console.log(req.body.good_id)
    Goods.findById(req.body.good_id).exec(function (err, good) {
        if (err) {
            return res.json({
                err: err
            })
        }
        console.log(req.session.user._id)
        User.getUserById(req.session.user._id, (err1, user) => {
            // console.log(user);
            if (err1) {
                return res.json({
                    error: 1,
                    err: err1
                });
            }
            // console.log('123')

            // if(user.shoppingCart.length<1){
            //     user.shoppingCart.push(good);

            //     user.save()
            //     req.session.user = user;
            //     return res.json({error:0,message:'购买成功!!!'})
            // }
            var isCun = false
            user.shoppingCart.forEach(function (element) {
                if (element._id == req.body.good_id) {
                    isCun = true
                }
            });
            user.shopping.forEach(function (element) {
                if (element._id == req.body.good_id) {
                    isCun = true
                }
            });
            if (isCun) {
                return res.json({
                    error: 1,
                    message: '已拥有,不能重复添加哦!!'
                })
            }

            console.log('123123')
            user.shoppingCart.push(good);

            user.save()

            req.session.user = user;
            res.json({
                error: 0,
                message: '添加购物车成功!!'
            })
        })


    })
}
exports.myCart = (req, res, next) => {
    console.log('324')
    User.getUserById(req.session.user._id, (err, user) => {
        if (err) {
            return res.json({
                error: 1,
                err: err
            });
        }
        console.log('123')
        // console.log(user.shoppingCart)
        res.json({
            error: 0,
            cart: user.shoppingCart,
            session: req.session.user
        })
    })
}
exports.shopSearch = (req, res, next) => {
    console.log(req.body.search);
    var search = req.body.search;
    var str = RegExp(search, 'i')
    Goods.find({ name: str }).sort({ 'create_time': -1 }).exec(function (err, goods) {
        
        if (err) {
            res.json({ error: 1, message: err })
            return
        }
        res.json({
            error: 0,
            message: goods
        })
        
    })
}
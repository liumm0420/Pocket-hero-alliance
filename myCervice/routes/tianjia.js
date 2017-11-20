const express = require('express');
const router = express.Router();
// multer中间件,主要梳理multipart/form-data类型的表单数据
// 主要作用用于文件上传
const multer = require('multer');
const GoodsModel = require('../model/tianjia')
const fs = require('fs');
//  设置文件磁盘存储
var storage = multer.diskStorage({
    // 文件存储的路径
    destination: 'public/uploads',
    // 文件名称设置
    filename: function (req, res, cb) {
        // var filename = req.cookies.username;
        cb(null, new Date().getTime() + '.jpg');
    }
})
// 通过Multer处理当前文件的存储
var upload = multer({ storage: storage });


exports.tianjiaI = (req, res, next) =>{
    res.render('tianjia', {
                title: '添加商品',
                
            })
}

exports.tianjia = (req, res, next) =>{
    console.log(req.body);
    // console.log(req.file);
    var arr = [];
    arr.push(req.body.jisha)
    arr.push(req.body.shengcun)
    arr.push(req.body.zhugong)
    arr.push(req.body.wuli)
    arr.push(req.body.mofa)
    arr.push(req.body.fangyu)
    var goods = new GoodsModel({
        name: req.body.name,
        price: req.body.price,
        describe: req.body.describe,
        times: new Date().getTime(),
        photo: req.file,
        nenglis:arr
        
    })
    goods.time = goods.timeFabu();
    goods.save(function (err) {
        if (err) {
            res.json({ error: 1, message: err })
            return
        };
        res.json({ error: 0, message: '商品添加成功' })

    })

}

exports.shanchu = (req, res, next) =>{
    var filename = req.params.filename;
    
        GoodsModel.findOneAndRemove({ 'photo.filename': filename }).exec(function (err) {
            if (err) {
                res.json({ error: 1, message: err })
                return
            };
            fs.unlink('public/uploads/' + filename + '', function (err) {
                if (err) {
                    res.json({ error: 1, message: err })
                    return
                }
                res.redirect('/')
                res.end();
            })
    
        })
}

exports.xiugai = (req, res, next) =>{
    console.log('123')
    var times = req.params.times;
    // var times = new Number(time)
    console.log(times)
    GoodsModel.findOne({ times }).exec(function (err, data) {
        if (err) {
            res.json({ error: 1, message: err })
            return
        }
        console.log(data);
        if (!data) {
            res.json({ error: 1, message: '商品不存在' })
            return
        }
        res.render('xiugai', {
            title: '修改商品',
            
            data: data,
            
        })
    })
}

exports.xiugaiI = (req, res, next) =>{
    console.log(req.body)
    // console.log(req.file)
    var arr = [];
    arr.push(req.body.jisha)
    arr.push(req.body.shengcun)
    arr.push(req.body.zhugong)
    arr.push(req.body.wuli)
    arr.push(req.body.mofa)
    arr.push(req.body.fangyu)
    if(req.file){
        GoodsModel.findOneAndUpdate({ times: req.body.time }, {
            name: req.body.name,
            price: req.body.price,
            describe: req.body.describe,
            times: new Date().getTime(),
            photo: req.file,
            nenglis:arr
            
        }).exec(function (err) {
            if (err) {
                res.json({ error: 1, message: err })
                return
            }
            res.redirect('/')
            res.end();
        })
    }else{
        GoodsModel.findOneAndUpdate({ times: req.body.time }, {
            name: req.body.name,
            price: req.body.price,
            describe: req.body.describe,
            times: new Date().getTime(),
            // photo: req.file,
            nenglis:arr
            
        }).exec(function (err) {
            if (err) {
                res.json({ error: 1, message: err })
                return
            }
            res.redirect('/')
            res.end();
        })
    }
}








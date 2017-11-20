const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const AdModel = require('../model/admin');



router.get('/adzhuce', function (req, res) {
    res.render('adzhuce', {
        title: '首页',
        adname: req.session.adname,
        uname: req.session.uname
        
    })
})

router.post('/adzhuce', function (req, res) {
    console.log(req.body)
    if (req.body.password != req.body['re-password']) {
        res.json({ error: 1, message: '两次密码不同' })

        return
    }
    AdModel.findOne({ adname: req.body.adname }).exec(function (err, data) {
        if (err) {
            res.json({ error: 1, message: err })
            return
        }
        if (data) {
            res.json({ error: 1, message: '管理员账号已经注册过,请重新注册' })

            return
        }
        AdModel.find().count(function (err, count) {
            if (err) {
                res.json({ error: 1, message: err })
                return
            }
            if (count >= 3) {
                res.json({ error: 1, message: '管理员数量限制：3名,请登录' })

                return
            }
            var md5 = crypto.createHash('md5');
            // 通过算法，将密码进行加密
            var password = md5.update(req.body.password).digest('hex');

            var admin = new AdModel({
                adname: req.body.adname,
                password: password,
                email: req.body.email,
                time: new Date()
            })
            admin.save(function (err) {
                if (err) {
                    res.json({ error: 1, message: err })
                    return
                };
                res.json({ error: 0, message: '注册成功,请登录' })

                
            })
        })


    })
})
router.get('/addenglu', function (req, res) {
    res.render('addenglu', {
        title: '登录',
        adname: req.session.adname,
        uname: req.session.uname
    })
})
router.post('/addenglu', function (req, res) {
    AdModel.findOne({ adname: req.body.adname }).exec(function (err, data) {
        if (err) {
            res.json({ error: 1, message: err })
            return 
        }
        if (!data) {
            res.json({ error: 1, message: '账号不存在,请注册'})
            
            return 
        }
        var md5 = crypto.createHash('md5');
        var password = md5.update(req.body.password).digest('hex');
        if (password != data.password) {
            res.json({ error: 1, message: '用户名或密码错误'})
            
            return 
        }
        req.session.adname = data;
        res.json({ error: 0, message: '登录成功'})
        
        
    })
})
router.get('/adtuichu', function (req, res) {
    req.session.adname = null;
    // res.json({ error: 0, message: '退出成功'})
    res.redirect('/')
    res.end();
    
   
})


module.exports = router
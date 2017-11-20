const express = require('express');
const router = express.Router();
const home = require('./routes/home')
const article = require('./routes/article')
var index = require('./routes/index');
var tianjia = require('./routes/tianjia');
const shopping = require('./routes/shopping')
// const admin = require('./routes/admin.js')

const multer = require('multer');
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




router.get('/', index.index);
// 管理员 
// router.get('/tianjia',tianjia)
// router.post('/tianjia',tianjia)
// router.get('/goodsXiugai/:times',tianjia)
// router.post('/xiugai',tianjia)
// router.get('/goodsShanchu/:filename',tianjia)
router.get('/tianjia',tianjia.tianjiaI)
router.post('/tianjia', upload.single('photo'),tianjia.tianjia)
router.get('/goodsShanchu/:filename',tianjia.shanchu)
router.get('/goodsXiugai/:times',tianjia.xiugai)
router.post('/xiugai' ,upload.single('photo'),tianjia.xiugaiI)

// router.get('/adzhuce',admin)
// router.post('/adzhuce',admin)
// router.get('/addenglu',admin)
// router.post('/addenglu',admin)
// router.get('/adtuichu',admin)


// 
router.post('/register', home.register);
router.post('/login', home.login);
router.get('/session', home.session);
router.get('/tuichu', home.tuichu);
router.post('/userOne', home.userOne)
router.post('/userUpdate', home.userUpdate)

router.post('/guanzhu',home.guanzhu)
// 文章发布
router.post('/fabu', article.fabu);
// 文章修改
router.post('/update', article.update);
router.post('/delete', article.delete);
// 获取文章
router.get('/article', article.index);
router.post('/articleSearch', article.articleSearch);
router.post('/articleOne', article.articleOne)
router.post('/like', article.like);
router.post('/dislike', article.dislike);
// 回复
router.post('/reply', article.reply);
router.post('/replyAll', article.replyAll);
// 获取消息
router.get('/message', article.message);
// 获取商品信息
router.get('/shopping', shopping.index);
router.post('/goodOne', shopping.goodOne);
router.post('/shopSearch', shopping.shopSearch);
// 购买商品
router.post('/pay', shopping.pay);
router.post('/payCart', shopping.payCart);
router.post('/join', shopping.join);
router.get('/myCart', shopping.myCart);
router.get('/qingk', shopping.qingk);
module.exports = router;
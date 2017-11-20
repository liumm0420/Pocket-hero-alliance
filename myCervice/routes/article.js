const User = require('../model/User');
var express = require('express');
// 数据验证模块，
const validator = require('validator');
const Dbset = require('../model/db');
const setting = require('../setting');
const Reply = require('../model/Reply');
const Article = require('../model/Article');
const Message = require('../model/Message');
const saveMessage = require('../common/message');
var router = express.Router();


exports.message = (req, res, next) => {

    Message.getNoReadMsgs(req.session.user._id, (err, noReadMsgs) => {
        if (err) {
            return res.end(err);
        }


        res.json({
            error: 0,
            message: noReadMsgs,
            user: req.session.user
        })
    })
}
exports.articleOne = (req, res, next) => {
    // console.log(req.body);
    var _id = req.body.article_id;
    Article.getArticleById(_id, (err, article) => {
        if (err) {
            return res.end(err);
        }
       
        article.click_num += 1;
        article.save();


        if (article.author._id != req.session.user._id) {
            return res.json({
                error: 0,
                message: article,
                session: req.session.user.name,
                reply: article.last_reply,
                last_reply_author: article.last_reply_author,
                isAuthor: false
            })

        }
        res.json({
            error: 0,
            message: article,
            session: req.session.user.name,
            reply: article.last_reply,
            last_reply_author: article.last_reply_author,
            isAuthor: true
        })



    })

}
exports.replyAll = (req, res, next) => {
    // console.log(req.body);
    var _id = req.body.article_id;
    Article.getArticleById(_id, (err, article) => {
        if (err) {
            return res.end(err);
        }
        Reply.getReplysByArticleId(_id, (err, replys) => {
            if (err) {
                return res.end(err);
            }
            res.json({
                error: 0,
                message: article,
                session: req.session.user.name,
                replys: replys
            })
        })



    })

}
exports.reply = (req, res, next) => {
    let content = validator.trim(req.body.replyContent);
    // console.log(req.body);
    //  服务端的数据验证
    if (!validator.isLength(content, {
            min: 5,
            max: 200
        })) {
        // error = '文章的标题长度，不小于5个字符，不大于200个字符';
        return res.json({
            error: 1,
            message: '评论的内容长度，不小于5个字符，不大于200个字符'
        })
    }
    if (content === '') {
        // return res.end('内容不能为空');
        return res.json({
            error: 1,
            message: '内容不能为空'
        })
    }
    // 判断文章是否存在
    let article_id = req.body.article_id;
    Article.getArticleById(article_id, (err, article) => {
        if (err) {
            // return res.end(err);
            return res.json({
                error: 1,
                message: err
            })
        }
        // if(msg){
        //     return res.render('error', {
        //         message:'',
        //         error:msg
        //     })
        // }
        // console.log(article);
        //
        let reply = new Reply();
        reply.content = content;
        // 回复的那篇文章id
        reply.article_id = article_id;
        // 回复人
        reply.author = req.session.user._id;

        reply.save().then((reply) => {
            // 保存回复数据
            return reply;
        }).then((reply) => {
            //  1.当前回复作者的积分+5，回复数量+1

            User.getUserById(req.session.user._id, (err, user) => {
                if (err) {
                    return res.json({
                        error: 1,
                        message: err
                    })
                }
                user.score += 10;
                user.reply_count += 1;
                user.save();
                req.session.user = user;
            })

            return reply;
        }).then((reply) => {
            // 2.更新文章的回复数量+1，最新回复的那个人，最新回复的时间，最新的那条回复
            article.reply_num += 1;
            article.last_reply_time = new Date();
            article.last_reply = reply._id;
            article.last_reply_author = req.session.user._id;
            article.save();
            return reply;
        }).then((reply) => {
            // 3. 通知文章作者(屏蔽掉自我留言)，有人给他留言了
            if (article.author._id.toString() !== req.session.user._id.toString()) {
                saveMessage.saveReplyMessage(article_id, req.session.user._id, article.author._id, reply._id);
            }
            return reply;
        }).then((reply) => {
            // 4. 如果有@user(屏蔽掉自我@)的出现，得通知被@的那个人
            // at.sendAtMessage(content, article_id, req.session.user._id, reply._id);
            return reply;
        }).then((reply) => {
            // res.end('success');
            res.json({
                error: 0,
                message: '评论成功!'
            })
        }).catch((err) => {
            res.end(err);
        })



    })

}
exports.like = (req, res, next) => {
    // console.log(req.body);
    var _id = req.body.article_id;
    Article.getArticleById(_id, (err, article) => {
        if (err) {
            return res.end(err);
        }
        //    console.log(req.session.user.name)
        var isCun = false;
        if (req.session.user._id == article.author._id) {
            return res.json({
                error: 1,
                message: '作者自己不能点赞'
            })
        }
        article.likes.forEach(function (element) {
            if (element == req.session.user.name) {
                isCun = true
            }
        });
        article.dislikes.forEach(function (element) {
            if (element == req.session.user.name) {
                isCun = true
            }
        });

        if (isCun) {
            return res.json({
                error: 1,
                message: '点过了'
            })
        }

        article.likes.push(req.session.user.name);
        article.likes_num += 1
        // console.log(222);
        article.save().then((article) => {
            console.log('11')
            return article
        }).then((article) => {
            // console.log('123444')
            // console.log(req.session.user._id)
            // console.log(article._id)

            // console.log(article.author._id)
            saveMessage.saveZanMessage(article._id, req.session.user._id, article.author._id);
            // console.log('123')
            return article
        }).then((article) => {
            res.json({
                error: 0,
                message: article
            })
        }).catch((err) => {
            res.end(err);
        })






    })

}
exports.dislike = (req, res, next) => {
    // console.log(req.body);
    var _id = req.body.article_id;
    Article.getArticleById(_id, (err, article) => {
        if (err) {
            return res.end(err);
        }
        //    console.log(req.session.user.name)
        // console.log(req.session.user._id)
        // console.log(article.author._id)
        var isCun = false
        if (req.session.user._id == article.author._id) {
            return res.json({
                error: 1,
                message: '作者自己不能点赞'
            })
        }
        article.likes.forEach(function (element) {
            if (element == req.session.user.name) {
                isCun = true
            }
        });
        article.dislikes.forEach(function (element) {
            if (element == req.session.user.name) {
                // console.log(element)
                isCun = true

            }
        });
        if (isCun) {
            return res.json({
                error: 1,
                message: '点过了'
            })
        }

        article.dislikes.push(req.session.user.name);
        article.dislikes_num += 1
        article.save();
        saveMessage.saveCaiMessage(article._id, req.session.user._id, article.author._id);
        res.json({
            error: 0,
            message: article
        })


    })

}
exports.index = (req, res, next) => {
    let query = {}
    var page = req.query.page;
    var page = parseInt(page);
    Article.getFullArticles(query,page ,(err, articles) => {
        if (err) {
            return res.end(err);
        }

        // console.log(articles)
        res.json({
            error: 0,
            message: articles
        })
    })
    
   
}
exports.articleSearch = (req, res, next) => {
    console.log(req.body.search);
    var search = req.body.search;
    var str = RegExp(search, 'i')
    Article.find({ title: str }).sort({ 'create_time': -1 }).exec(function (err, articles) {
        
        if (err) {
            res.json({ error: 1, message: err })
            return
        }
        res.json({
            error: 0,
            message: articles
        })
        
    })
}
exports.fabu = (req, res, next) => {


    // 去掉字符前后的空格
    // 获取文章的标题、内容、分类
    let title = validator.trim(req.body.articleTitle);
    let content = validator.trim(req.body.articleContent);
    req.body.title = title;
    req.body.content = content;
    let error;

    // 服务端进行数据验证
    if (!validator.isLength(title, {
            min: 3,
            max: 30
        })) {
        error = '文章的标题长度，不小于3个字符，不大于30个字符';
    }

    if (!validator.isLength(content, 0)) {
        error = '内容不能为空';
    }
    // map()通过return 改变数组元素，形成新的数组
    // let allTabs = setting.categorys.map(function(item){
    //     // console.log(item);
    //     return item[0];
    // })
    // // console.log(allTabs);
    // if( !allTabs.includes(category) ){
    //     error = '请选择一个正确的分类';
    // }
    if (error) {
        return res.json({
            error: 1,
            message: error
        });
    }
    //  存储发布的作者id，
    req.body.author = req.session.user._id;

    // 生成实例化数据
    let newObj = new Article(req.body);
    // 存储文章
    newObj.save().then((article) => {
        // --- 修改作者的相关信息：文章发布数量+1，积分+50
        User.getUserById(req.session.user._id, (err, user) => {
            if (err) {
                return res.end(err);
            }
            user.score += 50;
            user.article_count += 1;
            user.save();
            // 更新存储在req.session.user中的数据
            req.session.user = user;
            // 跳转到相对应的文章页面
            res.json({
                error: 0,
                message: '发布成功!'
            })
        })

    }).catch((err) => {
        res.end(err);
    })


}
exports.update = (req, res, next) => {
    // 去掉字符前后的空格
    // 获取文章的标题、内容、分类
    let title = validator.trim(req.body.articleTitle);
    let content = validator.trim(req.body.articleContent);
    
    let error;
    console.log(req.body)
    
    // 服务端进行数据验证
    if (!validator.isLength(title, {
            min: 3,
            max: 30
        })) {
        error = '文章的标题长度，不小于3个字符，不大于30个字符';
    }

    if (!validator.isLength(content, 0)) {
        error = '内容不能为空';
    }
    if(req.body.articleContent == ''){
        error = '内容不能为空';
    }

    if (error) {
        return res.json({
            error: 1,
            message: error
        });
    }
    Article.getArticleById(req.body._id.article_id, (err, article) => {
        if (err) {
            return res.json({
                error: 1,
                err: err
            });   
        }
        if(req.body.file){
            article.file = req.body.file
        }

        article.title = title;
        article.content = content;
        article.save();
        res.json({
                error: 0,
                message: '修改成功!',
                article_id:article._id        
               })

    })

    // // 生成实例化数据
    // let newObj = new Article(req.body);
    // // 存储文章
    // newObj.save().then((article) => {
    //     // --- 修改作者的相关信息：文章发布数量+1，积分+50
    //     User.getUserById(req.session.user._id, (err, user) => {
    //         if (err) {
    //             return res.end(err);
    //         }
    //         user.score += 50;
    //         user.article_count += 1;
    //         user.save();
    //         // 更新存储在req.session.user中的数据
    //         req.session.user = user;
    //         // 跳转到相对应的文章页面
    //         res.json({
    //             error: 0,
    //             message: '发布成功!'
    //         })
    //     })

    // }).catch((err) => {
    //     res.end(err);
    // })


}
exports.delete = (req, res, next) =>{
    console.log(req.body._id);
    Article.findByIdAndRemove(req.body._id).exec(function(err){
        if (err) {
            return res.end(err);
           }
           User.getUserById(req.session.user._id, (err1, user) =>{
            if (err1) {
                return res.end(err1);
            }
            user.article_count += 1;
            user.save();
            req.session.user = user;
            res.json({
               error: 0,
             message: '删除成功!'
            })
            
        })
    })

    // Article.getArticleById(req.body._id, (err, article) =>{
    //     if (err) {
    //       return res.end(err);
    //      }
    //      article.deleted = true
    //      article.save()
    //     User.getUserById(req.session.user._id, (err1, user) =>{
    //         if (err1) {
    //             return res.end(err1);
    //         }
    //         user.article_count += 1;
    //         user.save();
    //         req.session.user = user;
    //         res.json({
    //            error: 0,
    //          message: '删除成功!'
    //         })
            
    //     })
    // })

}
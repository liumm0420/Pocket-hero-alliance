var express = require('express');
var router = express.Router();
const GoodsModel = require('../model/tianjia');
/* GET home page. */
// router.get('/', function (req, res) {
//     console.log('123')
//   GoodsModel.find().sort({ 'time.date': -1 }).exec(function (err, data) {
//     console.log('123')
//       if (err) {
//           res.json({ error: 1, message: err })
//           return
//       }
//       console.log('123')
//       res.render('index', {
//           title: '首页',
          
//           data: data,
//           len: 1
//       })
//   })


// })
exports.index = (req, res, next) =>{
    console.log('123')
    GoodsModel.find().sort({ 'time.date': -1 }).exec(function (err, data) {
      console.log('123')
        if (err) {
            res.json({ error: 1, message: err })
            return
        }
        console.log('123')
        res.render('index', {
            title: '首页',
            
            data: data,
            len: 1
        })
    })
  
}

 
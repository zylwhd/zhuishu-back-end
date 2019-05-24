const commentModel = require('../model/comment')
const mongoose = require('mongoose')
// const jwt = require('jsonwebtoken')
// const userModel = require('../model/user')
// const bookModel = require('../model/book')

// function verifyToken (token) {
//   return new Promise((resolve, reject) => {
//     jwt.verify(token, 'zylon', (err, data) => {
//       if (err) {
//         reject(err)
//         return
//       }
//       resolve(data.data)
//     })
//   })
// }

async function addComment (req, res, next) {
  try {
    const userId = req.user.userId
    const bookId= req.body.bookId

    const {content, index = 1} = req.body
    // const userData = await userModel.findById({
    //   user: mongoose.Types.ObjectId(userId)
    // })
    // console.log(userData)
    // const bookData = await bookModel.findById({
    //   book: mongoose.Types.ObjectId(bookId)
    // })
    // console.log(bookData)

    const comment = await commentModel.findOne({
      user: mongoose.Types.ObjectId(userId),
      book: mongoose.Types.ObjectId(bookId)
    })

    if (comment) {
      res.json({
        code: 400,
        msg: '对不起，您已评论过该书籍'
      })
    } else {
      const comment = await commentModel.create({
        user: mongoose.Types.ObjectId(userId),
        book: mongoose.Types.ObjectId(bookId),
        content,
        index
      })
      res.json({
        code: 200,
        data: comment,
        msg: '评论添加成功'
      })
    }
  } catch (err) {
    next(err)
  }
}

async function getComment (req, res, next) {
  try {
    const {userId} = req.user
    const {bookId} = req.book
    const data = commentModel.find({
      user: mongoose.Types.ObjectId(userId),
      book: mongoose.Types.ObjectId(bookId)
    }).sort({
      _id: -1
    })
    
    if (data) {
      res.json({
        code: 200,
        data
      })
    } else {
      res.json({
        code: 400,
        msg: '暂无评论记录'
      })
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  addComment,
  getComment
}

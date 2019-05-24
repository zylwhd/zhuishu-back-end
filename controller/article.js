const articleModel = require('../model/article')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const titleModel = require('../model/title')
const readListModel = require('../model/readList')

function verifyToken (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'zylon', (err, data) => {
      if (err) {
        reject(err)
        return
      }
      resolve(data.data)
    })
  })
}

async function getArticleById (req, res, next) {
  try {
    const {token} = req.headers
    const {id} = req.params
    const userData = await verifyToken(token)
    // console.log(userData)userId
    const data = await articleModel.findOne({
      titleId: mongoose.Types.ObjectId(id)
    })
    // console.log(data)
    const title = await titleModel.findById(mongoose.Types.ObjectId(data.titleId))
    // console.log(title)
    if (userData) {
      const readData = await readListModel.findOne({
        user: mongoose.Types.ObjectId(userData.userId),
        book: mongoose.Types.ObjectId(title.bookId)
      })

      if (readData) {
        await readData.set({
          title: mongoose.Types.ObjectId(id)
        })
        await readData.save()
        res.json({
          code: 200,
          data
        })
      } else {
        await readListModel.create({
          user: mongoose.Types.ObjectId(userData.userId),
          book: mongoose.Types.ObjectId(title.bookId),
          title: mongoose.Types.ObjectId(id)
        })
        res.json({
          code: 200,
          data
        })
      }
    } else {
      res.json({
        code: 200,
        data
      })
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getArticleById
}

const collectionModel = require('../model/collection')
const mongoose = require('mongoose')

async function addCollection (req, res, next) {
  try {
    const userId = req.user.userId
    const bookId= req.body.bookId
    const collection = await collectionModel.findOne({
      user: mongoose.Types.ObjectId(userId),
      book: mongoose.Types.ObjectId(bookId)
    })    
    if (collection) {
      res.json({
        code: 400,
        msg: '对不起，您已添加过该收藏'
      })
    } else {
      const collection = await collectionModel.create({
        user: mongoose.Types.ObjectId(userId),
        book: mongoose.Types.ObjectId(bookId)
      })
      res.json({
        code: 200,
        msg: '添加收藏成功'
      })
    }
  } catch (err) {
    next(err)
  }
}

async function getCollection (req, res, next) {
  try {
    const userId = req.user.userId
    let {pn = 1, size} = req.query
    pn = Number(pn)
    size = Number(size)
    const data = await collectionModel.find({
      user: mongoose.Types.ObjectId(userId),
      status: 1
    }).sort({_id: -1})
        .populate({path: 'book'})
        .skip((pn - 1) * size)
        .limit(size)
    res.json({
      code: 200,
      data
    })
  } catch (err) {
    next(err)
  }
}

async function deleteCollection (req, res, next) {
  try {
    const id = req.params.id // 获取收藏id
    const collection = await collectionModel.findById(mongoose.Types.ObjectId(id)
    )
    if (collection) {
      await collection.set({status: 0})
      await collection.save()
      res.json({
        code: 200,
        msg: '成功删除收藏'
      })
    } else {
      res.json({
        code: 400,
        msg: '该收藏已被删除'
      })
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  addCollection,
  getCollection,
  deleteCollection
}

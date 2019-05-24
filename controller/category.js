const categoryModel = require('../model/category')
const mongoose = require('mongoose')
const bookModel = require('../model/book')

async function addCategory (req, res, next) {
  try {
    const {icon, title} = req.body
    await categoryModel.create({
      icon,
      title
    })
    res.json({
      code: 200,
      msg: '添加分类成功'
    })
  } catch (err) {
    next(err)
  }
}

async function getCategory (req, res, next) {
  try {
    const data = await categoryModel.find().sort({_id: 1})
    res.json({
      code: 200,
      data
    })
  } catch (err) {
    next(err)
  }
}

async function addBookToCategory (req, res, next) {
  try {
    const {bookId,categoryId} = req.body
    const category = await categoryModel.findOne({
      _id:mongoose.Types.ObjectId(categoryId)
    })
    const book = await bookModel.findOne({
      _id: mongoose.Types.ObjectId(bookId)
    })
    if (book) {
      await category.books.push(book._id)
      await category.save()
      res.json({
        code: 200,
        msg: '分类添加书籍成功'
      })
    } else {
      res.json({
        code: 400,
        msg: '添加的书籍不存在'
      })
    }
  } catch (err) {
    next(err)
  }
}

async function getBookByCategory (req, res, next) {
  try {
    const data = await categoryModel.find()
                                    .populate('books')
                                    .sort({_id: -1})
    res.json({
      code: 200,
      data
    })
  } catch (err) {
    next(err)
  }
}

async function getBookByCategoryId (req, res, next) {
  try {
    const {id} = req.params
    const data = await categoryModel.findById(id)
                                    .populate('books')
                                    .sort({_id: -1})
    res.json({
      code: 200,
      data
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  addCategory,
  getCategory,
  addBookToCategory,
  getBookByCategory,
  getBookByCategoryId
}

const swiperModel = require('../model/swiper')
const mongoose = require('mongoose')

async function addSwiper (req, res, next) {
  try {
    const {title, img, bookId,index = 1} = req.body
    const swiper = await swiperModel.create({
      title,
      img,
      book: mongoose.Types.ObjectId(bookId),
      index
    })
    res.json({
      code: 200,
      msg: '轮播图添加成功'
    })
  } catch (err) {
    next(err)
  }
}

async function getSwiper (req, res, next) {
  try {
    let {pn = 1, size = 6} = req.query
    pn = Number(pn)
    size = Number(size)
    const data = await swiperModel
      .find({status: 1})
      .populate({path: 'book'})
      .sort({index: -1, _id: -1})
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

async function updateSwiper (req, res, next) {
  try {
    const id = req.params.id
    const {status, bookId, title, index} = req.body
    const updateData = await swiperModel.updateOne({_id: mongoose.Types.ObjectId(id)}, {
      status,
      index,
      title,
      book: mongoose.Types.ObjectId(bookId)
    })
    res.json({
      code: 200,
      msg: '轮播图更新成功',
      data: updateData
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  addSwiper,
  getSwiper,
  updateSwiper
}

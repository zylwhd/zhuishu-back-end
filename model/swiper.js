const mongoose = require('mongoose')

const swiper = new mongoose.Schema({
  title: String,
  img: String,
  book: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'book'
  },
  status: {
    type: Number,
    default: 1
  },
  index: {
    type: Number,
    default: 1
  }
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  }
})

module.exports = mongoose.model('swiper', swiper)

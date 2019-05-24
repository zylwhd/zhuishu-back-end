const mongoose = require('mongoose')

const book = new mongoose.Schema({
  title: String,
  type: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'category'
  },
  author: String,
  img: String,
  desc: String,
  index: {
    type: Number,
    default: 1
  },
  looknums: {
    type: Number,
    default: 0
  }
  // status: {
  //   type: Number,
  //   default: 1
  // }
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  }
})

module.exports = mongoose.model('book', book)

const mongoose = require('mongoose')

const title = new mongoose.Schema({
  title: String,
  bookId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'book'
  },
  index: Number,
  total: Number
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  }
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  }
})

module.exports = mongoose.model('title', title)

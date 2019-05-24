const mongoose = require('mongoose')

const collection = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user'
  },
  book: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'book'
    // unique: true
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

module.exports = mongoose.model('collection', collection)

const mongoose = require('mongoose')

const comment = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user'
  },
  book: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'book'
  },
  content: String,
  // likenums: {
  //   type: Number,
  //   default: 0
  // },
  // commentnums: {
  //   type: Number,
  //   default: 0
  // },
  index: {
    type: Number,
    default: 1
  },
  status: {
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

module.exports = mongoose.model('comment', comment)

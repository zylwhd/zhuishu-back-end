const mongoose = require('mongoose')

const smsCode = new mongoose.Schema({
  phone: {
    type: String,
    unique: true
  },
  code: String
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  }
})

module.exports = mongoose.model('smsCode', smsCode)

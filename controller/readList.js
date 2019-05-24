const readListModel = require('../model/readList')
const mongoose = require('mongoose')

async function getReadList (req, res, next) {
  try {
    const {userId} = req.user
    const data = await readListModel.find({
      user: mongoose.Types.ObjectId(userId)
    }).populate({
      path:'book'
    }).populate({
      path: 'title'
    }).sort({
      _id: -1
    })
    if (data) {
      res.json({
        code: 200,
        data
      })
    } else {
      res.json({
        code: 400,
        msg: '暂无阅读记录'
      })
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getReadList
}

const userModel = require('../model/user')
const mongoose = require('mongoose')
const smsCodeModel = require('../model/smsCode')
const validator = require('validator')
const signUtil = require('../utils/signToken')

async function register (req, res, next) {
  try {
    const {phone, password, code} = req.body
    const phoneStatus = await validator.isMobilePhone(phone, 'zh-CN');
    if (phoneStatus) {
      const user = await userModel.findOne({
        phone:phone
      })
      if (user) {
        res.json({
          code: 400,
          msg:'对不起，该用户已注册'
        })
      } else {
        const smsCode = await smsCodeModel.findOne({code}).sort({_id: -1})
        if (smsCode) {
          let smsCodeDate = new Date(smsCode.updateTime)
          let smsCodeTime = Math.round(smsCodeDate.getTime() / 1000)
          let nowTime = Math.round(Date.now() / 1000)
          if (nowTime - smsCodeTime < 60 * 5) {
            if (code === smsCode.code) {
              await userModel.create({
                phone,
                password
              })
              res.json({
                code: 200,
                msg: '注册成功'
              })
            } else {
              res.json({
                code: 400,
                msg: '验证码不正确'
              })
            }
          } else {
            res.json({
              code: 400,
              msg: '验证码已失效，请重新获取'
            })
          }
        } else {
          res.json({
            code: 400,
            msg: '验证码不正确哦'
          })
        }
      } // 用户未注册---end
    } else {
      res.json({
        code: 400,
        msg: '手机号不合法，请重新确认手机号'
      })
    }
  } catch (err) {
    nect(err)
  }
}

async function login (req, res, next) {
  try {
    const {phone, password} = req.body
    if (phone && password) {
      const user = await userModel.findOne({phone})
      if (user) {
        if (password === user.password) {
          const token = signUtil({
            userId: user._id
          })
          res.json({
            code: 200,
            data: {token}
          })
        } else {
          res.json({
            code: 400,
            msg: '密码不正确'
          })
        }
      } else {
        res.json({
          code: 400,
          msg: '用户不存在'
        })
      }
    } else if (!phone){
      res.json({
        code: 400,
        msg: '请重新确认手机号'
      })
    } else {
      res.json({
        code: 400,
        msg: '请重新确认密码'
      })
    }
  } catch (err) {
    next(err)
  }
}

async function getUserById (req, res, next) {
  try {
    const userId = req.user.userId
    const userData = await userModel.findById(mongoose.Types.ObjectId(userId))
    .select('-password')
    res.json({
      code: 200,
      data: userData
    })
  } catch (err) {
    next(err)
  }
}

async function updateUserAvatarById (req, res, next) {
  try {
    const userId = req.user.userId
    const avatar = req.body.avatar
    const userData = await userModel.findById(mongoose.Types.ObjectId(userId))
    if (userData) {
      // const avatar = userData.avatar
      await userData.set({avatar})
      await userData.save()
      res.json({
        code: 200,
        msg: '头像修改成功'
      })
    } else {
      res.json({
        code: 400,
        msg: '用户不存在'
      })
    }
  } catch (err) {
    next(err)
  }
}

async function updateUserNmById (req, res, next) {
  try {
    const {userId} = req.user
    const {nikename} = req.body
    const userData = await userModel.findById(mongoose.Types.ObjectId(userId))
    if (userData) {
      await userData.set({nikename})
      await userData.save()
      res.json({
        code: 200,
        msg: '昵称修改成功'
      })
    } else {
      res.json({
        code:400,
        msg: '用户不存在'
      })
    }
  } catch (err) {
    next(err)
  }
}

async function updateSignById (req, res, next) {
  try {
    const {userId} = req.user
    const {sign} = req.body
    const userData = await userModel.findById(mongoose.Types.ObjectId(userId))
    if (userData) {
      await userData.set({sign})
      await userData.save()
      res.json({
        code: 200,
        msg: '个性签名修改成功',
        data: userData
      })
    } else {
      res.json({
        code:400,
        msg: '用户不存在'
      })
    }
  } catch (err) {
    next(err)
  }
}

async function updateUserPwdById (req, res, next) {
  try {
    const {userId} = req.user
    const {password, changePassword} = req.body
    const userData = await userModel.findById(mongoose.Types.ObjectId(userId))
    if (userData) {
      if (password === changePassword) {
        res.json({
          code: 400,
          msg: '密码与原密码相同，请重新输入'
        })
      } else {
        await userData.set({
          password: changePassword
        })
        await userData.save()
        res.json({
          code: 200,
          msg: '密码修改成功'
        })
      }
    } else {
      res.json({
        code: 400,
        msg: '用户不存在'
      })
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  register,
  login,
  getUserById,
  updateUserAvatarById,
  updateUserNmById,
  updateUserPwdById,
  updateSignById
}

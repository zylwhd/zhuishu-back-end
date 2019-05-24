const smsCodeModel = require('../model/smsCode')
const sms = require('../utils/smsUtil')
const userModel = require('../model/user')

async function sendCode (req, res, next) {
  try {
    const {phone} = req.body
    const user = await userModel.findOne({phone})
    if (!user) {
      let sixStr = ''
      for (let i = 0; i < 6; i++) {
        sixStr += Math.floor(Math.random() * 10) + ''
      }
      const smsRes = await sms (phone, sixStr)
      if (smsRes.Code === 'OK') {
        await smsCodeModel.create({
          phone,
          code: sixStr
        })
        res.json({
          code: 200,
          msg: '短信发送成功'
        })
      } else {
        res.json({
          code: 500,
          msg: smsRes.Code 
        })
      }
    } else {
      res.json({
        code: 400,
        msg: '对不起，该手机号已被注册'
      })
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  sendCode
}

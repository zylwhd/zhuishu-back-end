const mongoose = require('mongoose')

const user = new mongoose.Schema({
  phone: {
    type: String,
    unique: true
  },
  password: String,
  nikename: String,
  sign: {
    type: String,
    default: '上天言好事'
  },
  avatar: {
    type: String,
    default: 'http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=朱一龙q版&step_word=&hs=0&pn=2&spn=0&di=154716861642&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=-1&cs=3025514658%2C2260081396&os=3917802802%2C4267517840&simid=3586123561%2C585706749&adpicid=0&lpn=0&ln=222&fr=&fmq=1557214811882_R&fm=rs10&ic=0&s=undefined&hd=0&latest=0&copyright=0&se=&sme=&tab=0&width=690&height=690&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=朱一龙&objurl=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201808%2F30%2F20180830151330_2u3Ey.jpeg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3B17tpwg2_z%26e3Bv54AzdH3Fks52AzdH3F%3Ft1%3Dlbm8mc8an&gsm=0&rpstart=0&rpnum=0&islist=&querylist=&force=undefined'
  }
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  }
})

module.exports = mongoose.model('user', user)

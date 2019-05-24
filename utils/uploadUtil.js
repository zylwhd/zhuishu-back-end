const qiniu = require('qiniu');

// 创建各种上传凭证之前，我们需要定义好其中鉴权对象mac
var accessKey = 'hiaSMM1QqBT-0Q0KywiDrpp_tXbgBz8p1mFXkoil'; // 上传凭证
var secretKey = 'A4to1dxJHlKuQ_HuoKWhdf34-J3B_dYzt4eIT5tl'; // 秘钥
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

// 最简单的上传凭证只需要AccessKey，SecretKey和Bucket就可以。
module.exports = function () {
  var options = {
    scope: 'cloud-book', // 空间名
    returnBody:  '{"key": $(key),"hash": $(etag), "url": "http://pptvjwume.bkt.clouddn.com/$(key)"}',
    expires: 3600, // 密钥的有效时间
  };
  var putPolicy = new qiniu.rs.PutPolicy(options);
  var uploadToken=putPolicy.uploadToken(mac);
  return uploadToken
}
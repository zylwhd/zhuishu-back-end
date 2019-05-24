const rq = require('request-promise')
const cheerio = require('cheerio')
const bookModel = require('../model/book')
const titleModel = require('../model/title')
const articleModel = require('../model/article')

async function getBook (req, res, next) {
  try{
    const {url ,title, author, img} = req.body
    const data = await rq.get(url)
    const $ = cheerio.load(data)
    let desc
    desc = $('meta[name = "description"]').attr('content')

    const book = await bookModel.create({
      title,
      author,
      img,
      desc
    })

    let baseUrl
    let titlesArrUrl = []
    let titleText = []
    const titleEle = $('.catalog a')
    let titleArr = url.split('/')
    titleArr.pop()
    baseUrl = titleArr.join('/') + '/'
    titleEle.each((index, item) => {
      titlesArrUrl.push(baseUrl + $(item).attr('href'))
      titleText.push($(item).text())
    })

    for(let i = 0; i < titlesArrUrl.length; i++) {
      const item = titlesArrUrl[i]
      const index = i
      const articleData = await rq.get(item)
      const $ = cheerio.load(articleData)
      const content = $('.content').text()

      const title = await titleModel.create({
        bookId: book._id,
        title: titleText[index],
        index: Number(index),
        total: titlesArrUrl.length
      })

      const article = await articleModel.create({
        bookId: book._id,
        titleId: title._id,
        content,
        index: Number(index)
      })
    }

    res.json({
      code: 200,
      msg: '成功爬取一本书'
    })
  } catch (err) {
    next(err)
  }
}

async function getBookById (req, res, next) {
  try {
    const {id} = req.params
    const data = await bookModel.findById(id)
    res.json({
      code: 200,
      data
    })
  } catch (err) {
    next(err)
  }
}

async function allBook (req, res, next) {
  try {
    const data = await bookModel.find().sort({_id: -1})
    res.json({
      code: 200,
      data
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getBook,
  getBookById,
  allBook
}

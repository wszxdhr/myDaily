const qiniu = require('qiniu')

const process = require('process')

const md5 = require('md5')

const { Command } = require('commander')

const path = require('path')

const fs = require('fs')

// 获取命令行参数
const program = new Command()
program
  .option('--ak <ak>', 'Qiniu AccessKey.')
  .option('--sk <sk>', 'Qiniu SecretKey.')
  .parse(process.argv)

const accessKey = program.ak
const secretKey = program.sk

console.log('key md5: ' + md5(accessKey + secretKey))

const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const bucket = 'blog'

// 七牛上传
const getUploadToken = (filePath, fileName) => {
  // 获取uploadToken
  const options = {
    scope: `${bucket}:${fileName}`
  }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)
  return uploadToken
}

const distDir = path.join(__dirname, 'public')

const uploadFile = (filePath, fileName) => {
  const uploadToken = getUploadToken(filePath, fileName)
  if (uploadToken) {
    console.log('uploadToken获取成功：' + fileName)
  }
  const config = new qiniu.conf.Config()
  // 空间对应的机房
  config.zone = qiniu.zone.Zone_z0
  // 是否使用https域名
  config.useHttpsDomain = true
  // 上传是否使用cdn加速
  // config.useCdnDomain = true
  const formUploader = new qiniu.form_up.FormUploader(config)
  const putExtra = new qiniu.form_up.PutExtra()
  // 文件上传
  formUploader.putFile(uploadToken, fileName, filePath, putExtra, (respErr,
    respBody, respInfo) => {
    if (respErr) {
      throw respErr
    }
    if (respInfo.statusCode === 200) {
      // console.log(respBody)
      console.log('文件上传成功：' + fileName)
      // 刷新缓存
      if (fileName === 'index.html') {
        const cdnManager = new qiniu.cdn.CdnManager(mac)
        const urlsToRefresh = [
          'https://blog-file.anymelon.com/',
          'https://xn--e1tn37a.com/'
        ]
        cdnManager.refreshUrls(urlsToRefresh, function (err, respBody, respInfo) {
          if (err) {
            throw err
          }
          if (respInfo.statusCode === 200) {
            console.log('缓存已更新：' + respInfo.statusCode)
          }
        })
      }
    } else {
      console.log(respInfo.statusCode)
      console.log(respBody)
    }
  })
}

const uploadList = []

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay (filePath) {
  // 根据文件路径读取文件，返回文件列表
  const files = fs.readdirSync(filePath)
  // 遍历读取到的文件列表
  files.forEach(function (filename) {
    // 获取当前文件的绝对路径
    const filedir = path.join(filePath, filename)
    // 根据文件路径获取文件信息，返回一个fs.Stats对象
    const stats = fs.statSync(filedir)
    const isFile = stats.isFile() // 是文件
    const isDir = stats.isDirectory() // 是文件夹
    if (isFile) {
      console.log('正在尝试上传：' + filename)
      // 增加白名单，目前只传images文件夹
      const whiteList = ['images', 'index.html']
      const filePathResult = filedir.replace(distDir + '/', 'blog/')
      for (const whiteItem of whiteList) {
        const reg = new RegExp('^blog\\\/' + whiteItem)
        if (reg.test(filePathResult)) {
          uploadList.push([filedir, filePathResult])
        }
      }
    }
    if (isDir) {
      fileDisplay(filedir) // 递归，如果是文件夹，就继续遍历该文件夹下面的文件
    }
  })
}

fileDisplay(distDir)
for (let index = 0; index < uploadList.length; index++) {
  setTimeout(() => {
    uploadFile(...uploadList.pop())
  }, index * 1000)
}

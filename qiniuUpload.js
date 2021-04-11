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

const options = program.opts()

const accessKey = options.ak
const secretKey = options.sk

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

const config = new qiniu.conf.Config()
// 空间对应的机房
config.zone = qiniu.zone.Zone_z0
// 是否使用https域名
config.useHttpsDomain = true
// 上传是否使用cdn加速
// config.useCdnDomain = true

const bucketManager = new qiniu.rs.BucketManager(mac, config)

// 获取文件列表
bucketManager.listPrefix(bucket, {
  limit: 1000,
  prefix: 'blog/images/',
}, (err, respBody, respInfo) => {
  if (err) {
    console.log(err)
    throw err
  }
  if (respInfo.statusCode === 200) {
    //如果这个nextMarker不为空，那么还有未列举完毕的文件列表，下次调用listPrefix的时候，
    //指定options里面的marker为这个值
    const existFileList = []
    // const nextMarker = respBody.marker
    // const commonPrefixes = respBody.commonPrefixes
    const items = respBody.items
    items.forEach(function(item) {
      existFileList.push(item.key)
      // console.log(item.putTime);
      // console.log(item.hash);
      // console.log(item.fsize);
      // console.log(item.mimeType);
      // console.log(item.endUser);
      // console.log(item.type);
    })

    const uploadFile = (filePath, fileName) => {
      const uploadToken = getUploadToken(filePath, fileName)
      if (uploadToken) {
        console.log('uploadToken获取成功：' + fileName)
      }
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
          // 增加白名单，目前只传images文件夹
          const whiteList = ['images']
          const filePathResult = filedir.replace(distDir + '/', 'blog/')
          for (const whiteItem of whiteList) {
            const reg = new RegExp('^blog\\\/' + whiteItem)
            // 满足白名单且满足 不在原有七牛列表中
            if (reg.test(filePathResult) && !existFileList.includes(filePathResult)) {
              console.log('正在尝试上传：' + filePathResult)
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
  } else {
    console.log(respInfo.statusCode)
    console.log(respBody)
  }
})

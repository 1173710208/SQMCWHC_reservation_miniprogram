// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const { name, tel, plot, previousSundayFormatted, currentDate} = event
  const db = cloud.database()
  const collection = db.collection('qiangci')

  try {
    return await db.collection('qiangci').add({
      data:{
        name: name,
        tel: tel,
        plot: plot,
        weekIdentifier: previousSundayFormatted,
        submitdate: currentDate
      }
     })
  } catch (error) {
    console.log(error)
  }
}

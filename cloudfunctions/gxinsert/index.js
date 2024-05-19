// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const { name, tel, doctor, plot, previousSundayFormatted, currentDate} = event
  const db = cloud.database()
  const collection = db.collection('gongxun')

  try {
    return await db.collection('gongxun').add({
      data:{
        name: name,
        tel: tel,
        doctor: doctor,
        plot: plot,
        weekIdentifier: previousSundayFormatted,
        submitdate: currentDate
      }
     })
  } catch (error) {
    console.log(error)
  }
}

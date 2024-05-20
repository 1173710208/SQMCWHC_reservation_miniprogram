// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db =cloud.database()
  const { doctor, plot, previousSundayFormatted } = event;
  const collection = db.collection('gongxun')

  try {
    return await db.collection('gongxun').where({
        doctor: doctor,
        plot: plot,
        weekIdentifier: previousSundayFormatted
      }).remove();  
  } catch (e) {    
    console.log(e)
  }
};
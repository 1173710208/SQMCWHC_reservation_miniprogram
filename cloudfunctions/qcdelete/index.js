// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db =cloud.database()
  const { plot, previousSundayFormatted } = event;
  const collection = db.collection('qiangci')

  try {
    return await db.collection('qiangci').where({
        plot: plot,
        weekIdentifier: previousSundayFormatted
      }).remove();  
  } catch (e) {    
    console.log(e)
  }
};
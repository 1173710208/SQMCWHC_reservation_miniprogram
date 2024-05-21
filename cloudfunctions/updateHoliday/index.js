// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
// 云函数入口函数
exports.main =async(event,context)=>{
  
  const { identifier, temponHoliday} = event
  const db = cloud.database()

  try{
    return await db.collection('holiday').where({
      identifier: event.identifier
    }).update({
      data:{
        identifier:"onHoliday",
        onHoliday:temponHoliday
      }
    })
  }catch(e){
    console.log(e)
  }
}
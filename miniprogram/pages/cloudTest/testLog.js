// pages/cloudTest/testLog.js
Page({
  data: {
    logs:[]
  },
  getlogs: function(){
    const that = this;
    const ui = wx.getStorageSync("openId" )
    if(!ui){
      wx.switchTab({
        url:'/pages/me/me'
      })
    }else{
      wx.cloud.callFunction({
        name: "getlogs",
        data:{openid:ui},
        success:res=>{
          console.log(res); 
          that.setData({
            logs:res.result.data
          })
          console.log(that.data.logs)
        },
        fail:res =>{console.log("res", res)}
      })
    }
  },

  onShow:function(){
    this.getlogs()
  }
})
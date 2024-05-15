// pages/cloudTest/testIndex.js
Page({

  data: {

  },

  addLog(event){
    const add =event.currentTarget.dataset.add;
    const ui = wx.getStorageSync("openId");
    console.log(ui);
    if(!ui){
      wx.switchTab({
       url:"/pages/user-center/index",
      })
    }else{
      console.log("in")
        wx.cloud.callFunction({
          name: "createlog",
          data:{
            add: add,
            date: Date.now(),
            openid: ui
          }
        })
      }
    }
})
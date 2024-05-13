const { envList } = require('../../envList');

// pages/me/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    openId: '',
    userInfo: {},
  },

  getOpenId() {
    const that = this;
    wx.showLoading({
      title: '',
    });

    wx.cloud.callFunction({
        name: 'login',
        data: {
          type: 'getOpenId',
        },
      })
      .then((resp) => {
        console.log(resp)
        that.setData({
          openId: resp.result.openid,
          userInfo: resp.result.event.userInfo
        });        
        wx.setStorageSync('openId', that.data.openId);
        wx.hideLoading();
      })
      .catch((e) => {
        that.setData({
          showUploadTip: true,
        });
        wx.hideLoading();
      });
      
  },
  
  onLoad:function(options){
    const ui= wx.getStorageSync('openId')
    this.setData({
     openId:ui.openId
    })
  },

  gotoWxCodePage() {
    wx.navigateTo({
      url: `/pages/exampleDetail/index?envId=${envList?.[0]?.envId}&type=getMiniProgramCode`,
    });
  },
});

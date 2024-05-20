// pages/qiangci/qiangci.js
const utils = require('../../utils/utils.js');

Page({
  data: {
    selectedplot:'',
    selectedTime:'',
    times: ['8:10','8:30','8:50','9:10','9:30','9:50','10:10','10:30','10:50','11:10','11:30','2:40','3:00','3:20','3:40','4:00','4:20','4:40'],
    selectedWeekday:'',
    weekdays: ['星期一','星期二','星期三','星期四','星期五','星期六'],
    showInputBox: false,
    showBookedBox: false,
    logs: [],
    logsLength: '',
    timeplots: []
  },

  showReservations(){
    const that = this;

    // Get current date  
    const currentDate = new Date();
    // Get current week day, Sunday is 0
    const currentDay = currentDate.getDay();
    // Calculate the date of the previous Sunday
    const previousSunday = new Date(currentDate);
    previousSunday.setDate(currentDate.getDate() - currentDay);
    // Format date as YYYY-MM-DD
    const year = previousSunday.getFullYear();
    const month = ('0' + (previousSunday.getMonth() + 1)).slice(-2); // 月份是从0开始的，需要加1
    const day = ('0' + previousSunday.getDate()).slice(-2);
    const weekIdentifier = year+month+day;

    wx.cloud.callFunction({
      name: "qcread",
      data:{weekIdentifier},
      success:res=>{
        console.log(res)
        that.setData({
          logs:res.result.data,
          logsLength:res.result.data.length,
          timeplots: []
        })
        //console.log(that.data.logs)
        Array.from({ length: that.data.times.length }, () => Array.from({ length: that.data.weekdays.length }, () => 0))
        let plot_arr = Array.from({ length: that.data.times.length }, () => Array.from({ length: that.data.weekdays.length }, () => 0))
        for (let i = that.data.logsLength-1; i >= 0 ; i--) {
          let plotId = that.data.logs[i].plot;
          let result = utils.extractStrings(plotId);
          //console.log(result)
          plot_arr[result.before][result.after]=that.data.logs[i];
        }
        that.setData({
          timeplots: plot_arr
        })
        //console.log(that.data.timeplots)
      },
      fail:res =>{console.log("res", res)}
    })
  },

  reserveGx: function(e) {
    const plotId = e.currentTarget.id;
    let result = utils.extractStrings(plotId);
    //console.log(result)
    this.setData({
      selectedplot: plotId,
      selectedTime: result.before,
      selectedWeekday: result.after,
      showInputBox: true
    });
  },

  bookedGx: function(e) {
    const plotId = e.currentTarget.id;
    let result = utils.extractStrings(plotId);
    //console.log(result)
    this.setData({
      selectedplot: plotId,
      selectedTime: result.before,
      selectedWeekday: result.after,
      showBookedBox: true
    });
  },

  formSubmit(e) {
    const { name, tel } = e.detail.value

    if (!name  ) {
      wx.showToast({
        title: '请输入姓名！',
        icon: 'error'
      })
      return
    }
    if(!tel){
      wx.showToast({
        title: '请输入手机号！',
        icon: 'error'
      })
      return
    }
    if(!utils.isNumeric(tel)){
      
      wx.showToast({
        title: '手机号格式错误',
        icon: 'error'
      })
      return
    }

    wx.showLoading({
      title: '预约中...',
      mask: true
    });

    const plot = this.data.selectedplot;

    // Get current date  
    const currentDate = new Date();
    // Get current week day, Sunday is 0
    const currentDay = currentDate.getDay();
    // Calculate the date of the previous Sunday
    const previousSunday = new Date(currentDate);
    previousSunday.setDate(currentDate.getDate() - currentDay);
    // Format date as YYYY-MM-DD
    const year = previousSunday.getFullYear();
    const month = ('0' + (previousSunday.getMonth() + 1)).slice(-2); // 月份是从0开始的，需要加1
    const day = ('0' + previousSunday.getDate()).slice(-2);
    const previousSundayFormatted = year+month+day;
    
    wx.cloud.callFunction({
      name: 'qcinsert',
      data: { name, tel, plot, previousSundayFormatted, currentDate},
      success: res => {
        wx.hideLoading();
        wx.showToast({
          title: '预约成功',
          icon: 'success'
        })
        this.setData({
          showInputBox: false
        });
        this.showReservations()
      },
      fail: err => {
        wx.showToast({
          title: '提交失败: ' + err.message,
          icon: 'error'
        })
      }
    })
  },

  cancelReservation(e) {
    const add =e.currentTarget.dataset.add;
    const ui = wx.getStorageSync("openId");
    //console.log(ui);
    if(!ui){
      wx.showToast({
        title: '请先登录！',
        icon: 'error'
      })
      wx.switchTab({
       url:"/pages/user-center/index",
      })
      return
    }
    if (ui != 'o5IR-5bwhJFeCNUBUt_oKb8dLjmU' && ui != '05IR-5WVjJVWK0y4-Umbu28sqR_w') {
      wx.showToast({
        title: '您无权限！',
        icon: 'error'
      })
      return
    }

    wx.showLoading({
      title: '取消中...',
      mask: true
    });

    const plot = this.data.selectedplot;

    // Get current date  
    const currentDate = new Date();
    // Get current week day, Sunday is 0
    const currentDay = currentDate.getDay();
    // Calculate the date of the previous Sunday
    const previousSunday = new Date(currentDate);
    previousSunday.setDate(currentDate.getDate() - currentDay);
    // Format date as YYYY-MM-DD
    const year = previousSunday.getFullYear();
    const month = ('0' + (previousSunday.getMonth() + 1)).slice(-2); // 月份是从0开始的，需要加1
    const day = ('0' + previousSunday.getDate()).slice(-2);
    const previousSundayFormatted = year+month+day;
    
    wx.cloud.callFunction({
      name: 'qcdelete',
      data: { plot, previousSundayFormatted},
      success: res => {
        wx.hideLoading();
        wx.showToast({
          title: '取消成功',
          icon: 'success'
        })
        this.setData({
          showBookedBox: false
        });
        this.showReservations()
      },
      fail: err => {
        wx.showToast({
          title: '取消失败: ' + err.message,
          icon: 'error'
        })
      }
    })
  },

  cancelSubmit(){
    this.setData({
      showInputBox: false,
      showBookedBox: false
    });
  },

  exportList(){

  },

  onShow:function(){
    this.showReservations();
  }
})
// pages/gongxun/gongxun.js
const utils = require('../../utils/utils.js');

Page({
  data: {
    dropdownVisible: false,
    selectedDoctor: 0,
    doctors: ['邢亚敏','王圆圆', '李亚楠', '陈丹','陈娜','杨慧','曹文','赵艳','马敏','高舒','李从军'],
    onHoliday:[0,0,0,0,0,0,0,0,0,0,0],
    selectedplot:'',
    selectedTime:'',
    times: ['8:10','8:50','9:30','10:10','10:50','11:30','2:40','3:20','4:00','4:40'],
    selectedWeekday:'',
    weekdays: ['星期一','星期二','星期三','星期四','星期五','星期六'],
    showInputBox: false,
    showBookedBox: false,
    logs: [],
    logsLength: '',
    timeplots: []
  },

  // Get the appointment information from the cloud server and display it
  showAppointments(){
    if(this.data.onHoliday[this.data.selectedDoctor]==1){
      let plot_arr = Array.from({ length: this.data.times.length }, () => Array.from({ length: this.data.weekdays.length }, () => 1))
      this.setData({
        timeplots: plot_arr
      })
      return
    }else {
      const that = this;
      const doctor = this.data.doctors[this.data.selectedDoctor];
  
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
        name: "gxread",
        data:{doctor, weekIdentifier},
        success:res=>{
          that.setData({
            logs:res.result.data,
            logsLength:res.result.data.length,
            timeplots: []
          })
          //console.log(that.data.logs)
          //Array.from({ length: that.data.times.length }, () => Array.from({ length: that.data.weekdays.length }, () => 0))
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
    }
  },

  // Show drop-down box content
  toggleDropdown: function() {
    this.setData({
      dropdownVisible: !this.data.dropdownVisible
    });
  },

  // Select an item from the drop-down box
  selectDoctor: function(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      selectedDoctor: index,
      dropdownVisible: false
    });
    this.showAppointments();
  },

  // Click on an empty time slot in the table to make an appointment
  clickEmptyCell: function(e) {
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

  // Click on an occupied time slot in the table to show the information of an appointment
  clickOccupiedCell: function(e) {
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

  // Submit appointment information form 
  submitAppointment(e) {
    //console.log(e)
    const { name, tel, radioValue } = e.detail.value

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

    const doctor = this.data.doctors[this.data.selectedDoctor];

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

    if(radioValue=="1"){
      for(let i = 0; i<this.data.weekdays.length; i++){
        if(this.data.timeplots[this.data.selectedTime][i]==0){
          let plot = this.data.selectedTime + "-" + i;
          //console.log(plot)
          wx.cloud.callFunction({
            name: 'gxinsert',
            data: { name, tel, doctor, plot, previousSundayFormatted, currentDate},
            success: res => { 
              if(i==this.data.weekdays.length-1){
                this.showAppointments();
                wx.hideLoading();
                this.setData({
                  showInputBox: false
                });  
                wx.showToast({
                  title: '预约成功',
                  icon: 'success'
                })
              }
            },
            fail: err => {
              wx.showToast({
                title: '提交失败: ' + err.message,
                icon: 'error'
              })
            }
          })
        }
      }  
    }else{           
    const plot = this.data.selectedplot;
    wx.cloud.callFunction({
      name: 'gxinsert',
      data: { name, tel, doctor, plot, previousSundayFormatted, currentDate},
      success: res => {
        wx.hideLoading();
        wx.showToast({
          title: '预约成功',
          icon: 'success'
        })
        this.setData({
          showInputBox: false
        });
        this.showAppointments()
      },
      fail: err => {
        wx.showToast({
          title: '提交失败: ' + err.message,
          icon: 'error'
        })
      }
    })
    }
  },

  // Cancel an appointment
  cancelAppointment(e) {
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
    if (ui != 'o5IR-5bwhJFeCNUBUt_oKb8dLjmU' && ui != 'o5IR-5WVjJVWK0y4-Umbu28sqR_w') {
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

    const doctor = this.data.doctors[this.data.selectedDoctor];
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
      name: 'gxdelete',
      data: { doctor, plot, previousSundayFormatted},
      success: res => {
        wx.hideLoading();
        wx.showToast({
          title: '取消成功',
          icon: 'success'
        })
        this.setData({
          showBookedBox: false
        });
        this.showAppointments()
      },
      fail: err => {
        wx.showToast({
          title: '取消失败: ' + err.message,
          icon: 'error'
        })
      }
    })
  },

  // Close the appointment form window
  closeWindow(){
    this.setData({
      showInputBox: false,
      showBookedBox: false
    });
  },

  // Switch doctors' availability this week
  switchAvailability(){
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
    if (ui != 'o5IR-5bwhJFeCNUBUt_oKb8dLjmU' && ui != 'o5IR-5WVjJVWK0y4-Umbu28sqR_w') {
      wx.showToast({
        title: '您无权限！',
        icon: 'error'
      })
      return
    }
    
    const temponHoliday = this.data.onHoliday
    if(temponHoliday[this.data.selectedDoctor]==1){
      temponHoliday[this.data.selectedDoctor] = 0;
    } else{
      temponHoliday[this.data.selectedDoctor] = 1;
    }    
    this.setData({
      onHoliday: temponHoliday
    });
    this.showAppointments();
  },

  // Triggered every time the page is displayed
  onShow:function(){
    this.showAppointments();
  }
})
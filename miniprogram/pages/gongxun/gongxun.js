// pages/gongxun/gongxun.js
Page({
  data: {
    dropdownVisible: false,
    selectedDoctor: '邢亚敏',
    doctors: ['邢亚敏','王圆圆', '李亚楠', '陈丹','陈娜','杨慧','曹文','赵艳','马敏','高舒','李从军'],
    selectedSlot:'',
    selectedTime:'',
    times: ['8:10','8:50','9:30','10:10','10:50','11:30','2:40','3:20','4:00','4:40'],
    selectedWeekday:'',
    weekdays: ['星期一','星期二','星期三','星期四','星期五','星期六'],
    showInputBox: false,
    logs: [],
    logsLength: '',
    timeSlots: []
  },

  showReservations(){
    const that = this;
    const doctor = this.data.selectedDoctor;
    const myDate = new Date();
    const year = myDate.getFullYear();
    const month = myDate.getMonth()+1;
    const weekstartday = myDate.getDate()-myDate.getDay()+1;
    console.log(year,weekstartday)
    wx.cloud.callFunction({
      name: "gxread",
      data:{doctor, year, month, weekstartday},
      success:res=>{
        //console.log(res);
        that.setData({
          logs:res.result.data,
          logsLength:res.result.data.length,
          timeSlots: []
        })
        console.log(that.data.logs)
        console.log(res.result.data.length)
        let slot_arr = Array.from(new Array(that.data.times.length), () => new Array(that.data.weekdays.length))
        for (let i = 0; i < that.data.logsLength; i++) {
          let slotId = that.data.logs[i].plot;
          // Get the 5th & 6th character of the slot id to determine tine and the day of week
          let selectedTimeIndex = parseInt(slotId.substring(4, 6),10)-1;
          let selectedWeekdayIndex = parseInt(slotId.substring(7, 8),10)-1;
          console.log(selectedTimeIndex, selectedWeekdayIndex)
          slot_arr[selectedTimeIndex][selectedWeekdayIndex]=that.data.logs[i];
        }
        console.log(slot_arr)
        that.setData({
          timeSlots: slot_arr
        })
        console.log(that.data.timeSlots)
      },
      fail:res =>{console.log("res", res)}
    })
  },

  toggleDropdown: function() {
    this.setData({
      dropdownVisible: !this.data.dropdownVisible
    });
  },

  selectItem: function(e) {
    //console.log(e);
    const index = e.currentTarget.dataset.index;
    this.setData({
      selectedDoctor: this.data.doctors[index],
      dropdownVisible: false
    });
    this.showReservations();
  },

  reserveGx: function(e) {
    console.log(e);
    const slotId = e.currentTarget.id;
    // Get the 5th & 6th character of the slot id to determine tine and the day of week
    const selectedTimeIndex = parseInt(slotId.substring(4, 6),10)-1;
    const selectedWeekdayIndex = parseInt(slotId.substring(7, 8),10)-1;
    //console.log(selectedTimeIndex); 

    this.setData({
      selectedSlot: slotId,
      selectedTime: selectedTimeIndex,
      selectedWeekday: selectedWeekdayIndex,
      showInputBox: true
    });
    //console.log(this.data.selectedSlot); 
    //console.log(this.data.selectedTime); 
    //console.log(this.data.selectedWeekday); 

  },

  formSubmit(e) {
    //console.log(e.detail.value);
    const { name, tel } = e.detail.value

    if (!name || !tel ) {
      wx.showToast({
        title: '请输入姓名和手机号！',
        icon: 'error'
      })
      return
    }
    const doctor = this.data.selectedDoctor;
    const plot = this.data.selectedSlot;
    const myDate = new Date();
    const year = myDate.getFullYear();
    const month = myDate.getMonth()+1;
    const weekstartday = myDate.getDate()-myDate.getDay()+1;
    const submitdate = myDate.getDate()
    //console.log(name, tel, doctor, plot, year, month, weekstartday, submitdate)

    wx.cloud.callFunction({
      name: 'gxinsert',
      data: { name, tel, doctor, plot, year, month, weekstartday, submitdate},
      success: res => {
        if (res.result.success) {
          wx.showToast({
            title: '预约成功',
            icon: 'success'
          })
        } else {
          wx.showToast({
            title: '提交失败: ' + res.result.error,
            icon: 'error'
          })
        }        
        this.setData({
          showInputBox: false
        });
      },
      fail: err => {
        wx.showToast({
          title: '提交失败: ' + err.message,
          icon: 'error'
        })
      }
    })
  },

  cancelSubmit(){
    this.setData({
      showInputBox: false
    });
  },

  exportList(){

  },

  
  onShow:function(){
    this.showReservations();
  }
})
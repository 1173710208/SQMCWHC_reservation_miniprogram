// pages/gongxun/gongxun.js
Page({
  data: {
    dropdownVisible: false,
    selectedItem: '选择医生',
    items: ['邢亚敏','王圆圆', '李亚楠', '陈丹','陈娜','杨慧','曹文','赵艳','马敏','高舒','李从军'],
    timeSlots: [
      { time: '8:10', mon: '', tue: '', wed: '', thu: '', fri: '', sat: '' },
      { time: '8:50', mon: '', tue: '', wed: '', thu: '', fri: '', sat: '' },
      { time: '9:30', mon: '', tue: '', wed: '', thu: '', fri: '', sat: '' },
      { time: '10:10', mon: '', tue: '', wed: '', thu: '', fri: '', sat: '' },
      { time: '10:50', mon: '', tue: '', wed: '', thu: '', fri: '', sat: '' },
      { time: '11:30', mon: '', tue: '', wed: '', thu: '', fri: '', sat: '' },
      { time: '2:40', mon: '', tue: '', wed: '', thu: '', fri: '', sat: '' },
      { time: '3:20', mon: '', tue: '', wed: '', thu: '', fri: '', sat: '' },
      { time: '4:00', mon: '', tue: '', wed: '', thu: '', fri: '', sat: '' },
      { time: '4:40', mon: '', tue: '', wed: '', thu: '', fri: '', sat: '' }
    ],
    showInputBox: false,
    inputValue: ''
  },

  toggleDropdown: function() {
    this.setData({
      dropdownVisible: !this.data.dropdownVisible
    });
  },

  selectItem: function(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      selectedItem: this.data.items[index],
      dropdownVisible: false
    });
  },

  reserveGx() {
    this.setData({
      showInputBox: true
    });
  },

  onInput(event) {
    this.setData({
      inputValue: event.detail.value
    });
  },

  submitInput() {
    if(this.data.inputValue == ''){
      wx.showToast({
        title: '请输入姓名！',
        icon: 'error'
      });
    }else {
      wx.showToast({
        title: '预约成功: ' + this.data.inputValue,
        icon: 'success'
      });
      this.setData({
        showInputBox: false,
        inputValue: ''
      });
    }
  },

  exportList(){

  }
})
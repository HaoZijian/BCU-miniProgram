// pages/login/login.js
Page({
  /**
   * Page initial data
   */
  data: {
    username: '',
    password: '',
    show: false,
    columns: [ '学生', '教师'],
    value1: '学生',
    logintype: 1,
    index: 0,
  },

  changeUsername(e) {
    this.setData({
      username: e.detail
    })
  },

  changePassword(e) {
    this.setData({
      password: e.detail
    })
  },

  onChange(event) {
    console.log(event.detail)
    var that = this
    this.setData({
      value1: event.detail.value,
      index: event.detail.index
    })
    if (this.data.index == 0) {
      that.setData({
        logintype: 1
      })
    } else if (this.data.index == 1) {
      that.setData({
        logintype: 2
      })
    }
  },

  login() {
    wx.request({
      url: 'https://bcuscm.mauac.com/applets/api.Appletslogin/appletslogin',
      method: 'POST',
      data: {
        password: this.data.password,
        username: this.data.username,
        logintype: this.data.logintype,
      },
      header: {
        'content-Type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        if (res.data.code == 0) {
          console.log(res.data.data)
          wx.setStorageSync('number', res.data.data.username)
          wx.setStorageSync('img', res.data.data.head_img)
          wx.setStorageSync('name', res.data.data.sname||res.data.data.tname)
          wx.setStorageSync('xuebu', res.data.data.ministry)
          wx.setStorageSync('class', res.data.data.class)
          wx.setStorageSync('token', res.data.data.token)
          wx.setStorageSync('ebranch', res.data.data.ebranch+'')
          wx.setStorageSync('uid', res.data.data.id)
          wx.setStorageSync('type', this.data.logintype)

          wx.navigateBack({
            delta: 0,
          })
        } else if (res.data.code == 1) {
          wx.showToast({
            title: '用户名、密码或选择身份错误！',
            icon: 'none'
          })
        } else if (res.data.code == 2) {
          wx.showToast({
            title: '请填写用户名密码并选择您的使用身份！',
            icon: 'none'
          })
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '登录'
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  showPopup() {
    this.setData({
      show: true
    });
  },

  onClose() {
    this.setData({
      show: false
    });
  }
})
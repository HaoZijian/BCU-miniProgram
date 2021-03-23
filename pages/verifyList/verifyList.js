// pages/verifyList/verifyList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    name: wx.getStorageSync('name')
  },

  verify() {
    wx.request({
      url: 'https://bcuscm.mauac.com/applets/api.Activity/audit',
      method: 'POST',
      data: {
        uname: this.data.name,
        token: wx.getStorageSync('token'),
        aid: wx.getStorageSync('currentActivity'),
        pass: '',
      },
      header: {
        'content-Type': 'application/x-www-form-urlencoded'
      },
      success:res => {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://bcuscm.mauac.com/applets/api.Activity/auditList',
      method: 'POST',
      data: {
        token: wx.getStorageSync('token'),
        aid: wx.getStorageSync('currentActivity'),
      },
      header: {
        'content-Type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res)
        this.setData({
          
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
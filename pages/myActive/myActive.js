// pages/myActive/myActive.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    name: wx.getStorageSync('name')
  },

  toDetailPage(res) {
    if (wx.getStorageSync('type') == 1) {
      wx.setStorageSync('currentActivity', res.currentTarget.dataset.index)
      wx.navigateTo({
        url: '/pages/detail/detail',
      })
    } else {
      wx.setStorageSync('currentActivity', res.currentTarget.dataset.index)
      wx.navigateTo({
        url: '/pages/detail/detail',
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  formate(res) {
    let time = require('../../utils/time')
    for (let i = 0; i < res.data.data.length; i++) {
      let newTime = res.data.data[i].atime / 1000;
      res.data.data[i].atime = time.formatTimeTwo(newTime, 'Y年M月D日 h:m');
    }
    return res;
  },



  onLoad: function (options) {
    wx.request({
      url: 'https://bcuscm.mauac.com/applets/api.Activity/signList',
      method: 'POST',
      data: {
        logintype: wx.getStorageSync('type'),
        uname: wx.getStorageSync('number')
      },
      header: {
        'content-Type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        res = this.formate(res)
        this.setData({
          list: res.data.data
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
    this.onLoad()
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
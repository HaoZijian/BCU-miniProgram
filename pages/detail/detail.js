// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    aname: '',
    atime: '',
    aimg: '',
    apalce: '',
    anumber: '',
    aebranch: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://bcuscm.mauac.com/applets/api.Activity/activity',
      method: 'POST',
      data: {
        id: '',
        aname: '',
        sort: '',
        atime: '',
        aimg: '',
      },
      header: {
        'content-Type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res.data.data)
        that.setData({
          
        })
      },
      fail: error => {
        console.log(error);
      }
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
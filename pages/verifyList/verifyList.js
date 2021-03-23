// pages/verifyList/verifyList.js
import Notify from '../../@vant/weapp/dist/notify/notify';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    name: wx.getStorageSync('name'),
    flag: ''
  },

  pass(e) {
    this.verify(1, e.currentTarget.dataset.index, e.currentTarget.dataset.num)
    this.setData({
      flag: 1
    })
    if(this.data.flag == 1) {
      Notify({
        type: 'success',
        message: '已通过审核，加分成功！',
      });
    }
  },

  refuse(e) {
    this.verify(0, e.currentTarget.dataset.index, e.currentTarget.dataset.num)
    this.setData({
      flag: 2
    })
    if(this.data.flag == 2) {
      Notify({
        type: 'warning',
        message: '已拒绝！',
      });
    }
  },

  verify(pass, uname, index) {
    wx.request({
      url: 'https://bcuscm.mauac.com/applets/api.Activity/audit',
      method: 'POST',
      data: {
        uname: uname,
        token: wx.getStorageSync('token'),
        aid: wx.getStorageSync('currentActivity'),
        pass: pass,
      },
      header: {
        'content-Type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(index)
        let list = this.data.list
        list.splice(index, 1)
        this.setData({
          list
        })
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
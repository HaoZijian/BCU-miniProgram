// pages/detail/detail.js
import Notify from '../../@vant/weapp/dist/notify/notify';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    detail: [],
    type: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let time = require('../../utils/time')
    var that = this;
    that.setData({
        type: wx.getStorageSync('type')
      }),
      wx.request({
        url: 'https://bcuscm.mauac.com/applets/api.Activity/activityinfo',
        method: 'POST',
        data: {
          aid: wx.getStorageSync('currentActivity'),
          logintype: 2,
          uname: wx.getStorageSync('number')
        },
        header: {
          'content-Type': 'application/x-www-form-urlencoded'
        },
        success: res => {
          let newTime = res.data.data.atime / 1000;
          res.data.data.atime = time.formatTimeTwo(newTime,'Y年M月D日 h:m');
          that.setData({
            detail: res.data.data
          })
        },
        fail: error => {
          console.log(error);
        }
      })
  },
  sign() {
    var that = this
    wx.request({
      url: 'https://bcuscm.mauac.com/applets/api.Activity/activityStudentSign',
      method: 'POST',
      data: {
        aid: wx.getStorageSync('currentActivity'),
        logintype: 2,
        uname: wx.getStorageSync('number'),
        token: wx.getStorageSync('token')
      },
      header: {
        'content-Type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        switch (res.data.code) {
          case 0:
            that.setData({
              "detail.issign": 1
            })
            Notify({
              type: 'success',
              message: '报名成功'
            });
            break;
          case 1:
            that.setData({
              "detail.issign": 0
            })
            Notify({
              type: 'warning',
              message: '取消报名'
            });
            break;
          default:
            Notify({
              type: 'danger',
              message: '请求失败'
            });
            break;
        }
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

  },

  toVerifyList() {
    wx.navigateTo({
      url: '/pages/verifyList/verifyList',
    })
  }
})
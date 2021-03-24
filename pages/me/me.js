// pages/me/me.js
import Notify from '../../@vant/weapp/dist/notify/notify';
Page({
  /**
   * Page initial data
   */
  data: {
    number: '',
    name: '',
    img: '',
    xuebu: '',
    class: '',
    canShow: true,
    ebranch: wx.getStorageSync('ebranch'),
    logintype: wx.getStorageSync('type')
  },

  toMyCertificate() {
   if(wx.getStorageSync('type') == 1) {
    wx.navigateTo({
      url: '/pages/myCertificate/myCertificate',
    })
   }else {
     wx.navigateTo({
       url: '/pages/verify-CertList/verify-CertList',
     })
   }
  },

  toMyActive() {
    wx.navigateTo({
      url: '/pages/myActive/myActive',
    })
  },

  toLoginPage() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  judge() {
    
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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
    this.getTabBar().init();
    wx.getStorage({
      key: 'number',
      success: res => {
        this.setData({
          number: res.data,
          canShow: false
        })
      }
    })
    wx.getStorage({
      key: 'name',
      success: res => {
        this.setData({
          name: res.data,
          canShow: false
        })
      }
    })
    wx.getStorage({
      key: 'img',
      success: res => {
        this.setData({
          img: res.data,
          canShow: false
        })
      }
    })
    wx.getStorage({
      key: 'xuebu',
      success: res => {
        this.setData({
          xuebu: res.data,
          canShow: true
        })
      }
    })
    wx.getStorage({
      key: 'class',
      success: res => {
        this.setData({
          class: res.data,
          canShow: false
        })
      }
    })
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

  }
})
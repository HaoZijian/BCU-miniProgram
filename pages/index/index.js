const app = getApp()

Page({
  data: {
    value:''
  },

  toDetailPage(res) {
    wx.setStorageSync('currentActivity', res.currentTarget.dataset.index)
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  },

  onLoad: function () {
    var that = this;
    // wx.navigateTo({
    //   url: '/pages/login/login',
    // })

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
        success: res =>{
          console.log(res.data.data)
          that.setData({
            taskList: res.data.data
          })
        },
        fail : error => {
          console.log(error);
        }
      })
  },

  onShow: function () {
    this.getTabBar().init();
  },
})
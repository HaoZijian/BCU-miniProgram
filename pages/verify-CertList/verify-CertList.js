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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  pass(e) {
    wx.setStorageSync('currentCertId', e.currentTarget.dataset.index)
    wx.setStorageSync('currentCertUid', e.currentTarget.dataset.uid)
    wx.navigateTo({
      url: '/pages/verify-CertListInner/verify-CertListInner',
    })
  },

  refuse(e) {
    this.verify(2, e.currentTarget.dataset.index, e.currentTarget.dataset.num, e.currentTarget.dataset.uid)
    this.setData({
      flag: 2
    })
  },
  
  verify(pass, id, index, uid) {
    wx.request({
      url: 'https://bcuscm.mauac.com/applets/api.Certificate/certificateshenhe',
      method: 'POST',
      data: {
        id: id,
        token: wx.getStorageSync('token'),
        sh_status: pass,
        cebranch: 0,
        sh_yijian:"已驳回申请",
        uid:uid
      },
      header: {
        'content-Type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        if(res.data.code==1){
          let list = this.data.list
          list.splice(index, 1)
          this.setData({
            list
          })
          Notify({
            type: 'warning',
            message: '已拒绝！',
          });
        }else{
          Notify({
            type: 'danger',
            message: '未知错误',
          });
        }
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
    wx.request({
      url: 'https://bcuscm.mauac.com/applets/api.Certificate/waitAuditList',
      method: 'POST',
      data: {
        token: wx.getStorageSync('token')
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
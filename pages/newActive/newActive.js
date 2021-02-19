// pages/newActive/newActive.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    fileList: [{
      url: '',
      name: '图片2',
      isImage: true,
      deletable: true,
    }, ],
    show: false,
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    name: '',
    place: '',
    number: '',
    ebranch: '',
    remark: '',
    faqiren: wx.getStorageSync('number'),
    token: wx.getStorageSync('token'),
  },
  
  createAct() {
    let self=this
    wx.request({
      url: 'https://bcuscm.mauac.com/applets/api.Activity/activityadd',
      method: 'POST',
      data: {
        aname: self.data.name,
        atime: self.data.time,
        aplace: self.data.place,
        anumber: self.data.number,
        aebranch: self.data.ebranch,
        aimg: self.data.fileList,
        remark: self.data.remark,
        faqiren: self.data.faqiren,
        token: self.data.token
      },
      header: {
        'content-Type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getTabBar().init();
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

  onConfirm() {
    this.setData({
      show: false
    });
  },

  onCancel() {
    this.setData({
      show: false
    });
  },

  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
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
  },

  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
})
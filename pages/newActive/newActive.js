// pages/newActive/newActive.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    show: false,
    currentDate: new Date().getTime(),
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

  afterRead(event) {
    let that = this;
    const {
      file
    } = event.detail;
    console.log(file)
    wx.uploadFile({
      url: 'https://bcuscm.mauac.com//applets/api.Upload/upload', 
      filePath: file.url,
      name: 'img',
      header: {
        'Content-Type': 'multipart/form-data'
      },
      success(res) {
        console.log(res)
        const {
          fileList = []
        } = that.data;
        fileList.push({
          ...file,
          url: res.data
        });
        that.setData({
          fileList
        });
      },
    });
  },


  // onClickImage: function (e) {
  //   let that = this;
  //   wx.chooseImage({
  //     count: 1,
  //     sizeType: ['original', 'compressed'],
  //     sourceType: ['album', 'camera'],
  //     success(res) {
  //       console.log(res)
  //       const tempFilePaths = res.tempFilePaths
  //       wx.getFileInfo({
  //         filePath: tempFilePaths[0],
  //         success(res) {
  //           console.log(res)
  //         }
  //       })
  //     }
  //   })
  // },

  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },

  createAct() {
    let self = this;
    wx.request({
      url: 'https://bcuscm.mauac.com/applets/api.Activity/activityadd',
      method: 'POST',
      data: {
        aname: self.data.name,
        atime: self.data.currentDate,
        aplace: self.data.place,
        anumber: self.data.number,
        aebranch: self.data.ebranch,
        aimg: self.data.fileList[0],
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
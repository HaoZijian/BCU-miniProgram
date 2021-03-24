Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    show: false,
  },

  toCompetitionList() {
    wx.navigateTo({
      url: '/pages/competitionList/competitionList',
    })
  },

  afterRead(event) {
    let that = this;
    const {
      file
    } = event.detail;
    console.log(file)
    wx.uploadFile({
      url: 'https://bcuscm.mauac.com/applets/api.Upload/upload',
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

  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
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
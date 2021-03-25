// pages/myCertificate/myCertificate.js
import Notify from '../../@vant/weapp/dist/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    show: false,
    name: '',
    remark: '',
    img: ''
  },

  toCertificateList() {
    wx.navigateTo({
      url: '/pages/certificateList/certificateList',
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
        if (res.statusCode == 200) {
          res.data=JSON.parse(res.data)
          const {
            fileList = []
          } = that.data;
          fileList.push({
            ...file,
            url: res.data.data
          });
          that.setData({
            fileList,
            img: res.data.data
          });
        }else{
          Notify({
            type: 'danger',
            message: '上传失败 可能文件过大'
          });
        }
      },
    });
  },

  submit() {
    wx.request({
      url: 'https://bcuscm.mauac.com/applets/api.Certificate/certificateadd',
      method: 'POST',
      data: {
        token: wx.getStorageSync('token'),
        uid: wx.getStorageSync('uid'),
        cname: this.data.name,
        cremark: this.data.remark,
        cimg: this.data.img
      },
      header: {
        'content-Type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        if (res.data.code == 1) {
          Notify({
            type: 'success',
            message: '新增成功'
          });
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/certificateList/certificateList',
            })
          }, 1000);
        } else {
          Notify({
            type: 'danger',
            message: '未知错误'
          });
        }
      },
    })
  },

  onChange(event) {
    // event.detail 为当前输入的值
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
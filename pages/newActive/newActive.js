// pages/newActive/newActive.js
import Notify from '../../@vant/weapp/dist/notify/notify';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    name: '',
    place: '',
    number: '',
    ebranch: '',
    remark: '',
    img: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   * 
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


})


Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    picktime: {
      type: String,
      value: '请选择'
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    minDate: new Date((new Date().getFullYear() - 1), 10, 1).getTime(),
    maxDate: new Date((new Date().getFullYear() + 2), 10, 1).getTime(),
    currentDate: new Date().getTime(),
    show: false
  },
  created: function () {

    //组件实例进入页面节点树时执行时的代码, 但是不能在这里使用setData,否则将会报错.
  },
  attached() {
    //组件实例进入页面节点树时执行时的代码, 比如获取本地存储的值等等


  },
  lifetimes: {
    // 组件的生命周期函数，用于声明组件的生命周期
    attached: () => {},
    moved: () => {},
    detached: () => {}
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: () => {

    },
    hide: () => {}
  },
  /**
   * 组件的方法列表
   */
  methods: {
    timeFormat(date, fmt) {
      var o = {
        "M+": date.getMonth() + 1, //月份   
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时   
        "m+": date.getMinutes(), //分   
        "s+": date.getSeconds(), //秒   
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
        "S": date.getMilliseconds() //毫秒   
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;

    },
    showPopup() {
      this.setData({
        show: true
      });

    },
    onConfirm(event) {
      var timeValue = this.timeFormat(new Date(event.detail), "yyyy-MM-dd hh:mm");
      this.setData({
        picktime: timeValue,
        show: false
      });
      var myEventDetail = {
        val: timeValue
      }
      this.triggerEvent('myevent', myEventDetail);
    },
    onCancel() {
      this.setData({
        show: false
      });
    },
    onClose() {
      this.setData({
        show: false
      });
    },

    afterRead(e) {
      let that = this;
      const {
        file
      } = e.detail
      wx.uploadFile({
        url: 'https://bcuscm.mauac.com/applets/api.Upload/upload',
        filePath: file.url,
        name: 'img',
        header: {
          'Content-Type': 'multipart/form-data'
        },
        success(res) {
          res.data = JSON.parse(res.data)
          console.log(res.data.data)
          const {
            fileList = []
          } = that.data;
          fileList.push({
            ...file,
            url: res.data
          });
          that.setData({
            fileList,
            img: res.data.data
          })
        }
      })
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
          aimg: self.data.img,
          remark: self.data.remark,
          faqiren: wx.getStorageSync('number'),
          token: wx.getStorageSync('token')
        },
        header: {
          'content-Type': 'application/x-www-form-urlencoded'
        },
        success: res => {
          console.log(res.statusCode)
          switch (res.statusCode) {
            case 200:
              Notify({
                type: 'success',
                message: '创建活动成功'
              });
              break;
            default:
              Notify({
                type: 'danger',
                message: '创建活动失败'
              });
              break;
          }
        }
      })
    },
  }
})
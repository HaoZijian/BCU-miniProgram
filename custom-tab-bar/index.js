Component({
  data: {
    active: 0,
    list: [{
        "id": 0,
        "url": "/pages/index/index",
        "icon": "wap-home-o",
        "text": "首页",
        "type": 1
      },
      {
        "id":1,
        "icon": "scan",
        "text": "扫码签到",
        "flag": 1,
        "type": 1
      },
      {
        "id":2,
        "icon": "plus",
        "text": "新增活动",
        "flag": 2,
        "type": 2
      },
      {
        "id":3,
        "url": "/pages/me/me",
        "icon": "user-circle-o",
        "text": "我的",
        "type": 1
      }
    ],
    aid: null,
    type: wx.getStorageSync('type')
  },
  methods: {
    onChange(e) {
      console.log(e)
      this.setData({
        active: e.detail
      });
      if (this.data.list[e.detail].flag != 1) {
        wx.switchTab({
          url: this.data.list[e.detail].url
        });
      } else {
        var that = this;
        wx.scanCode({
          onlyFromCamera: true,
          success(res) {
            console.log(res)
            that.setData({
              aid: res.result
            })
            if (that.data.aid != null) {
              wx.showModal({
                title: '提示',
                content: '签到成功!'
              })
            }
          },
          fail(res) {
            wx.showModal({
              title: '提示',
              content: '未识别签到二维码!'
            })
          }
        })
      }
    },
    init() {
      const page = getCurrentPages().pop();
      this.setData({
        active: this.data.list.findIndex(item => item.url === `/${page.route}`)
      });
    }
  }
});
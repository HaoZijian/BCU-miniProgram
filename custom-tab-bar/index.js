Component({
  data: {
    active: 0,
    list: [{
        "url": "/pages/index/index",
        "icon": "wap-home-o",
        "text": "首页"
      },
      {
        "icon": "scan",
        "text": "扫码签到",
        "flag": 1
      },
      {
        "url": "/pages/me/me",
        "icon": "user-circle-o",
        "text": "我的"
      }
    ],
    aid: null
  },
  methods: {
    onChange(e) {
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
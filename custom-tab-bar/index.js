Component({
  data: {
  active: 0,
  list: [
    {
      "url": "/pages/index/index",
      "icon": "wap-home-o",
      "text": "首页"
    },
    {
      "icon": "scan",
      "text": "扫码签到"
    },
    {
      "url": "/pages/me/me",
      "icon": "user-circle-o",
      "text": "我的"
    }
  ]
  },
  methods: {
   onChange(e) {
      console.log(e,'e')
      this.setData({ active: e.detail });
      wx.switchTab({
        url: this.data.list[e.detail].url
      });
   },
   init() {
       const page = getCurrentPages().pop();
       this.setData({
      　  active: this.data.list.findIndex(item => item.url === `/${page.route}`)
       });
      }
   }
});
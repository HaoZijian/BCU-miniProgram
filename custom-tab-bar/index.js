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
      "text": "扫码签到",
      "flag": 1
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
      this.setData({ active: e.detail });
      if(this.data.list[e.detail].flag!=1){
        wx.switchTab({
          url: this.data.list[e.detail].url
        });
      }else{
        wx.scanCode({
          onlyFromCamera: true,
          success (res) {
            console.log(res)
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
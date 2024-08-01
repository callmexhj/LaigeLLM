// app.js
App({
  onLaunch() {
    const that = this
    wx.getSystemInfo({
      success(res) {
        const tabbarHeight = (res.screenHeight - res.safeArea.bottom) + 50
        that.globalData.tabbarHeight = tabbarHeight
      }
    })
  },
  globalData: {
    userInfo: null
  }
})

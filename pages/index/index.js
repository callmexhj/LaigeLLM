// index.js

Page({
  onShow() {
    if (typeof this.getTabBar === 'function' ) {
      this.getTabBar((tabBar) => {
        tabBar.setData({
          selectedTab: 'chat'
        })
      })
    }
  },
  data: {
    
  }
})
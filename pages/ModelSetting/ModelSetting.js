// pages/ModelSetting/ModelSetting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (typeof this.getTabBar === 'function' ) {
      this.getTabBar((tabBar) => {
        tabBar.setData({
          selectedTab: 'modelSetting'
        })
      })
    }
  },

  handleCreateModel() {
    wx.navigateTo({
      url: '/pages/ModelConfig/ModelConfig',
    })
  }
})
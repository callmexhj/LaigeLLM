// pages/ModelSetting/ModelSetting.js

const { getModelNameByModelValue } = require('../../systemConfig/modelOptions')
const colorList = ['#ffd591', '#ffbb96', '#ffa39e', '#91caff', '#87e8de', '#b7eb8f']
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modelList: [],
    tabbarHeight: app.globalData.tabbarHeight,
  },

  onReady() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const that = this
    if (typeof this.getTabBar === 'function' ) {
      this.getTabBar((tabBar) => {
        tabBar.setData({
          selectedTab: 'modelSetting'
        })
      })
    }
    wx.getStorage({
      key: 'modelList',
      success(res) {
        const { errMsg } = res
        if (errMsg === 'getStorage:ok') {
          const { data } = res
          let index = 0
          const modelList = data.map((item) => {
            const { modelName, modelVersion, modelId, config } = item
            const [modelLabel, versionLabel] = getModelNameByModelValue(modelName, modelVersion)
            return {
              modelTitle: modelLabel,
              modelSubTitle: versionLabel,
              modelId,
              config,
              simpleModelId: modelId.slice(-6),
              theme: colorList[index++%colorList.length]
            }
          })
          that.setData({ modelList })
        }
      }
    })
  },

  handleModifyModel(e) {
    const { detail: {modelId} } = e
    console.log(`/pages/ModelConfig/ModelConfig?modelId=${modelId}`)
    wx.navigateTo({
      url: `/pages/ModelConfig/ModelConfig?modelId=${modelId}`,
    })
  },

  handleCreateModel() {
    wx.navigateTo({
      url: '/pages/ModelConfig/ModelConfig',
    })
  }
})
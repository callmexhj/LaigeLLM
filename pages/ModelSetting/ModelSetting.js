// pages/ModelSetting/ModelSetting.js
import {
  getModelList
} from '../../systemConfig/getModelList'

import {
  Toast
} from 'tdesign-miniprogram'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modelList: [],
    tabbarHeight: app.globalData.tabbarHeight,
    isInEdit: false,
    selectedModelId: []
  },

  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (typeof this.getTabBar === 'function') {
      this.getTabBar((tabBar) => {
        tabBar.setData({
          selectedTab: 'modelSetting'
        })
      })
    }
    this.updateModelList()
  },

  async updateModelList() {
    const modelList = await getModelList()
    this.setData({
      modelList
    })
  },

  handleModifyModel(e) {
    // 跳转至编辑页面
    const {
      detail: {
        modelId
      }
    } = e
    wx.navigateTo({
      url: `/pages/ModelConfig/ModelConfig?modelId=${modelId}`,
    })
  },

  handleCreateModel() {
    // 跳转至新建页面
    wx.navigateTo({
      url: '/pages/ModelConfig/ModelConfig',
    })
  },

  handleEditList() {
    // 修改编辑状态函数
    this.setData({
      isInEdit: true
    })
  },

  handleDeleteModels() {
    const that = this
    if (this.data.selectedModelId.length === 0) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请选择模型',
        icon: 'info-circle',
      })
    } else {
      try {
        const modelListFromStorage = wx.getStorageSync('modelList')
        const newModelList = modelListFromStorage.filter((item) => this.data.selectedModelId.indexOf(item.modelId) === -1)
        wx.setStorage({
          key: 'modelList',
          data: [...newModelList],
          success() {
            that.updateModelList()
            Toast({
              context: that,
              selector: '#t-toast',
              message: `删除成功`,
              icon: 'check-circle',
            })
          }
        })
      } catch (e) {
        console.error(e)
        Toast({
          context: this,
          selector: '#t-toast',
          message: `读取缓存失败-${String(e)}`,
          icon: 'error-circle',
        })
      }
      this.setData({
        isInEdit: false,
        selectedModelId: []
      })
    }
  },

  handleCancelDelete() {
    this.setData({
      isInEdit: false,
      selectedModelId: []
    })
  },

  handleChooseModel(e) {
    const selectedModelId = [...this.data.selectedModelId]
    const modelId = e.detail.modelId
    const index = selectedModelId.indexOf(modelId)
    if (index === -1) {
      // modelId 不在 selectedModelId 中，添加它
      selectedModelId.push(modelId)
    } else {
      // modelId 已存在于 selectedModelId 中，删除它
      selectedModelId.splice(index, 1)
    }
    this.setData({
      selectedModelId
    })
  }
})
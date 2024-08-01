// pages/ModelConfig/ModelConfig.js
import {
  Toast
} from 'tdesign-miniprogram'

const {
  modelOptions
} = require('../../systemConfig/modelOptions')
const {
  genModelId
} = require('../../systemConfig/genModelId')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modelCascaderVisible: false,
    modelVersionValue: '',
    modelValue: '',
    modelNote: '请选择模型版本',
    subModelTitles: ['请选择模型', '请选择版本号'],
    isSubmitBtnDisabled: true,
    tongyiApiKey: '',
    modelId: '',
    modelList: [...modelOptions],
    isNewModel: true
  },



  showModelCascader() {
    this.setData({
      modelCascaderVisible: true
    })
  },

  onModelChange(e) {
    let that = this
    const {
      selectedOptions,
      value
    } = e.detail
    const modelValue = selectedOptions[0].value
    this.setData({
      modelValue,
      modelVersionValue: value,
      modelNote: that.genModelNote(selectedOptions)
    });
  },

  genModelNote(selectedOptions, modelValue, modelVersionValue) {
    if (selectedOptions.length > 1) return selectedOptions.map((item) => item.label).join('/')
    else if (modelValue && modelVersionValue) {
      const modelOption = modelOptions.find(option => modelValue === option.value)
      const modelLabel = modelOption.label
      const versionLabel = modelOption.children.find(child => child.value === modelVersionValue).label
      return [modelLabel, versionLabel].join('/')
    } else return null
  },

  handleTongyiApikeyChange(e) {
    const {
      detail: {
        value
      }
    } = e
    this.setData({
      tongyiApiKey: value,
      isSubmitBtnDisabled: value.length < 10
    })
  },

  handleClearConfig() {
    this.setData({
      tongyiApiKey: '',
      isSubmitBtnDisabled: true,
      modelVersionValue: '',
      modelValue: '',
      modelNote: '请选择模型版本'
    })
    Toast({
      context: this,
      selector: '#t-toast',
      message: '清空成功',
      icon: 'check-circle',
    })
  },

  setModelListStorage(value) {
    const pages = getCurrentPages()
    const previousPage = pages[pages.length >= 2 ? pages.length - 2 : 0]
    wx.setStorage({
      key: 'modelList',
      data: [...value],
      success() {
        Toast({
          context: previousPage,
          selector: '#t-toast',
          message: '保存成功',
          icon: 'check-circle',
        })
      },
      fail() {
        Toast({
          context: previousPage,
          selector: '#t-toast',
          message: '保存失败',
          icon: 'error-circle',
        })
      },
      complete() {
        wx.navigateBack()
      }
    })
  },

  handleSaveModelConfig() {
    this.setNewModel()
  },

  setNewModel() {
    const that = this
    const newModelConfig = {
      modelName: this.data.modelValue,
      modelVersion: this.data.modelVersionValue,
      modelId: this.data.isNewModel ? genModelId(20) : this.data.modelId
    }
    let dataCache = []
    if (this.data.modelValue === 'TONGYI') {
      newModelConfig.config = {
        APIKey: this.data.tongyiApiKey
      }
      wx.getStorage({
        key: 'modelList',
        success(res) {
          // 已有模型配置缓存
          if (res.errMsg === 'getStorage:ok') {
            dataCache = [...res.data]
            if (that.data.isNewModel) {
              // 新模型，则插入
              dataCache.push({
                ...newModelConfig
              })
            } else {
              // 旧模型，则修改
              const oldIndex = dataCache.findIndex(item => item.modelId = that.data.modelId)
              dataCache[oldIndex] = {
                ...newModelConfig
              }
            }
          }
        },
        fail() {
          // 初始化模型配置
          dataCache = [{
            ...newModelConfig
          }]
        },
        complete() {
          that.setModelListStorage(dataCache)
        }
      })
    }
  },

  findModelConfigByModelId(modelId) {
    try {
      const modelList = wx.getStorageSync('modelList')
      if (modelList) {
        return modelList.find(item => item.modelId === modelId)
      }
    } catch (e) {
      Toast({
        context: previousPage,
        selector: '#t-toast',
        message: String(e),
        icon: 'error-circle',
      })
      return null
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  onLoad(options) {
    let that = this
    const {
      modelId
    } = options
    if (modelId) {
      // 判断是新增模型还是修改模型
      const modelConfig = this.findModelConfigByModelId(modelId)
      const {
        config,
        modelName,
        modelVersion
      } = modelConfig
      this.setData({
        isNewModel: false,
        modelId,
        modelVersionValue: modelVersion,
        modelValue: modelName,
        modelNote: that.genModelNote([], modelName, modelVersion),
        tongyiApiKey: config.APIKey,
        isSubmitBtnDisabled: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  }
})
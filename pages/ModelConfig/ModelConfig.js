// pages/ModelConfig/ModelConfig.js
import {
  Toast
} from 'tdesign-miniprogram'

const {
  modelOptions
} = require('../../systemConfig/modelOptions')
const {
  genRandomId
} = require('../../systemConfig/genRandomId')
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
    // 级联选择器响应函数
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
    // 生成级联选择器中显示的文本（根据模型名称和版本号）
    if (selectedOptions.length > 1) return selectedOptions.map((item) => item.label).join('/')
    else if (modelValue && modelVersionValue) {
      const modelOption = modelOptions.find(option => modelValue === option.value)
      const modelLabel = modelOption.label
      const versionLabel = modelOption.children.find(child => child.value === modelVersionValue).label
      return [modelLabel, versionLabel].join('/')
    } else return null
  },

  handleTongyiApikeyChange(e) {
    // 输入响应函数
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
    // 清空已经填写的配置
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
    // 持久化保存模型列表信息
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
      modelId: this.data.isNewModel ? genRandomId('model', 20) : this.data.modelId
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
    // 根据modelId从缓存中寻找对应的modelConfig
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

  onLoad(options) {
    let that = this
    const {
      modelId
    } = options
    if (modelId) {
      // 判断是新增模型还是修改模型
      // 修改标题
      wx.setNavigationBarTitle({
        title: `编辑模型(${modelId.slice(-6)})`,
      })
      const modelConfig = this.findModelConfigByModelId(modelId)
      const {
        config,
        modelName,
        modelVersion
      } = modelConfig
      // TODO（zhouah 20240801）: 由于TDesign组件库(版本号1.5.0)的问题（ISSUES: #1884，#2902），当为级联选择器设置默认值时，无法显示候选option，这个问题预计在下个版本修复，目前需要返回以及选择器重新选择模型，不阻断业务流程。
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
  }
})
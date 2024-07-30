// pages/ModelConfig/ModelConfig.js
import { Toast } from 'tdesign-miniprogram'

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
    TongyiApiKey: '',
    modelList: [{
      value: 'TONGYI',
      label: '通义千问',
      children: [{
        value: 'QWENTURBO',
        label: 'quen-turbo'
      }, {
        value: 'QWENPLUS',
        label: 'quen-plus'
      }, {
        value: 'QWENMAX',
        label: 'quen-max'
      }],
    }]
  },

  showModelCascader() {
    this.setData({
      modelCascaderVisible: true
    })
  },

  onModelChange(e) {
    const {
      selectedOptions,
      value
    } = e.detail
    const modelValue = selectedOptions[0].value
    this.setData({
      modelValue,
      modelVersionValue: value,
      modelNote: selectedOptions.map((item) => item.label).join('/'),
    });
  },

  handleTongyiApikeyChange(e) {
    const { detail: { value } } = e
    console.log(value.length > 0)
    this.setData({
      TongyiApiKey: value,
      isSubmitBtnDisabled: !value.length > 10
    })
  },

  handleClearConfig() {
    this.setData({
      TongyiApiKey: '',
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
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  }
})
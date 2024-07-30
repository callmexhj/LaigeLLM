// pages/ModelConfig/ModelConfig.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modelCascaderVisible: false,
    modelValue: '',
    modelNote: '请选择模型版本',
    modelList: [{
      value: 'OpenAI',
      label: 'OpenAI',
      children: [{
        value: 'gpt35',
        label: 'GPT-3.5'
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
    } = e.detail;
    this.setData({
      modelValue: value,
      modelNote: selectedOptions.map((item) => item.label).join('/'),
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
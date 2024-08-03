// components/ModelSelector/ModelSelector.js
import {
  Toast
} from 'tdesign-miniprogram'

Component({

  /**
   * 组件的属性列表
   */
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    modelList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    modelId: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onVisibleChange(e) {
      if (!e.detail.visible) {
        this.handleCancel()
      }
    },
    handleChecked(e) {
      this.setData({
        modelId: e.currentTarget.dataset.modelId
      })
    },
    handleOk() {
      if (this.data.modelId) {
        this.triggerEvent('change', { modelId: this.data.modelId })
      } else {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '请选择模型',
          icon: 'info-circle',
        })
      }
    },
    handleCancel() {
      this.triggerEvent('cancel')
    }
  }
})
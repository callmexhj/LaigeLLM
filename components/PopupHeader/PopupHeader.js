// components/PopupHeader/PopupHeader.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    leftBtnText: {
      type: String,
      value: '取消'
    },
    rightBtnText: {
      type: String,
      value: '确认'
    },
    title: {
      type: String,
      value: 'Popup标题'
    },
    showBtn: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleCancel() {
      this.triggerEvent('cancel')
    },
    handleOk() {
      this.triggerEvent('ok')
    }
  }
})
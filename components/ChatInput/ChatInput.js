// components/ChatInput/ChatInput.js
let resText = ''
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    inputValue: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleInputMessage(e) {
      this.setData({
        inputValue: e.detail.value
      })
    },
    handleSend() {
      this.triggerEvent('sendMessage', this.data.inputValue)
      this.setData({
        inputValue: ''
      })
    },
    handleClearMessage() {
      this.triggerEvent('clear')
    }
  }
})
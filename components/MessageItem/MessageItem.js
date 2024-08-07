// components/MessageItem/MessageItem.js
const app = getApp()
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    content: {
      type: String,
      value: null
    },
    role: {
      type: String,
      value: 'user'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showPrompt: false,
    article: {}
  },

  observers: {
    'content': function(e) {
      const result = app.towxml(this.properties.content, 'markdown', {
        theme: 'trans'
      })
      this.setData({
        article: result
      })
    }
  },

  lifetimes: {
    attached() {
      
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleChangePromptStatus() {
      this.setData({
        showPrompt: !this.data.showPrompt
      })
    }
  }
})
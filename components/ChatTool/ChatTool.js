// components/ChatTool/ChatTool.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    ico: {
      type: String,
      value: 'clear'
    },
    title: {
      type: String,
      value: '工具名称'
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
    handleTapTool() {
      this.triggerEvent('tapTool')
    }
  }
})
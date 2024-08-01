// components/ChatItem/ChatItem.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    chatIco: {
      type: String,
      value: './人工智能.png'
    },
    title: {
      type: String,
      value: 'This is the Chat title'
    },
    subtitle: {
      type: String,
      value: 'This is the Chat subtitle This is the Chat subtitle This is the Chat subtitle This is the Chat subtitle'
    },
    chatId: {
      type: String
    },
    modelLabel: {
      type: String,
      value: 'Default Label'
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
    handleClickChatItem() {
      this.triggerEvent('clickChatItem', { chatId: this.properties.chatId })
    }
  }
})
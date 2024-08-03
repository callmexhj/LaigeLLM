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
    },
    timestamp: {
      type: Number,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    foramtTimeStamp: ''
  },

  lifetimes: {
    ready: function () {
      this.setData({
        foramtTimeStamp: this.formatTimestamp(this.properties.timestamp)
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClickChatItem() {
      this.triggerEvent('clickChatItem', {
        chatId: this.properties.chatId
      })
    },
    formatTimestamp(timestamp) {
      // 将时间戳格式化
      const date = new Date(timestamp)
      let hours = date.getHours()
      let minutes = date.getMinutes()
      if (hours < 10) hours = '0' + hours;
      if (minutes < 10) minutes = '0' + minutes;
      return `${hours}:${minutes}`
    }
  }
})
// pages/ChatPage/ChatPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chatId: '',
    chatInfo: {},
    messages: [{
        role: 'system',
        content: 'You are a helpful assistant.'
      },
      {
        role: 'assistant',
        content: '今天天气如何'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const {
      chatId
    } = options
    this.getChatConfigByChatId(chatId)
  },

  onShow() {
    if (typeof this.getTabBar === 'function') {
      this.getTabBar((tabBar) => {
        tabBar.setData({
          selectedTab: ''
        })
      })
    }
  },
  
  handleSendMessage() {
    const messageCache = [...this.data.messages]
    messageCache.push({
      role: 'assistant',
      content: ''
    })
    this.setData({
      messages: messageCache
    })
  },

  handleReceiveMessage(text) {
    const {
      detail
    } = text
    const messageCache = [...this.data.messages]
    messageCache[messageCache.length - 1].content += detail
    this.setData({
      messages: messageCache
    })
  },

  handleErrorBack(message) {
    const pages = getCurrentPages()
    const previousPage = pages[pages.length >= 2 ? pages.length - 2 : 0]
    Toast({
      context: previousPage,
      selector: '#t-toast',
      message: message,
      icon: 'error-circle',
    })
    wx.navigateBack()
  },

  getChatConfigByChatId(chatId) {
    try {
      const chatList = wx.getStorageSync('chatList')
      if (chatList?.length > 0) {
        const chatInfo = chatList.find((chat) => chat.chatId === chatId)
        if (!chatInfo) {
          // 异常处理
          this.handleErrorBack('非法会话')
          return
        }
        wx.setNavigationBarTitle({
          title: chatInfo.title
        })
        this.setData({
          chatId,
          chatInfo
        })
      }
    } catch (e) {
      this.handleErrorBack('缓存读取异常')
      console.error(e)
    }
  }

})
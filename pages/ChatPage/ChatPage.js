// pages/ChatPage/ChatPage.js
import {
  genRequest, handleRequest
} from '../../systemConfig/messageSender'

import {
  getModelNameByModelValue
} from '../../systemConfig/modelOptions'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chatId: '',
    chatInfo: {}
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

  handleSendMessage(e) {
    const messageContent = e.detail
    if (messageContent.length < 1) {
      return
    }
    const chatInfoCache = this.data.chatInfo
    chatInfoCache.messages.push({
      role: 'user',
      content: messageContent
    }, {
      role: 'assistant',
      content: ''
    })
    this.setData({
      chatInfo: chatInfoCache
    })
    const {
      modelId
    } = this.data.chatInfo
    const modelInfo = this.getModelInfo(modelId)
    this.sendRequest(modelInfo, chatInfoCache.messages)
  },

  getModelInfo(modelId) {
    const modelList = wx.getStorageSync('modelList')
    const modelInfo = modelList.find((item) => item.modelId === modelId)
    const {
      modelName,
      modelVersion
    } = modelInfo
    const [modelNameTrue, modelVersionTrue] = getModelNameByModelValue(modelName, modelVersion)
    return {
      modelNameTrue,
      modelVersionTrue,
      ...modelInfo
    }
  },

  sendRequest(modelInfo, messageCache) {
    const request = genRequest(modelInfo, messageCache)
    request.onChunkReceived((res) => {
      const resText = handleRequest(res.data)
      this.handleReceiveMessage(resText)
    })
  },

  handleReceiveMessage(text) {
    if (text.stop) {
      this.handleSaveMessagesToCache()
      return
    }
    const chatInfoCache = this.data.chatInfo
    chatInfoCache.messages[chatInfoCache.messages.length - 1].content += text
    this.setData({
      chatInfo: chatInfoCache
    })
  },

  handleSaveMessagesToCache() {
    const chatList = wx.getStorageSync('chatList')
    console.log(chatList)
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
// pages/ChatPage/ChatPage.js
import {
  genRequest,
  handleRequest
} from '../../systemConfig/messageSender'

import {
  getModelNameByModelValue
} from '../../systemConfig/modelOptions'

import {
  Toast
} from 'tdesign-miniprogram'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chatId: '',
    chatInfo: {},
    showClearConfirm: false,
    isInGen: false
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
      chatInfo: chatInfoCache,
      isInGen: true
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
      const chatInfoCache = this.data.chatInfo
      chatInfoCache.messages[chatInfoCache.messages.length - 1].content += text.data
      this.setData({
        chatInfo: chatInfoCache,
        isInGen: false
      })
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
    // console.log(this.data.chatInfo)
    const chatIndex = chatList.findIndex(item => item.chatId === this.data.chatId)
    chatList[chatIndex].messages = this.data.chatInfo.messages
    wx.setStorage({
      key: 'chatList',
      data: [...chatList]
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
  },
  openClearDialog() {
    this.setData({
      showClearConfirm: true
    })
  },
  closeClearDialog() {
    this.setData({
      showClearConfirm: false
    })
  },
  handleClearMessage() {
    const chatInfoCache = this.data.chatInfo
    const messageCache = []
    if (chatInfoCache.messages[0].role === 'system') {
      messageCache.push(chatInfoCache.messages[0])
    }
    messageCache.push({
      role: 'assistant',
      content: '你好，很高兴和你开始对话！'
    })
    chatInfoCache.messages = [...messageCache]
    this.setData({
      chatInfo: chatInfoCache,
      showClearConfirm: false
    })
    this.handleSaveMessagesToCache()
    Toast({
      context: this,
      selector: '#t-toast',
      message: '清空成功',
      icon: 'check-circle',
    })
  }
})
// index.js
import {
  getModelNameByModelValue
} from '../../systemConfig/modelOptions'
import {
  Toast
} from 'tdesign-miniprogram'
const app = getApp()
Page({
  data: {
    tabbarHeight: app.globalData.tabbarHeight,
    right: [{
      text: '删除',
      className: 'swipe-btn swipe-btn-delete',
    }, ],
    chatList: [],
    modelList: []
  },

  onShow() {
    if (typeof this.getTabBar === 'function') {
      this.getTabBar((tabBar) => {
        tabBar.setData({
          selectedTab: 'chat'
        })
      })
    }
    this.initChatList()
  },

  initChatList() {
    try {
      const chatList = wx.getStorageSync('chatList')
      const modelList = wx.getStorageSync('modelList')
      if (chatList?.length === 0) {
        this.setData({
          chatList: [],
          modelList
        })
        return
      }
      const chatListFit = chatList.map((chatItem) => {
        const {
          modelName,
          modelVersion
        } = modelList.find(item => item.modelId === chatItem.modelId)
        const [, modelVersionName] = getModelNameByModelValue(modelName, modelVersion)
        const lastMessage = chatItem.messages[chatItem.messages.length - 1].content
        return {
          // 字段匹配
          avatorFileUrl: `../../systemConfig/images/${chatItem.avatorUrl}`,
          subtitle: lastMessage.length > 30 ? lastMessage.substring(0, 30) : lastMessage,
          modelLabel: modelVersionName,
          ...chatItem
        }
      })
      this.setData({
        chatList: chatListFit.reverse(),
        modelList
      })
    } catch (e) {
      console.error(e)
    }
  },

  handleClickChatItem(e) {
    wx.navigateTo({
      url: `/pages/ChatPage/ChatPage?chatId=${e.detail.chatId}`
    })
  },

  handleAddChatItem() {
    wx.navigateTo({
      url: '/pages/CreateChat/CreateChat',
    })
  },

  deleteChatItemByChatId(chatId) {
    const that = this
    const chatListCache = wx.getStorageSync('chatList')
    const newChatList = chatListCache.filter(item => item.chatId !== chatId)
    wx.setStorage({
      key: 'chatList',
      data: [...newChatList],
      success() {
        that.initChatList()
        Toast({
          context: that,
          selector: '#t-toast',
          message: '删除对话成功',
          icon: 'check-circle',
        })
      },
      fail() {
        Toast({
          context: that,
          selector: '#t-toast',
          message: '删除失败',
          icon: 'error-circle',
        })
      }
    })
  },
  
  onActionClick(e) {
    const currentChatId = e.currentTarget.dataset.chatId
    this.deleteChatItemByChatId(currentChatId)
  }
})
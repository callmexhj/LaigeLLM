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
    chatList: [{
      chatId: '12312313',
      title: 'This is the Chat title',
      subtitle: 'This is the Chat subtitle This is the Chat subtitle This is the Chat subtitle This is the Chat subtitle',
      modelLabel: 'Default Label'
    }]
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
      const chatListFit = chatList.map((chatItem) => {
        const {
          modelName,
          modelVersion
        } = modelList.find(item => item.modelId === chatItem.modelId)
        const [, modelVersionName] = getModelNameByModelValue(modelName, modelVersion)
        return {
          // 字段匹配
          avatorFileUrl: `../../systemConfig/images/${chatItem.avatorUrl}`,
          subtitle: '这是一个新对话, 快来聊天吧',
          modelLabel: modelVersionName,
          ...chatItem
        }
      })

      this.setData({
        chatList: chatListFit
      })
    } catch (e) {
      console.error(e)
    }
  },

  handleClickChatItem(e) {
    console.log(e.detail.chatId)
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
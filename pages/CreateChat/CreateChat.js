// pages/CreateChat/CreateChat.js
import {
  getModelList
} from '../../systemConfig/getModelList'
import {
  genRandomId
} from '../../systemConfig/genRandomId'
import {
  Toast
} from 'tdesign-miniprogram'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chatAvatar: '1.png',
    modelList: [],
    isModelSelectorVisible: false,
    modelSelectorNote: '',
    selectModelId: null,
    title: '',
    prompt: ''
  },

  onShow() {
    this.getModelList()
  },

  async getModelList() {
    // 从缓存获取模型列表用于选择器渲染
    const modelList = await getModelList()
    this.setData({
      modelList
    })
  },

  handleAvatarChanged(e) {
    // 响应头像变更事件
    this.setData({
      chatAvatar: e.detail.currentAvatar
    })
  },

  openModelSelector() {
    this.setData({
      isModelSelectorVisible: true
    })
  },

  closeModelSelector() {
    this.setData({
      isModelSelectorVisible: false
    })
  },

  genModelSelectorNote(modelId) {
    // 生成选择器展示字符串
    const {
      modelTitle,
      modelSubTitle,
      simpleModelId
    } = this.data.modelList.find(item => item.modelId === modelId)
    return `${modelTitle}/${modelSubTitle}(${simpleModelId})`
  },

  handleShowModelSelector() {
    // 打开选择器
    this.openModelSelector()
  },

  saveChatToStorage(chatInfo) {
    // 持久化存储对话信息
    try {
      const pages = getCurrentPages()
      const previousPage = pages[pages.length >= 2 ? pages.length - 2 : 0]
      const chatListFromCache = wx.getStorageSync('chatList')
      const newChatList = [...chatListFromCache]
      newChatList.push(chatInfo)
      wx.setStorage({
        key: 'chatList',
        data: [...newChatList],
        success() {
          Toast({
            context: previousPage,
            selector: '#t-toast',
            message: '新建成功',
            icon: 'check-circle',
          })
        },
        fail() {
          Toast({
            context: previousPage,
            selector: '#t-toast',
            message: '保存失败',
            icon: 'error-circle',
          })
        },
        complete() {
          wx.navigateBack()
        }
      })
    } catch (e) {
      console.error(e)
      Toast({
        context: this,
        selector: '#t-toast',
        message: '保存失败',
        icon: 'error-circle',
      })
    }
  },

  handleModelChanged(e) {
    const selectModelId = e.detail.modelId
    const modelSelectorNote = this.genModelSelectorNote(selectModelId)
    this.setData({
      selectModelId,
      modelSelectorNote
    })
    this.closeModelSelector()
  },

  handleCancelSelectModel() {
    // 关闭选择器
    this.closeModelSelector()
  },

  handelTitleInput(e) {
    this.setData({
      title: e.detail.value
    })
  },

  handelPromptInput(e) {
    this.setData({
      prompt: e.detail.value
    })
  },

  handleCreateNewChat() {
    if (!this.data.selectModelId) {
      // 字段校验
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请先选择模型',
        icon: 'info-circle',
      })
      return
    }
    if (!this.data.title) {
      // 字段校验
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请设置聊天标题',
        icon: 'info-circle',
      })
      return
    }
    const newChatItem = {
      chatId: genRandomId('chat', 20),
      avatorUrl: this.data.chatAvatar,
      modelId: this.data.selectModelId,
      title: this.data.title,
      prompt: this.data.prompt,
      createTimestamp: Date.now()
    }
    this.saveChatToStorage(newChatItem)
  }

})
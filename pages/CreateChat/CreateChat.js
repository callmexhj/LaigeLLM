// pages/CreateChat/CreateChat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chatAvatar: null
  },

  handleAvatarChanged(e) {
    // 响应头像变更事件
    this.setData({
      chatAvatar: e.detail.currentAvatar
    })
  },

  handleShowModelSelector() {
    
  }

})
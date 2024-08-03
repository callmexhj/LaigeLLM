// index.js
const app = getApp()
Page({
  onShow() {
    if (typeof this.getTabBar === 'function' ) {
      this.getTabBar((tabBar) => {
        tabBar.setData({
          selectedTab: 'chat'
        })
      })
    }
  },
  data: {
    tabbarHeight: app.globalData.tabbarHeight,
    chatList: [
      {
        chatId: '12312313',
        title: 'This is the Chat title',
        subtitle: 'This is the Chat subtitle This is the Chat subtitle This is the Chat subtitle This is the Chat subtitle',
        modelLabel: 'Default Label'
      }
    ]
  },

  handleClickChatItem(e) {
    console.log(e.detail.chatId)
  },

  handleAddChatItem() {
    
  }
})
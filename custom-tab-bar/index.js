// custom-tab-bar/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    selectedTab: 'chat',
    tabBarList: [{
        value: 'chat',
        icon: 'chat',
        ariaLabel: '聊天',
        url: '/pages/index/index'
      },
      {
        value: 'modelSetting',
        icon: 'cat',
        ariaLabel: '模型',
        url: '/pages/ModelSetting/ModelSetting'
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTabChange(e) {
      const tabValue = e.detail.value
      const pageUrl = this.data.tabBarList.find(item => item.value === tabValue)?.url
      wx.switchTab({
        url: pageUrl,
      })
    }
  }
})
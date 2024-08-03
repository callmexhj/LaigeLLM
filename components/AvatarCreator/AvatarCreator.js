// components/AvatarCreator/AvatarCreator.js
import { avatarList } from '../../systemConfig/avatarList'

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
    currentImg: 0,
    swiperList: [...avatarList]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleRandomChangeAvatar() {
      // 随机选择一个头像
      const randomIndex = Math.floor(Math.random() * this.data.swiperList.length)
      this.setData({
        currentImg: randomIndex
      })
    },
    handleSwpierChanged(e) {
      // 更新当前currentImg并触发change事件
      const currentIndex = e.detail.current
      this.setData({
        currentImg: currentIndex
      })
      this.triggerEvent('change', { currentAvatar: this.data.swiperList[currentIndex] })
    }
  }
})
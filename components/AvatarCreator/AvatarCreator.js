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
    selectedAvatar: "",
    currentImg: 0,
    swiperList: [...avatarList]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleRandomChangeAvatar() {
      const randomIndex = Math.floor(Math.random() * this.data.swiperList.length)
      this.setData({
        currentImg: randomIndex
      })
    },
    handleSwpierChanged(e) {
      const currentIndex = e.detail.current
      this.setData({
        currentImg: currentIndex
      })
      this.triggerEvent('change', { currentAvatar: this.data.swiperList[currentIndex] })
    }
  }
})
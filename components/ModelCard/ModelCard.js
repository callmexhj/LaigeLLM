// components/ModelCard/ModelCard.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    modelIco: {
      type: String,
      value: './人工智能.png'
    },
    modelSubTitle: {
      type: String,
      value: 'Default SubTitle'
    },
    simpleModelId: {
      type: String,
      value: 'modelId'
    },
    modelTitle: {
      type: String,
      value: 'Default SubTitle'
    },
    hideIco: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleModifyModel() {
      this.triggerEvent('modifyModel')
    }
  }
})
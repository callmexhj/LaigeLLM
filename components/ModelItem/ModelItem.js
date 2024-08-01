// components/ModelItem/ModelItem.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    theme: {
      type: String
    },
    modelIco: {
      type: String,
      value: './人工智能.png'
    },
    modelTitle: {
      type: String,
      value: 'Default Title For Model'
    },
    modelSubTitle: {
      type: String,
      value: 'Default SubTitle'
    },
    modelId: {
      type: String,
      value: null
    },
    simpleModelId: {
      type: String,
      value: 'modelId'
    },
    isNew: {
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
    handleCreateModel() {
      this.triggerEvent('createModel')
    },
    handleModifyModel() {
      this.triggerEvent('modifyModel', {modelId: this.properties.modelId})
    }
  }
})
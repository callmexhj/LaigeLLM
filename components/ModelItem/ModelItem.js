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
    isCard: {
      type: Boolean,
      value: false
    },
    isAdd: {
      type: Boolean,
      value: false
    },
    showEdit: {
      type: Boolean,
      value: false
    },
    isInEdit: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isChoosed: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleCreateModel() {
      this.triggerEvent('createModel')
    },
    handleModifyModel() {
      if (this.properties.isInEdit) {
        this.triggerEvent('chooseModel', {
          modelId: this.properties.modelId
        })
        this.setData({
          isChoosed: !this.data.isChoosed
        })
      } else {
        this.triggerEvent('modifyModel', {
          modelId: this.properties.modelId
        })
        this.setData({
          isChoosed: false
        })
      }
    },
    handleEditList() {
      this.triggerEvent('editList')
    },
    handleDeleteModels() {
      this.triggerEvent('deleteModels')
    },
    handleCancelDelete() {
      this.triggerEvent('cancelDelete')
    }
  }
})
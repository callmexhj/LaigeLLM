import {
  getModelNameByModelValue
} from '../systemConfig/modelOptions'

const colorList = ['#ffd591', '#ffbb96', '#ffa39e', '#91caff', '#87e8de', '#b7eb8f']

export function getModelList() {
  // 从缓存获取ModelList并渲染
  return new Promise((resolve) => {
    wx.getStorage({
      key: 'modelList',
      success(res) {
        const {
          errMsg
        } = res
        if (errMsg === 'getStorage:ok') {
          const {
            data
          } = res
          let index = 0
          const modelList = data.map((item) => {
            const {
              modelName,
              modelVersion,
              modelId,
              config
            } = item
            const [modelLabel, versionLabel] = getModelNameByModelValue(modelName, modelVersion)
            return {
              modelTitle: modelLabel,
              modelSubTitle: versionLabel,
              modelId,
              config,
              simpleModelId: modelId.slice(-6),
              theme: colorList[index++ % colorList.length]
            }
          })
          resolve(modelList)
        }
      }
    })
  })
}
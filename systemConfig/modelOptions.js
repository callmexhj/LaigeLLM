// 可用模型选项配置
export const modelOptions = [{
  value: 'TONGYI',
  label: '通义千问',
  children: [ {
    value: 'QWENTURBO',
    label: 'quen-turbo'
  }, {
    value: 'QWENPLUS',
    label: 'quen-plus'
  }, {
    value: 'QWENMAX',
    label: 'quen-max'
  }]
}]

export function getModelNameByModelValue(modelValue, modleVersion) {
  // 根据模型value和版本value寻找可以用于用户展示的模型信息
  const modelOption = modelOptions.find(option => option.value === modelValue)
  let modelChild = null
  if (modelOption) {
    modelChild = modelOption.children.find(child => child.value === modleVersion)
  }
  return [modelOption.label, modelChild.label]
}
export function genRequest(modelInfo, messages) {
  // console.log(modelInfo)
  const { modelNameTrue, modelVersionTrue, config } = modelInfo
  let url = ''
  let header = {}
  let data = {}
  if (modelNameTrue === '通义千问') {
    const { APIKey } = config
    url = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions'
    header = {
      'Authorization': `Bearer ${APIKey}`,
      'Content-Type': 'application/json'
    }
    data = {
      model: modelVersionTrue,
      messages: [...messages],
      stream: true
    }
  }
  const request = wx.request({
    url,
    header,
    enableChunked: true,
    method: 'POST',
    data
  })
  return request
}

export function handleRequest(res) {
  const decoder = new TextDecoder('utf-8')
  const responseString = decoder.decode(res)
  // 按api接口格式截取字符串后转换成数组
  const jsonStringArray = responseString.split('data:')
  const contents = [];
  for (let i = 1; i < jsonStringArray.length; i++) {
    const jsonItem = JSON.parse(jsonStringArray[i])
    // console.log(jsonItem)
    const {
      choices: [
        { delta: { content } }
      ]
    } = jsonItem
    contents.push(content)
    if (jsonItem.choices[0].finish_reason === 'stop') {
      return { stop: true }
    }
  }
  const fullRes = contents.join('')
  return fullRes
}
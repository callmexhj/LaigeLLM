// components/ChatInput/ChatInput.js
let resText = ''
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
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleInput(e) {
      this.triggerEvent('input', e)
    },
    handleSend() {
      this.triggerEvent('sendMessage')
      const request = wx.request({
        url: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
        header: {
          'Authorization': 'Bearer sk-26f66ae996a84bdfbde92c9410d85f70',
          'Content-Type': 'application/json'
        },
        enableChunked: true,
        method: 'POST',
        data: {
          model: 'qwen-turbo',
          messages: [{
              role: 'system',
              content: 'You are a helpful assistant.'
            },
            {
              role: 'user',
              content: '今天天气如何'
            }
          ],
          stream: true
        },
        success(res) {
          // console.log(res)
        }
      })
      request.onChunkReceived((res) => {
        const resText = this.handleRequest(res.data)
        this.triggerEvent('receiveMessage', resText)
      })
    },

    handleRequest(res) {
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
        if (jsonItem.choices[0].finish_reason === 'stop') break
      }
      const fullRes = contents.join('')
      return fullRes
    }
  }
})
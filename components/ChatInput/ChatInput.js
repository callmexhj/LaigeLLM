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
    inputValue: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleInputMessage(e) {
      this.setData({
        inputValue: e.detail.value
      })
    },
    handleSend() {
      this.triggerEvent('sendMessage', this.data.inputValue)
      this.setData({
        inputValue: ''
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
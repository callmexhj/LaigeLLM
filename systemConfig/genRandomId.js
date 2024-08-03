export const genRandomId = (pre, length) => {
  // 根据给定length输出随机字符

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''

  for (let i = 0; i < length; i++) {
    // 从字符集中随机选择一个字符添加到结果字符串
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return `${pre}-${result}`
}
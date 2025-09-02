// 格式化日期
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString()
}

// 防抖函数
export const debounce = <T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void => {
  let timeout: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => func(...args), wait)
  }
}

// 节流函数
export const throttle = <T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void => {
  let inThrottle: boolean = false
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
interface fn{
  (): any 
}
/**
 * 防抖
 * @param fn 回调方法
 */
export const debounce = function (fn: fn): fn {
  let timer: any = null
  return function () {
    clearTimeout(timer)
    timer = setTimeout(fn, 200)
  }
}
export const commaFormat = (value) => {
  return Intl.NumberFormat().format(value)
}

export const arrayMove = (arr, fromIndex, toIndex) => {
  const el = arr[fromIndex]
  arr.splice(fromIndex, 1)
  arr.splice(toIndex, 0, el)
}

export default {
  commaFormat,
  arrayMove,
}

export const commaFormat = (value) => {
  return Intl.NumberFormat().format(value)
}

export default {
  commaFormat,
}

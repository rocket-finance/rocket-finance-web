const lightColors = {
  first: '#f8f9faff',
  second: '#e9ecefff',
  third: '#dee2e6ff',
  fourth: '#ced4daff',
  fifth: '#adb5bdff',
  sixth: '#6c757dff',
  seventh: '#495057ff',
  eight: '#343a40ff',
  nine: '#212529ff',
}

const darkColors = {
  first: '#212529ff',
  second: '#343a40ff',
  third: '#495057ff',
  fourth: '#6c757dff',
  fifth: '#adb5bdff',
  sixth: '#ced4daff',
  seventh: '#dee2e6ff',
  eight: '#e9ecefff',
  nine: '#f8f9faff',
}

const getColor = (_isDark: boolean) => (_isDark ? darkColors : lightColors)

export default getColor

import Toast from 'react-native-toast-message'

export const showToastMessage = (type, text, subText) => {
  Toast.show({
    type,
    text1: text,
    text2: subText,
    position: 'bottom'
  })
}

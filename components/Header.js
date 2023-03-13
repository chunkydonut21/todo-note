import { StyleSheet, Text } from 'react-native'
import Colours from '../Colours'

const Header = ({ title, subTitle }) => {
  return (
    <Text style={styles.header}>
      {title} <Text style={styles.subHeader}>{subTitle}</Text>
    </Text>
  )
}

const styles = StyleSheet.create({
  header: { fontSize: 52, color: Colours.black, fontWeight: 'bold', alignSelf: 'center', marginBottom: 24 },
  subHeader: { fontSize: 52, color: Colours.blue, fontWeight: 'normal' }
})

export default Header

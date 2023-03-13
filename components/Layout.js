import React from 'react'
import { View, ImageBackground, StyleSheet } from 'react-native'

const Layout = ({ children }) => {
  return (
    <View>
      <ImageBackground source={require('../assets/background.jpeg')} style={{ height: '100%' }} />
      <View style={styles.container}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginTop: 80,
    position: 'absolute',
    alignSelf: 'center'
  }
})

export default Layout

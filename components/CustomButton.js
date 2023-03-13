import { Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { LoadingIndicator } from './LoadingIndicator'

export const CustomButton = ({ color, backgroundColor, label, onPress, showIndicator }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: backgroundColor,
        borderRadius: 28,
        alignItems: 'center',
        width: 350,
        paddingVertical: 8,
        marginVertical: 12
      }}
    >
      <Text style={{ color: color, fontSize: 24, fontWeight: 'bold' }}>
        {label} {showIndicator && <LoadingIndicator color="black" />}
      </Text>
    </TouchableOpacity>
  )
}

import { useTheme } from '@react-navigation/native'
import { useField } from 'formik'
import { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import Colours from '../Colours'

export const CustomInput = ({ name, label, ...props }) => {
  const [field, meta, helpers] = useField(name)
  const [focused, setFocused] = useState(false)
  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <TextInput
        style={styles.input}
        {...props}
        onChangeText={helpers.setValue}
        onBlur={() => {
          helpers.setTouched(true)
          setFocused(false)
        }}
        onFocus={() => setFocused(true)}
        value={field.value}
      />
      {meta.touched && meta.error ? <Text style={{ color: colors.notification }}>{meta.error}</Text> : <Text> </Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8
  },
  label: {
    fontSize: 16
  },
  input: {
    borderRadius: 28,
    color: Colours.black,
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: '#fff',
    marginVertical: 10,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 8
  }
})

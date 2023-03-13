import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, FlatList, KeyboardAvoidingView, TextInput } from 'react-native'
import { useDispatch } from 'react-redux'
import Colours from '../Colours'
import { addTodo } from '../redux/todoSlice'
import { CustomButton } from './CustomButton'
import SelectDropdown from 'react-native-select-dropdown'
import { groups } from '../utils/groups'
const priorities = ['Low', 'Medium', 'High']

export default AddListModal = ({ closeModal }) => {
  const backgroundColours = Object.values(Colours).filter((i) => i !== '#F5F5F5')
  const [todo, setTodo] = useState({
    name: '',
    description: '',
    group: '',
    priority: '',
    colour: backgroundColours[0]
  })

  const dispatch = useDispatch()

  const renderColours = () => {
    return (
      <FlatList
        data={backgroundColours ?? []}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            style={[styles.colorSelect, { backgroundColor: item }]}
            onPress={() => setTodo({ ...todo, colour: item })}
          />
        )}
        keyboardShouldPersistTaps="always"
      />
    )
  }

  const createTodo = () => {
    setTodo({
      name: '',
      description: '',
      group: '',
      priority: ''
    })
    dispatch(addTodo({ ...todo, colour: todo.colour, todos: [] }))
    closeModal()
  }
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity style={styles.main} onPress={closeModal}>
        <Ionicons name="close" size={24} color={colours.black} />
      </TouchableOpacity>
      <View style={{ alignSelf: 'stretch', marginHorizontal: 32 }}>
        <Text style={styles.header}>
          Create <Text style={[styles.subHeader, { color: todo.colour }]}>Todo Note</Text>
        </Text>
        <TextInput
          style={[styles.input, { borderColor: todo.colour }]}
          placeholder="Name your Todo"
          onChangeText={(text) => setTodo({ ...todo, name: text })}
          value={todo.name}
        />
        <TextInput
          style={[styles.inputTextBox, { borderColor: todo.colour }]}
          editable
          multiline
          numberOfLines={4}
          maxLength={40}
          placeholder="Your Todo Description"
          onChangeText={(text) => setTodo({ ...todo, description: text })}
          value={todo.description}
        />

        <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 24 }}>
          <SelectDropdown
            data={groups}
            onSelect={(selectedItem, index) => {
              setTodo({ ...todo, group: selectedItem })
            }}
            defaultButtonText="Select Group"
            buttonStyle={{
              backgroundColor: Colours.lightGray,
              borderRadius: 28,
              flex: 1
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              return item
            }}
            renderDropdownIcon={(isOpened) => {
              return <Ionicons name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#FFF'} size={18} />
            }}
            dropdownIconPosition={'right'}
          />
          <SelectDropdown
            data={priorities}
            onSelect={(selectedItem, index) => {
              setTodo({ ...todo, priority: selectedItem })
            }}
            defaultButtonText="Select Priority"
            buttonStyle={{
              backgroundColor: Colours.lightGray,
              borderRadius: 28,
              flex: 1
            }}
            renderDropdownIcon={(isOpened) => {
              return <Ionicons name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#FFF'} size={18} />
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              return item
            }}
          />
        </View>
        <View>{renderColours()}</View>
        <View style={{ alignSelf: 'center', marginTop: 24 }}>
          <CustomButton color={Colours.white} backgroundColor={todo.colour} label="Create!" onPress={createTodo} />
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  main: {
    position: 'absolute',
    top: 64,
    right: 32
  },
  input: {
    borderRadius: 28,
    color: Colours.black,
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: '#fff',
    marginVertical: 10,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth + 1,
    paddingHorizontal: 8
  },
  inputTextBox: {
    borderRadius: 28,
    color: Colours.black,
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: '#fff',
    marginVertical: 10,
    height: 120,
    borderWidth: StyleSheet.hairlineWidth + 1,
    paddingHorizontal: 8,
    fontSize: 16
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4,
    marginRight: 8
  },
  header: { fontSize: 36, color: Colours.black, fontWeight: 'bold', alignSelf: 'center', marginBottom: 24 },
  subHeader: { fontSize: 36, fontWeight: 'normal' }
})

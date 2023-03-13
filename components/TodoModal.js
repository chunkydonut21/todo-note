import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  SafeAreaView,
  Keyboard
} from 'react-native'
import { useDispatch } from 'react-redux'
import Colours from '../Colours'
import { addSubTodo, deleteSubTodo, updateList } from '../redux/todoSlice'

export default function TodoModal({ list, closeModal }) {
  const { name, colour, todos, description, priority, group } = list
  const [text, setText] = useState('')
  const completedCount = list.todos.filter((item) => item.completed).length

  const dispatch = useDispatch()

  const updateTodoList = (index) => dispatch(updateList({ id: list.id, index }))

  const handleSubmitSubTodo = () => {
    dispatch(addSubTodo({ id: list.id, item: { title: text, completed: false } }))
    setText('')
    Keyboard.dismiss()
  }

  const renderTodo = (item, index) => {
    return (
      <View style={styles.todoContainer}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => updateTodoList(index)}>
            <Ionicons
              name={item.completed ? 'ios-square' : 'ios-square-outline'}
              size={24}
              color={Colours.gray}
              style={{ width: 28 }}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.todo,
              {
                color: item.completed ? Colours.gray : Colours.black,
                textDecorationLine: item.completed ? 'line-through' : 'none'
              }
            ]}
          >
            {item.title}
          </Text>
        </View>
        <TouchableOpacity onPress={() => dispatch(deleteSubTodo({ id: list.id, index }))}>
          <Ionicons name="close" size={28} />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={{ position: 'absolute', top: 64, right: 32, zIndex: 10 }} onPress={closeModal}>
          <Ionicons name="close" size={24} color={Colours.black} />
        </TouchableOpacity>
        <View style={[styles.header, { borderBottomColor: colour }]}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subTitle}>{description}</Text>
        </View>
        <View style={styles.countContainer}>
          <Text style={styles.taskCount}>
            {completedCount} of {list.todos.length} tasks
          </Text>
        </View>
        <View style={[styles.section, { flex: 3 }]}>
          <FlatList
            data={todos}
            renderItem={({ item, index }) => renderTodo(item, index)}
            keyExtractor={(item) => item.title}
            contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 64 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            value={text}
            onChangeText={(text) => setText(text)}
            style={[styles.input, { borderColor: colour }]}
            placeholder="Enter a subtask....."
          />
          <TouchableOpacity
            style={[styles.addTodoButton, { backgroundColor: colour }]}
            onPress={() => handleSubmitSubTodo()}
          >
            <Ionicons name="add" size={20} color={Colours.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  section: {
    flex: 1,
    alignSelf: 'stretch'
  },
  header: {
    marginTop: 64,
    alignSelf: 'flex-start',
    borderBottomWidth: 3,
    marginHorizontal: 16
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8
  },
  subTitle: {
    fontSize: 18,
    color: Colours.gray,
    marginBottom: 16
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    fontSize: 18,
    color: colours.gray
  },
  inputBox: {
    flex: 1,
    alignSelf: 'center',
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    borderRadius: 28,
    color: Colours.black,
    paddingHorizontal: 10,
    width: '90%',
    marginRight: 8,
    backgroundColor: '#fff',
    marginVertical: 10,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 8
  },
  addTodoButton: {
    borderRadius: 28,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  todoContainer: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  todo: {
    color: colours.black,
    fontWeight: 'bold',
    fontSize: 18
  },
  countContainer: {
    alignSelf: 'flex-end',
    marginRight: 32,
    marginTop: 16
  }
})

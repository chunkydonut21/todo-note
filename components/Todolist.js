import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native'
import { useDispatch } from 'react-redux'
import Colours from '../Colours'
import { deleteTodo } from '../redux/todoSlice'
import TodoModal from './TodoModal'

export default function Todolist({ list }) {
  const [visible, setVisible] = useState(false)
  const completedCount = list.todos.filter((item) => item.completed).length
  const dispatch = useDispatch()
  const toggleVisibility = () => setVisible(!visible)

  return (
    <View>
      <Modal animationType="slide" visible={visible} onRequestClose={toggleVisibility}>
        <TodoModal list={list} closeModal={toggleVisibility} />
      </Modal>
      <TouchableOpacity style={[styles.listContainer, { backgroundColor: list.colour }]} onPress={toggleVisibility}>
        <View>
          <Text style={styles.listTitle}>{list.name}</Text>
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.listSubTitle}>{list.priority} Priority </Text>
            <Text style={[styles.listSubTitle, { fontWeight: 'bold', fontSize: 18 }]}>{list.group.toUpperCase()}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.count}>
              {completedCount} <Text style={{ fontSize: 24 }}>of</Text> {list.todos.length}
            </Text>
            <Text style={styles.subtitle}>Tasks Completed</Text>
          </View>
        </View>
        <Ionicons
          onPress={() => dispatch(deleteTodo(list.id))}
          style={{ position: 'absolute', right: 0, top: 0, color: Colours.white }}
          name="close"
          size={28}
        />
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    margin: 12,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  listTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colours.white,
    marginBottom: 8
  },
  listSubTitle: {
    fontSize: 16,
    color: Colours.white
  },
  count: {
    fontSize: 36,
    fontWeight: '200',
    color: Colours.white
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 700,
    color: Colours.white
  }
})

import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice, current } from '@reduxjs/toolkit'
import { auth } from '../Firebase'

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todoLists: []
  },
  reducers: {
    addTodo: (state, action) => {
      state.todoLists = [...state.todoLists, { ...action.payload, id: state.todoLists.length + 1 }]
      updateAsync(state.todoLists)
    },
    setTodoList: (state, action) => {
      state.todoLists = action.payload ?? []
    },
    deleteTodo: (state, action) => {
      state.todoLists = [...state.todoLists.filter((todo) => todo.id != action.payload)]
      updateAsync(state.todoLists)
    },
    updateList: (state, action) => {
      state.todoLists = state.todoLists.map((i, idx) =>
        i.id === action.payload.id
          ? {
              ...i,
              todos: i.todos.map((j, jdx) => (jdx === action.payload.index ? { ...j, completed: !j.completed } : j))
            }
          : i
      )
      updateAsync(state.todoLists)
    },
    addSubTodo: (state, action) => {
      state.todoLists = state.todoLists.map((i, idx) =>
        i.id === action.payload.id
          ? {
              ...i,
              todos: [...i.todos, action.payload.item]
            }
          : i
      )
      updateAsync(state.todoLists)
    },
    deleteSubTodo: (state, action) => {
      state.todoLists = state.todoLists.map((i, idx) =>
        i.id === action.payload.id
          ? {
              ...i,
              todos: i.todos.filter((j, jdx) => jdx !== action.payload.index)
            }
          : i
      )
      updateAsync(state.todoLists)
    }
  }
})

const updateAsync = (list) => {
  AsyncStorage.setItem(auth.currentUser.uid, JSON.stringify(list)).catch((error) => {
    console.error(error)
  })
}

export const { addTodo, deleteTodo, updateList, addSubTodo, deleteSubTodo, setTodoList } = todoSlice.actions

export const getTodoList = (state) => {
  return state.todos.todoLists
}

export default todoSlice.reducer

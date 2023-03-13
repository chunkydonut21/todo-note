import { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native'
import store from './store'
import TodoApp from './pages/TodoApp'
import { createStackNavigator } from '@react-navigation/stack'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './Firebase'
import { getCurrentUser, setCurrentUser } from './redux/authSlice'
import Toast from 'react-native-toast-message'
import Navigation from './Navigation'
import { addTodo, setTodoList } from './redux/todoSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Main = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(getCurrentUser)

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      dispatch(setCurrentUser(user ? user.uid : null))
    })
  }, [])

  useEffect(() => {
    AsyncStorage.getItem(currentUser).then((res) => {
      dispatch(setTodoList(JSON.parse(res)))
    })
  }, [currentUser])

  return (
    <View style={styles.container}>
      <Navigation />
      <StatusBar style="auto" />
      <Toast />
    </View>
  )
}

export default Main

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff'
  },
  cellContainer: {
    width: '100%'
  },
  cellImageView: {
    width: '100%',
    height: 290,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cellImage: {
    width: '100%',
    height: '100%'
  },
  cellTextView: {
    padding: 12,
    width: '100%'
  },
  cellTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000'
  },
  cellTagline: {
    fontSize: 14,
    color: '#666'
  },
  cellEta: {
    position: 'absolute',
    right: 10,
    top: -25,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: '50%'
  },
  cellEtaText: {
    fontSize: 14,
    textAlign: 'center'
  }
})

import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { SafeAreaView, View, TouchableOpacity } from 'react-native'
import TodoApp from './pages/TodoApp'
import { createStackNavigator } from '@react-navigation/stack'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useSelector } from 'react-redux'
import { getCurrentUser } from './redux/authSlice'

import { Ionicons } from '@expo/vector-icons'
import Settings from './pages/Settings'
import Group from './pages/Group'

const ActionBarImage = () => {
  const navigation = useNavigation()

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Ionicons name="settings-outline" size={24} color={colours.gray} style={{ width: 32, marginEnd: 12 }} />
      </TouchableOpacity>
    </View>
  )
}
const Navigation = () => {
  const Stack = createStackNavigator()

  const currentUser = useSelector(getCurrentUser)

  if (currentUser) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Todo Note"
              component={TodoApp}
              options={{
                headerRight: () => <ActionBarImage />
              }}
            />
            <Stack.Screen
              name="Group"
              component={Group}
              options={{
                headerRight: () => <ActionBarImage />
              }}
            />
            <Stack.Screen name="Settings" component={Settings} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

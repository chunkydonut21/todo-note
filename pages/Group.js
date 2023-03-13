import { StyleSheet, Text, View, FlatList } from 'react-native'
import Todolist from '../components/Todolist'
import { useSelector } from 'react-redux'
import { getTodoList } from '../redux/todoSlice'
import Colours from '../Colours'

export default Group = (props) => {
  const { group } = props.route.params
  const todoLists = useSelector(getTodoList)

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.cellTagline, { marginLeft: 16, marginTop: 16 }]}>{group} Todos</Text>
        <FlatList
          data={(todoLists ?? []).filter((j) => j.group === group) ?? []}
          keyExtractor={(item) => item.name}
          renderItem={({ item, index }) => <Todolist key={index} list={item} />}
          keyboardShouldPersistTaps="always"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  cellContainer: {
    width: '100%',
    borderBottomColor: Colours.lightGray,
    borderBottomWidth: 1
  },
  cellTextView: {
    padding: 8,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cellTagline: {
    fontSize: 16,
    color: '#666'
  }
})

import { StyleSheet, Text, TouchableOpacity, View, FlatList, Modal } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Todolist from '../components/Todolist'
import { useState } from 'react'
import AddListModal from '../components/AddListModal'
import { useSelector } from 'react-redux'
import { getTodoList } from '../redux/todoSlice'
import { TableView, Cell, Section } from 'react-native-tableview-simple'
import { groups } from '../utils/groups'
import Colours from '../Colours'
import { useNavigation } from '@react-navigation/native'

const CircleBorder = ({ children }) => (
  <View
    style={{
      borderRadius: 28,
      position: 'absolute',
      right: 10,
      zIndex: 99,
      bottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2
    }}
  >
    {children}
  </View>
)

export default function TodoApp() {
  const [visible, setVisible] = useState(false)

  const todoLists = useSelector(getTodoList)

  const toggleVisibility = () => setVisible(!visible)
  const navigation = useNavigation()
  const handleIcon = (item) => {
    switch (item) {
      case 'Work':
        return <Ionicons name="document-attach-outline" size={24} />
      case 'Personal':
        return <Ionicons name="reader-outline" size={24} />
      case 'Important':
        return <Ionicons name="mail-unread-outline" size={24} />
      default:
        return <Ionicons name="grid-outline" size={24} />
    }
  }

  return (
    <View style={styles.container}>
      <Modal animationType="slide" visible={visible} onRequestClose={toggleVisibility}>
        <AddListModal closeModal={toggleVisibility} />
      </Modal>

      <TableView>
        <Section header="Groups" hideSeparator={true}>
          {groups.map((item, index) => {
            return (
              <Cell
                key={index}
                backgroundColor="transparent"
                highlightUnderlayColor="#ccc"
                cellContentView={
                  <View style={styles.cellContainer}>
                    <View style={styles.cellTextView}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {handleIcon(item)}
                        <Text style={[styles.cellTagline, { marginLeft: 4 }]}>{item}</Text>
                      </View>
                      <Text style={styles.cellTagline}>
                        {(todoLists ?? []).filter((j) => j.group === item)?.length}
                      </Text>
                    </View>
                  </View>
                }
                onPress={() => navigation.navigate('Group', { group: item })}
              />
            )
          })}
        </Section>
      </TableView>

      <CircleBorder>
        <TouchableOpacity onPress={toggleVisibility}>
          <Ionicons name="add-circle" size={64} color="#FFD700" />
        </TouchableOpacity>
      </CircleBorder>
      <View>
        <Text style={[styles.cellTagline, { marginLeft: 16, marginTop: 16 }]}>Recently Added</Text>
        <FlatList
          data={todoLists ?? []}
          keyExtractor={(item) => item.name}
          renderItem={({ item, index }) => <Todolist key={index} list={item} />}
          keyboardShouldPersistTaps="always"
        />
      </View>
      {/* <StatusBar style="auto" /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 38,
    fontWeight: 800,
    color: Colours.black,
    paddingHorizontal: 64
  },
  addList: {
    borderWidth: 2,
    borderColor: Colours.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  add: {
    color: Colours.blue,
    fontWeight: 600,
    fontSize: 14,
    marginTop: 8
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

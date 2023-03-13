import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { auth } from '../Firebase'
import { showToastMessage } from '../utils/showToastMessage'
import { CustomButton } from '../components/CustomButton'
import Colours from '../Colours'
import Header from '../components/Header'
import { TableView, Cell, Section } from 'react-native-tableview-simple'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'

const Settings = (props) => {
  const logout = () => {
    auth
      .signOut()
      .then(() => {
        // AsyncStorage.clear().catch((error) => {
        //   console.error(error)
        // })
        showToastMessage('success', 'Success', 'Successfully signed out!')
      })
      .catch((error) => {
        if (error.code) showToastMessage('error', 'Error', error.code)
      })
  }

  return (
    <View style={styles.container}>
      <Header title="Todo" subTitle="Note" />
      <ScrollView>
        <TableView>
          <Section header="User Info" hideSeparator={true}>
            <Cell
              backgroundColor="transparent"
              highlightUnderlayColor="#ccc"
              cellContentView={
                <View style={styles.cellContainer}>
                  <View style={styles.cellTextView}>
                    <Text style={styles.cellTagline}>Your Id</Text>
                    <Text style={styles.cellTagline}>{auth.currentUser.uid}</Text>
                  </View>
                </View>
              }
              onPress={() => {}}
            />

            <Cell
              backgroundColor="transparent"
              highlightUnderlayColor="#ccc"
              cellContentView={
                <View style={styles.cellContainer}>
                  <View style={styles.cellTextView}>
                    <Text style={styles.cellTagline}>Email</Text>
                    <Text style={styles.cellTagline}>{auth.currentUser.email}</Text>
                  </View>
                </View>
              }
              onPress={() => {}}
            />
            <Cell
              backgroundColor="transparent"
              highlightUnderlayColor="#ccc"
              cellContentView={
                <View style={styles.cellContainer}>
                  <View style={styles.cellTextView}>
                    <Text style={styles.cellTagline}>Creation Time</Text>
                    <Text style={styles.cellTagline}>
                      {moment.utc(auth.currentUser.metadata.creationTime).format('YYYY-MM-DD h:mm a')}
                    </Text>
                  </View>
                </View>
              }
              onPress={() => {}}
            />
            <Cell
              backgroundColor="transparent"
              highlightUnderlayColor="#ccc"
              cellContentView={
                <View style={styles.cellContainer}>
                  <View style={styles.cellTextView}>
                    <Text style={styles.cellTagline}>Last LoggedIn Time</Text>
                    <Text style={styles.cellTagline}>
                      {moment.utc(auth.currentUser.metadata.lastSignInTime).format('YYYY-MM-DD h:mm a')}
                    </Text>
                  </View>
                </View>
              }
              onPress={() => {}}
            />
          </Section>
        </TableView>

        <View style={{ alignSelf: 'center', marginTop: 24 }}>
          <CustomButton color="white" backgroundColor={Colours.red} label="Logout" onPress={() => logout()} />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 36,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cellContainer: {
    width: '100%'
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
  },
  header: { fontSize: 52, color: Colours.black, fontWeight: 'bold', alignSelf: 'center', marginBottom: 24 },
  subHeader: { fontSize: 52, color: Colours.blue, fontWeight: 'normal' }
})

export default Settings

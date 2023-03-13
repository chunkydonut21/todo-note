import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { FormikProvider, useFormik } from 'formik'
import { CustomInput } from '../components/CustomInput'
import * as Yup from 'yup'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Firebase'
import { showToastMessage } from '../utils/showToastMessage'
import Layout from '../components/Layout'
import { CustomButton } from '../components/CustomButton'
import Colours from '../Colours'
import Header from '../components/Header'

const Login = (props) => {
  const navigation = useNavigation()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: ({ email, password }) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          formik.setSubmitting(false)
          showToastMessage('success', 'Success', "You've logged in successfully.")
          // navigation.navigate('TodoApp')
        })
        .catch((err) => {
          formik.setSubmitting(false)
          showToastMessage('error', 'Error', err.code)
        })
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('This email is not valid').required('This field is required.'),
      password: Yup.string().required('This field is required.')
    })
  })

  return (
    <Layout>
      <Header title="Todo" subTitle="Note" />
      <FormikProvider value={formik}>
        <CustomInput
          name="email"
          label="Email"
          textContentType="emailAddress"
          autoCapitalize="none"
          autoCompleteType="email"
          autoCorrect={false}
          keyboardType="email-address"
        />
        <CustomInput
          name="password"
          label="Password"
          textContentType="password"
          autoCapitalize="none"
          autoCompleteType="password"
          autoCorrect={false}
          secureTextEntry
        />
        <CustomButton
          color="white"
          backgroundColor={Colours.blue}
          label="Login"
          onPress={formik.submitForm}
          showIndicator={formik.isSubmitting}
        />
      </FormikProvider>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <View style={{ alignSelf: 'center' }}>
          <Text>
            Don't have account? <Text style={{ color: Colours.blue }}>Sign up now</Text>
          </Text>
        </View>
      </TouchableOpacity>
    </Layout>
  )
}

const styles = StyleSheet.create({
  header: { fontSize: 52, color: Colours.black, fontWeight: 'bold', alignSelf: 'center', marginBottom: 24 },
  subHeader: { fontSize: 52, color: Colours.blue, fontWeight: 'normal' }
})

export default Login

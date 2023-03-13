import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { CustomInput } from '../components/CustomInput'
import * as Yup from 'yup'
import { FormikProvider, useFormik } from 'formik'
import { showToastMessage } from '../utils/showToastMessage'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Firebase'
import Layout from '../components/Layout'
import Header from '../components/Header'
import { CustomButton } from '../components/CustomButton'
import Colours from '../Colours'
import { useNavigation } from '@react-navigation/native'

const Signup = (props) => {
  const navigation = useNavigation()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    onSubmit: ({ name, email, password }) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          formik.setSubmitting(false)
          showToastMessage('success', 'Success', "You've successfully created your account.")
          navigation.navigate('Login')
        })
        .catch((err) => {
          formik.setSubmitting(false)
          if (err.code) showToastMessage('error', 'Error', err.code)
        })
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('This email is not valid').required('This field is required.'),
      password: Yup.string().required('This field is required.'),
      confirmPassword: Yup.string()
        .required('This field is required.')
        .oneOf([Yup.ref('password'), null], 'Confirm Password should match the password.')
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
        <CustomInput
          name="confirmPassword"
          label="Confirm Password"
          textContentType="password"
          autoCapitalize="none"
          autoCompleteType="password"
          autoCorrect={false}
          secureTextEntry
        />
        <CustomButton
          color="white"
          backgroundColor={Colours.blue}
          label="Signup"
          onPress={formik.submitForm}
          showIndicator={formik.isSubmitting}
        />
      </FormikProvider>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <View style={{ alignSelf: 'center' }}>
          <Text>
            Already have an account? <Text style={{ color: Colours.blue }}>Login now</Text>
          </Text>
        </View>
      </TouchableOpacity>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15
  }
})

export default Signup

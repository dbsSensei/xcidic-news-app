import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Yup from 'yup';

import Colors from '../../utils/colors';
import SafeView from '../../components/SafeView';
import Form from '../../components/Forms/Form';
import FormField from '../../components/Forms/FormField';
import FormButton from '../../components/Forms/FormButton';
import IconButton from '../../components/IconButton';
import { passwordReset } from '../../components/Firebase/firebase';
import FormErrorMessage from '../../components/Forms/FormErrorMessage';
import useStatusBar from '../../hooks/useStatusBar';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email')
});

export default function ForgotPasswordScreen({ navigation }:any) {
  useStatusBar('light-content');

  const [customError, setCustomError] = useState('');

  async function handlePasswordReset(values:any) {
    const { email } = values;

    try {
      await passwordReset(email);
      navigation.navigate('Welcome');
    } catch (error) {
      setCustomError(error.message);
    }
  }

  return (
    <SafeView style={styles.container}>
        <Text style={styles.subtitle}>Enter email address and check your inbox</Text>
      <Form
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
        onSubmit={(values:any) => handlePasswordReset(values)}
        >
        <FormField
          name="email"
          leftIcon="email"
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
        />
        <FormButton title="Forgot Password" />
        {<FormErrorMessage error={customError} visible={true} />}
      </Form>
      <IconButton
        style={styles.backButton}
        iconName="keyboard-backspace"
        color={Colors.mediumGrey}
        size={30}
        onPress={() => navigation.goBack()}
      />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 15,
    // fontWeight: '200',
    textAlign: "center",
    // paddingVertical: 20,
    color: Colors.red},
  container: {
    padding: 15,
    justifyContent: "center" ,
    backgroundColor: Colors.white,
    
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  }
});

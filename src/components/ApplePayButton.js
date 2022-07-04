import { Alert, Pressable, StyleSheet, Text } from 'react-native'
import React from 'react'
import ApplePay from 'react-native-apple-payment'
import { COLORS } from '../utils/constants'

const method = {
  countryCode: 'UA',
  currencyCode: 'USD',
  supportedNetworks: ['Visa', 'MasterCard', 'AmEx'],
  merchantIdentifier: 'merchant.com.example',
}

const detail = {
  total: {
    label: 'Socks',
    amount: 20,
  },
}

const ApplePayButton = () => {
  const pay = async () => {
    const payment = new ApplePay(method, detail)
    const canMakePayment = await payment.canMakePayments()
    if (canMakePayment) {
      await payment.initApplePay()
      handleSuccess()
    } else {
      handleError({ message: 'Apple Pay is not available' })
    }
  }

  const handleSuccess = (token) => {
    Alert.alert('Success', JSON.stringify(token))
  }

  const handleError = (error) => {
    Alert.alert('Error', `${error.code}\n${error.message}`)
  }

  return (
    <Pressable onPress={pay} style={styles.googlePayBtn}>
      <Text style={styles.googlePayBtnText}>Apple Pay</Text>
    </Pressable>
  )
}

export default ApplePayButton

const styles = StyleSheet.create({
  googlePayBtn: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.green,
  },
  googlePayBtnText: {
    color: COLORS.darkGray,
  },
})

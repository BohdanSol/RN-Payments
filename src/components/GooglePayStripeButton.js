import { Alert, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GooglePayButton, useGooglePay } from '@stripe/stripe-react-native'

const GooglePayStripeButton = ({ fullPrice }) => {
  const { isGooglePaySupported, initGooglePay, presentGooglePay, loading } =
    useGooglePay()
  const [initialized, setInitialized] = useState(false)
  const cart = [{ label: 'Socks', amount: '12.75', type: 'final' }]

  // 1. Initialize Google Pay
  const initialize = async () => {
    if (!(await isGooglePaySupported({ testEnv: true }))) {
      Alert.alert('Google Pay is not supported.')
      return
    }

    const { error } = await initGooglePay({
      testEnv: true,
      merchantName: 'Test',
      countryCode: 'US',
      billingAddressConfig: {
        format: 'MIN',
        isPhoneNumberRequired: false,
        isRequired: false,
      },
      existingPaymentMethodRequired: false,
    })

    if (error) {
      Alert.alert(error.code, error.message)
      return
    }
    setInitialized(true)
  }

  useEffect(() => {
    initialize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(
      // CHANGEME: check your local ip by going to the Sysyem Preferences > Network and replace current
      'http://192.168.0.104:3000/create-payment-intent',
      {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          currency: 'USD',
          items: cart,
          force3dSecure: true,
          client: 'android',
          price: fullPrice,
        }),
      },
    )
    const { clientSecret } = await response.json()

    return clientSecret
  }

  const pay = async () => {
    // 2. Fetch payment intent client secret
    console.log('payment action is started')
    const clientSecret = await fetchPaymentIntentClientSecret()

    // 3. Open Google Pay sheet and proceed a payment
    const { error } = await presentGooglePay({
      clientSecret,
      forSetupIntent: false,
    })

    if (error) {
      Alert.alert(error.code, error.message)
      return
    }
    Alert.alert('Success', 'The payment was confirmed successfully!')
    setInitialized(false)
  }

  return (
    <GooglePayButton
      onPress={pay}
      disabled={!initialized || loading}
      style={styles.googlePayBtn}
      type="pay"
    />
  )
}

export default GooglePayStripeButton

const styles = StyleSheet.create({
  googlePayBtn: {
    width: '100%',
    height: 48,
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
})

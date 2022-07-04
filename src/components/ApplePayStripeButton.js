import { Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { ApplePayButton, useApplePay } from '@stripe/stripe-react-native'

const ApplePayStripeButton = ({ fullPrice }) => {
  const [cart, setCart] = useState([
    { label: 'Subtotal', amount: '12.75', type: 'final' },
    { label: 'Shipping', amount: '0.00', type: 'pending' },
    { label: 'Total', amount: '12.75', type: 'pending' }, // Last item in array needs to reflect the total.
  ])

  const { presentApplePay, confirmApplePayPayment } = useApplePay({
    onShippingMethodSelected: (shippingMethod, handler) => {
      // Update cart summary based on selected shipping method.
      const updatedCart = [
        cart[0],
        { label: shippingMethod.label, amount: shippingMethod.amount },
        {
          label: 'Total',
          amount: (
            parseFloat(cart[0].amount) + parseFloat(shippingMethod.amount)
          ).toFixed(2),
        },
      ]
      setCart(updatedCart)
      handler(updatedCart)
    },
    onShippingContactSelected: (shippingContact, handler) => {
      console.log('shippingContact', shippingContact)
      // Make modifications to cart here e.g. adding tax.
      handler(cart)
    },
  })

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(
      'http://localhost:3000/create-payment-intent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currency: 'USD',
          items: cart,
          force3dSecure: true,
          client: 'ios',
          price: fullPrice,
        }),
      },
    )
    const { clientSecret } = await response.json()

    return clientSecret
  }

  const pay = async () => {
    const { error, paymentMethod } = await presentApplePay({
      cartItems: [
        {
          identifier: 'qwe1',
          detail: 'Arrives by July 2',
          label: 'Socks',
          amount: String(fullPrice),
        },
      ],
      country: 'US',
      currency: 'USD',
    })

    if (error) {
      Alert.alert(error.code, error.message)
    } else {
      console.log(JSON.stringify(paymentMethod, null, 2))
      const clientSecret = await fetchPaymentIntentClientSecret()

      const { error: confirmApplePayError } = await confirmApplePayPayment(
        clientSecret,
      )

      if (confirmApplePayError) {
        Alert.alert(confirmApplePayError.code, confirmApplePayError.message)
      } else {
        Alert.alert('Success', 'The payment was confirmed successfully!')
      }
    }
  }
  return (
    <ApplePayButton
      onPress={pay}
      type="plain"
      buttonStyle="black"
      style={styles.applePayBtn}
    />
  )
}

export default ApplePayStripeButton

const styles = StyleSheet.create({
  applePayBtn: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

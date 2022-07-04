import { CardField } from '@stripe/stripe-react-native'
import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  ActivityIndicator,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../utils/constants'
import useStripePayment from '../hooks/useStripePayment'
import ApplePayStripeButton from '../components/ApplePayStripeButton'
import GooglePayStripeButton from '../components/GooglePayStripeButton'

const Stripe = () => {
  const [price, setPrice] = useState(Number(6.45))

  const { isStripePaymentLoading, confirmStripePayment } = useStripePayment({
    price,
    cart: [{ id: 'sku_H0ZQZQZQZQZQZQZQZ', quantity: 1 }],
  })

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.orderText}>Your order: {price}$</Text>

      <CardField
        placeholders={{
          number: '4242424242424242',
          expiration: '11/24',
          cvc: '123',
        }}
        postalCodeEnabled={false}
        cardStyle={{
          textColor: COLORS.darkGray,
          placeholderColor: COLORS.midGray,
          cursorColor: COLORS.green,
        }}
        style={styles.cardFieldContainer}
      />
      <Pressable
        onPress={() => {
          confirmStripePayment(() => {
            setPrice((oldPrice) => Number(oldPrice + 1))
          })
        }}
        style={styles.stripeBtn}>
        {isStripePaymentLoading ? (
          <ActivityIndicator color={'white'} size={'small'} />
        ) : (
          <Text style={styles.stripeText}>Pay by stripe</Text>
        )}
      </Pressable>

      <View style={styles.divider} />
      {Platform.OS === 'ios' ? (
        <ApplePayStripeButton fullPrice={price} />
      ) : (
        <GooglePayStripeButton fullPrice={price} />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
  },
  orderText: {
    fontSize: 24,
    marginBottom: 48,
    color: COLORS.darkGray,
  },
  cardFieldContainer: {
    height: 48,
    width: '100%',
    marginBottom: 16,
  },
  stripeBtn: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.green,
    marginBottom: 16,
  },
  stripeText: {
    fontSize: 16,
    color: COLORS.darkGray,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.darkGray,
    marginTop: 8,
    marginBottom: 24,
  },
  applePayBtn: {
    marginBottom: 0,
  },
  applePayText: {
    color: 'white',
  },
  googlePayBtn: {
    backgroundColor: 'white',
    marginBottom: 0,
  },
})

export default Stripe

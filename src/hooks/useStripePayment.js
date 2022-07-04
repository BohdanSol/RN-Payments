import { useStripe } from '@stripe/stripe-react-native'
import { useState } from 'react'
import { Alert, Platform } from 'react-native'

const useStripePayment = (props) => {
  const { confirmPayment } = useStripe()
  const { price, cart } = props
  const [isStripePaymentLoading, setIsStripePaymentLoading] = useState(false)

  const confirmStripePayment = async (callback) => {
    setIsStripePaymentLoading(true)
    fetch('http://localhost:3000/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currency: 'usd',
        items: cart,
        price,
        client: Platform.OS,
        force3dSecure: true,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        const intent = res
        console.log('intent', intent)
        confirmPayment(intent.clientSecret, {
          paymentMethodType: 'Card',
          paymentMethodData: {
            billingDetails: {
              email: 'test@test.solovei.com',
            },
          },
        })
          .then((successfull) => {
            console.log(successfull)
            if (
              successfull.hasOwnProperty('error') &&
              successfull?.error?.localizedMessage ===
                'Card details not complete'
            ) {
              setIsStripePaymentLoading(false)
              return Alert.alert('Hey, you need to fill out card details')
            }
            Alert.alert('Payment successfull')
            callback()
            setIsStripePaymentLoading(false)
          })
          .catch((error) => {
            setIsStripePaymentLoading(false)
            // Sample handler for unfilled card details
            if (error?.localizedMessage === 'Card details not complete') {
              return Alert.alert('Hey, you need to fill out card details')
            }
            Alert.alert('Error', error.message)
          })
      })
      .catch(() => {
        setIsStripePaymentLoading(false)
        // console.log(err)
      })
  }

  return { isStripePaymentLoading, confirmStripePayment }
}

export default useStripePayment

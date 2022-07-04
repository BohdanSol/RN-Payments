import { Alert, Pressable, StyleSheet, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GooglePay } from 'react-native-google-pay'
import { COLORS } from '../utils/constants'

const allowedCardNetworks = ['VISA', 'MASTERCARD']
const allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS']

const ApplePayButton = ({ fullPrice }) => {
  // Set the environment before the payment request
  GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST)

  const requestData = {
    cardPaymentMethod: {
      tokenizationSpecification: {
        type: 'PAYMENT_GATEWAY',
        // stripe (see Example):
        gateway: 'stripe',
        gatewayMerchantId: '',
        stripe: {
          publishableKey: 'pk_test_TYooMQauvdEDq54NiTphI7jx',
          version: '2018-11-08',
        },
        // other:
        //   gateway: 'example',
        //   gatewayMerchantId: 'exampleGatewayMerchantId',
      },
      allowedCardNetworks,
      allowedCardAuthMethods,
    },
    transaction: {
      totalPrice: '10',
      totalPriceStatus: 'FINAL',
      currencyCode: 'USD',
    },
    merchantName: 'Example Merchant',
  }

  const pay = () => {
    // Check if Google Pay is available
    GooglePay.isReadyToPay(allowedCardNetworks, allowedCardAuthMethods).then(
      (ready) => {
        if (ready) {
          // Request payment token
          GooglePay.requestPayment(requestData)
            .then((token) => handleSuccess(token))
            .catch((error) => handleError(error))
        }
      },
    )
  }

  const handleSuccess = (token) => {
    Alert.alert('Success', JSON.stringify(token))
  }

  const handleError = (error) => {
    Alert.alert('Error', `${error.code}\n${error.message}`)
  }

  return (
    <Pressable onPress={pay} style={styles.googlePayBtn}>
      <Text style={styles.googlePayBtnText}>{fullPrice}$ Google Pay</Text>
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

import React from 'react'
import { Text, StyleSheet, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import GooglePayButton from '../components/GooglePayButton'
import { COLORS } from '../utils/constants'

const RN = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headingText}>
        Implementation using separate packages for IOS/Android
      </Text>
      {Platform.OS === 'ios' ? <></> : <GooglePayButton fullPrice={'20'} />}
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
  headingText: {
    fontSize: 18,
    marginBottom: 48,
    color: COLORS.darkGray,
    textAlign: 'center',
  },
})

export default RN

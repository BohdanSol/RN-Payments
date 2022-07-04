import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../utils/constants'

const Other = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Other!</Text>
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
})

export default Other

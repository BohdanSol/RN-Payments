import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { RN, Stripe, Other } from './src/screens'
import { StripeProvider } from '@stripe/stripe-react-native'
import { COLORS, publishableKey } from './src/utils/constants'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const HomeStack = () => {
  return (
    <Tab.Navigator
      // initialRouteName="Stripe"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: COLORS.blue,
              }}
            />
          ),
        }}
        name="RN"
        component={RN}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: COLORS.green,
              }}
            />
          ),
        }}
        name="Stripe"
        component={Stripe}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: COLORS.red,
              }}
            />
          ),
        }}
        name="Other"
        component={Other}
      />
    </Tab.Navigator>
  )
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="HomeStack" component={HomeStack} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const root = () => {
  return (
    <StripeProvider
      publishableKey={publishableKey}
      urlScheme="your-url-scheme"
      // Replace with your own identifier. Required for prod IOS
      merchantIdentifier="identifier">
      <App />
    </StripeProvider>
  )
}

export default root

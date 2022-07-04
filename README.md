# React Native ApplePay/GPay integration

Project contain integration with stripe as payment service.

## Installation

Use [yarn](https://classic.yarnpkg.com/en/) as package manager.

```
yarn install && cd ios && pod install && cd ..
```

## Please note that:

1. The integration is not complete for production payments on IOS, but fully works locally.
2. Check comments that starts with `CHANGEME`. For different reasons you would probably like to configure things by your own.
3. In order to test Stripe payments you will need to `cd api && yarn install && yarn start` to start local api.
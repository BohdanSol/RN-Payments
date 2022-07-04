import express from 'express'
import Stripe from 'stripe'

// CHANGEME: Replace with your test key
// You would want to keep this on .env
const key = 'sk_test_qwe'

const calculateOrderAmount = (price: any): number => {
  return Math.round(+price * 100)
}

const app = express()
app.use(express.json())

app.post(
  '/create-payment-intent',
  async (
    req: express.Request,
    res: express.Response,
  ): Promise<express.Response<any>> => {
    const {
      email,
      items,
      currency,
      request_three_d_secure,
      payment_method_types = [],
      client = 'ios',
      price = 0,
    }: {
      email: string
      items: any
      currency: string
      payment_method_types: string[]
      request_three_d_secure: 'any' | 'automatic'
      client: 'ios' | 'android',
      price: any
    } = req.body

    const stripe = new Stripe(key as string, {
      apiVersion: '2020-08-27',
      typescript: true,
    })

    const customer = await stripe.customers.create({ email })
    // Create a PaymentIntent with the order amount and currency.
    const params: Stripe.PaymentIntentCreateParams = {
      amount: calculateOrderAmount(price),
      currency,
      customer: customer.id,
      payment_method_options: {
        card: {
          request_three_d_secure: request_three_d_secure || 'automatic',
        },
        sofort: {
          preferred_language: 'en',
        },
        wechat_pay: {
          app_id: 'wx65907d6307c3827d',
          client: client,
        },
      },
      payment_method_types: payment_method_types,
    }

    try {
      const paymentIntent: Stripe.PaymentIntent =
        await stripe.paymentIntents.create(params)
      // Send publishable key and PaymentIntent client_secret to client.
      return res.send({
        clientSecret: paymentIntent.client_secret,
      })
    } catch (error: any) {
      return res.send({
        error: error.raw.message,
      })
    }
  },
)

app.listen(3000, () => console.log('server is running'))

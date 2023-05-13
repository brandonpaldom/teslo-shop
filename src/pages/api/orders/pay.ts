import { db } from '@/database'
import { PaypalInterface } from '@/interfaces'
import { Order } from '@/models'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return payOrder(req, res)
    default:
      res.status(400).json({ message: 'Bad request' })
  }
}

async function getPaypalBearerToken(): Promise<string | null> {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET
  const body = new URLSearchParams('grant_type=client_credentials')
  const base64Token = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`, 'utf-8').toString('base64')

  try {
    const { data } = await axios.post(process.env.PAYPAL_OAUTH_API || '', body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${base64Token}`,
      },
    })

    return data.access_token
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data)
    } else {
      console.log(error)
    }

    return null
  }
}

async function payOrder(req: NextApiRequest, res: NextApiResponse<Data>) {
  const paypalBearerToken = await getPaypalBearerToken()

  if (!paypalBearerToken) {
    return res.status(500).json({ message: 'Internal server error' })
  }

  const { transactionId = '', orderId = '' } = req.body

  const { data } = await axios.get<PaypalInterface.PaypalOrderStatus>(`${process.env.PAYPAL_API}/${transactionId}`, {
    headers: {
      Authorization: `Bearer ${paypalBearerToken}`,
    },
  })

  if (data.status !== 'COMPLETED') {
    return res.status(400).json({ message: 'Payment not completed' })
  }

  await db.connect()
  const dbOrder = await Order.findById(orderId)

  if (!dbOrder) {
    await db.disconnect()
    return res.status(404).json({ message: 'Order not found' })
  }

  if (dbOrder.total !== Number(data.purchase_units[0].amount.value)) {
    await db.disconnect()
    return res.status(400).json({ message: 'Invalid payment' })
  }

  dbOrder.transactionId = transactionId
  dbOrder.isPaid = true
  await dbOrder.save()

  await db.disconnect()

  return res.status(200).json({ message: 'Payment completed' })
}

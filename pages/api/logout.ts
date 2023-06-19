// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'cookies'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== 'POST') {
    return res.status(404).json({
      name: 'Method not supported',
    })
  }

  const cookies = new Cookies(req, res)
  cookies.set('accessToken')

  res.status(200).json({ message: 'Logout successful' })
}

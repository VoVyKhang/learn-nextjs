// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy, { ProxyResCallback } from 'http-proxy'
import { resolve } from 'path'
import Cookies from 'cookies'
import { cookies } from 'next/dist/client/components/headers'

export const config = {
  api: {
    bodyParser: false,
  },
}

interface Data {
  name: string
}

const proxy = httpProxy.createProxyServer()

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(404).json({
      name: 'Method not supported',
    })
  }

  return new Promise((resolve) => {
    // don't send cookies to API server
    req.headers.cookie = ''

    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      let body = ''

      proxyRes.on('data', (chunk) => {
        console.log('Chunk:' + chunk)
        body += chunk
      })

      proxyRes.on('end', () => {
        try {
          const { accessToken, expiredAt } = JSON.parse(body)

          const cookies = new Cookies(req, res, {
            secure: process.env.NODE_ENV !== 'development',
          })

          cookies.set('accessToken', accessToken, {
            expires: new Date(expiredAt),
            sameSite: 'lax',
            httpOnly: true,
          })
          ;(res as NextApiResponse).status(200).json({
            message: 'Successfully',
          })
        } catch (error) {
          ;(res as NextApiResponse).status(500).json({
            message: 'Something went wrong',
          })
        }
      })

      resolve(true)
    }

    proxy.once('proxyRes', handleLoginResponse)

    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: true,
    })
  })
}

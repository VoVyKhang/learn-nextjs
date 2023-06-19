import { SWRConfig } from 'swr'
import { EmptyLayout } from '../components/layout'
import { AppPropsWithLayout } from '../models'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import axiosClient from '../api-client/axios-client'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout

  return (
    <SWRConfig
      value={{
        fetcher: (url) => axiosClient.get(url),
        shouldRetryOnError: false,
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  )
}
export default MyApp

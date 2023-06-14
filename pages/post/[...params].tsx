import { useRouter } from 'next/router'
import * as React from 'react'

export interface IParamsPageProps {}

export default function ParamsPage(props: IParamsPageProps) {
  const router = useRouter()
  return (
    <div>
      <h2>Params: {JSON.stringify(router.query)}</h2>
    </div>
  )
}

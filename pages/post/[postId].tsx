import { useRouter } from 'next/router'
import * as React from 'react'

export interface IPostDetailPageProps {}

export default function PostDetailPage(props: IPostDetailPageProps) {
  const router = useRouter()
  return (
    <div>
      <h2>Query: {JSON.stringify(router.query)}</h2>
    </div>
  )
}

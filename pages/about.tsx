import { useRouter } from 'next/router'
import * as React from 'react'

export interface IAppProps {}

export default function App(props: IAppProps) {
  const router = useRouter()

  console.log('Query: ', router.query)

  // React.useEffect(() => {
  //   // Check query available
  // })

  return (
    <div>
      <h2>About Page</h2>
    </div>
  )
}

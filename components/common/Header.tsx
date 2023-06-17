import * as React from 'react'

export interface IAppProps {}

export default function App(props: IAppProps) {
  console.log('Header ne')

  return <div className="header">Header</div>
}

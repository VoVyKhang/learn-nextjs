import * as React from 'react'
import { LayoutProps } from '../../models'
import Link from 'next/link'

export function MainLayout({ children }: LayoutProps) {
  return (
    <div>
      <h1>Main Layout</h1>

      <Link href={'/'}>Home</Link>
      <br />
      <Link href={'/about'}>About</Link>

      <div>{children}</div>
    </div>
  )
}

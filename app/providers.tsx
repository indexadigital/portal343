'use client'

import { useEffect } from 'react'
import NextTopLoader from 'nextjs-toploader'

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])

  return (
    <>
      <NextTopLoader color="#ffbf10" showSpinner={false} />
      {children}
    </>
  )
}

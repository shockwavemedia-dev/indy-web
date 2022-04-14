import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const Home: NextPageWithLayout = () => {
  const { replace } = useRouter()
  const { status, data: session } = useSession()

  if (status === 'unauthenticated') {
    replace('/auth/login')
  }

  if (status === 'authenticated') {
    if (session.isAdmin) {
      replace('/admin-panel/clients')
    } else if (session.isClient) {
      replace('/client-panel/dashboard')
    }
  }

  return null
}

export default Home

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const Home: NextPageWithLayout = () => {
  const { replace } = useRouter()
  const { status, data: session } = useSession()

  if (status === 'unauthenticated') {
    replace('/auth/login')
  } else if (status === 'authenticated') {
    const { isAdmin, isClient, isManager } = session

    if (isAdmin) {
      replace('/clients')
    } else if (isClient || isManager) {
      replace('/dashboard')
    }
  }

  return null
}

export default Home

import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { NextPageWithLayout } from '../_app'

const Dashboard: NextPageWithLayout = () => {
  const { status } = useSession()
  const { replace } = useRouter()

  if (status === 'loading') {
    return null
  }

  if (status === 'unauthenticated') {
    replace('/auth/login')
    return null
  }

  return (
    <>
      <span>{status} - This is the Dashboard now </span>
      <button onClick={() => signOut()}>Logout</button>
    </>
  )
}

export default Dashboard

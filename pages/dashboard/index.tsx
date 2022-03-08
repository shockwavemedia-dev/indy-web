import { signOut } from 'next-auth/react'
import { NextPageWithLayout } from '../_app'

const Dashboard: NextPageWithLayout = () => {
  return <button onClick={() => signOut()}>hehe</button>
}

Dashboard.clientAuth = true

export default Dashboard

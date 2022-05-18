import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const PageNotFound: NextPageWithLayout = () => {
  const { replace } = useRouter()
  const { status, data: session } = useSession()

  if (status === 'unauthenticated') {
    replace('/auth/login')
  }

  if (status === 'authenticated') {
    const {
      user: {
        userType: { type, role },
      },
    } = session

    if (type === 'admin_users') {
      if (role === 'admin') {
        replace('/admin-panel/clients')
      } else if (role === 'account_manager') {
        // put redirect here
      }
    } else if (type === 'client_users') {
      replace('/client-panel/dashboard')
    }
  }

  return null
}

export default PageNotFound